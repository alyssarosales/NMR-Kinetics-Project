'use client';

import { useRef, useState } from "react";
import FormSubmitted from "./components/FormSubmitted";
import FormUnsubmitted, { ResetRef } from "./components/FormUnsubmitted";
import { ExtractOutput, extract } from "./lib/extractor";



export default function MainPage() {

    const [extractedOutput, setExtractedOutput] = useState<ExtractOutput | null>(null)

    const resetRef = useRef<ResetRef>(null)

    function resetForm() {
        setExtractedOutput(null);
        if (!resetRef.current) {
            throw new Error("resetRef is null")
        }
        resetRef.current.resetForm()
    }

    async function submitAction(formData: FormData) {
        const file = formData.get('file') as File;
        const time = formData.get('time') as string;
        const date = formData.get('date') as string;
        const notes = formData.get('notes') as string;
        const title = formData.get('title') as string;


        const dateTimeStr = date.concat("T", time);
        const startTime = new Date(Date.parse(dateTimeStr));


        console.debug("Submitted! args: ", {
            file,
            startTime,
            notes,
            title,
        })
        const extractOutput = await extract(file, startTime, notes, title)
        console.log("output:", extractOutput)
        setExtractedOutput(extractOutput)
    }



    return (
        <div className="min-h-screen w-screen flex flex-col bg-[#171717] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]">

            <header className="flex flex-col p-10">

                <div className='flex justify-start'><span className="text-[#36CE7D] text-2xl font-raleway font-black">The Heller Lab</span></div>

                <div className='flex justify-center'><span className='text-[#555CF0] underline decoration-[#FF6915] font-raleway tracking-wide text-6xl font-extrabold'>NMR Kinetics Extractor</span></div>

            </header>


            <div className='flex flex-wrap justify-center'>

                {extractedOutput &&
                    <FormSubmitted
                        extractedOutput={extractedOutput}
                        onBackClick={() => setExtractedOutput(null)}
                        onNewFileClick={resetForm}
                    />
                }

                <div className={extractedOutput ? 'hidden' : 'contents'}>
                    <FormUnsubmitted submitAction={submitAction} resetRef={resetRef} />
                </div>

            </div>

            <footer className="">

            </footer>

        </div>
    )
}