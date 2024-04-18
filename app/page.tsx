'use client';

import { PlayArrow } from '@mui/icons-material';
import { useRef } from 'react';

export default function MainSite() {
  const prompt = useRef<HTMLParagraphElement>(null);
  // Funkcja do parsowania argumentów
  const parseArguments = (args: string[]) => {
    return args.map((arg) => {
      try {
        if (arg.startsWith('[') && arg.endsWith(']')) {
          console.log('ARRAY', JSON.parse(arg));
          return JSON.parse(arg);
        } else if (
          arg.startsWith('{') &&
          arg.endsWith('}') &&
          arg.includes(':')
        ) {
          const validJSONStr = arg.replace(
            /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
            '"$2": '
          );
          const obj = JSON.parse(`${validJSONStr}`);
          return obj;
        } else {
          return arg;
        }
      } catch {
        return arg;
      }
    });
  };

  const handleCheck = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      functionName: { value: string };
    };
    const functionString: any = target.functionName.value.trim();
    const functionName = functionString.split('(')[0];
    const functionArgs = functionString
      .split('(')[1]
      ?.split(')')[0]
      ?.split(',')
      .map((arg: any) => arg.trim());

    console.log(functionArgs);

    const functions = await import('./utils');
    // @ts-ignore
    console.log(functions);
    // @ts-ignore
    if (prompt.current && functions[functionName]) {
      const result = functionArgs
        ? // @ts-ignore
          functions[functionName](...parseArguments(functionArgs))
        : // @ts-ignore
          functions[functionName]();

      console.log(result);

      if (prompt.current) prompt.current.innerText = `${result}`;
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24 container mx-auto'>
      <h1 className='text-white border-b-4 border-b-white pb-4'>
        CHECK THE CHALLENGE
      </h1>
      <form
        onSubmit={handleCheck}
        className='text-white flex flex-col gap-x-8 mt-8 w-full max-w-2xl'
      >
        <div className='flex items-center gap-x-8 w-full'>
          <input
            name='functionName'
            placeholder='Function...'
            type='text'
            className='px-4 py-2 rounded-full text-slate-900 focus:outline-green-500 w-full'
          />
          <button type='submit' className='rounded-full p-2 bg-green-500'>
            <PlayArrow className='text-4xl' />
          </button>
        </div>
      </form>
      <p className='text-white text-9xl font-bold mt-12' ref={prompt}></p>
    </main>
  );
}
