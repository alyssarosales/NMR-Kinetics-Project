'use client';
import SelectFile from "./components/SelectFile";
/* import TextBox from "./components/TextBox"; */
import DragDrop from "./components/DragDropFile"
import { useState } from "react";
import processZipFile, { Result } from "./lib/zipFileProcessor";
import OptionConfigurator, { Options } from "./components/OptionConfigurator";
import ResultArea from "./components/ResultArea";
import { Dispatch, SetStateAction } from "react";


/* export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
 */

const defaultOptions: Options = {
  option1: '',
  option2: '',
  option3: false,
}

export default function Home() {
  const [result, setResult] = useState<Result>();

  const [options, setOptions] = useState<Options>(defaultOptions);


  const [zipFileURI, _setZipFileURI] = useState<string>('');

  function setZipFileURI(newValue: SetStateAction<string>) {
    setOptions(defaultOptions)
    _setZipFileURI(newValue)
  }


  async function onGoButtonClicked() {
    if (!zipFileURI) {
      alert("No you can't do that")
      return
    }
    const result = await processZipFile(zipFileURI, options)
    setResult(result)

  }

  return (
    <main className="h-screen flex-col bg-main-green">

      <div id='AppTitle' className="w-full h-1/5 pt-5 text-center">
        <h1>
          <span className='font-display font-black text-4xl text-accent-yellow'>The Heller Group's</span>
          <br />
          <span className='font-display font-black text-6xl text-sky-blue leading-relaxed tracking-wide'>NMR Kinetics Tool</span>
        </h1>
      </div>

      <div id='SubmissionContainer' className="w-full h-3/5 flex justify-center">

        <div className='w-2/5 h-full bg-sky-blue rounded'>
          <p className="font-body">This is the content of my page</p>

          <div id='DragDrop Box' className='w-3/5 h-2/5 bg-main-green'>

          </div>

          {/*           <div id='SelectFile'>
            <input type='file'/>
          </div> */}

          <div id='TextBox'>
            <input type='text' />
          </div>

          <button id='Submit' className='rounded-lg border-2 border-main-green bg-accent-yellow'> Submit</button>
        </div>
      </div>

      <DragDrop onFileReceived={setZipFileURI} />
      <div>
        do we have a file? {zipFileURI ? 'yes' : 'no'}
      </div>

      {zipFileURI && <>

        <OptionConfigurator options={options} setOptions={setOptions} />

        <button
          onClick={onGoButtonClicked}
          disabled={!zipFileURI}
          className="rounded-none border-1 bg-accent-yellow">go!</button>
      </>
      }


      {result &&
        <ResultArea result={result} />
      }


      {/* <TextBox/> */}


      <footer>
        This is my footer
      </footer>
    </main>
  )
}