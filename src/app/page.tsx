'use client';

import { useState } from "react";
import { ExtractOutput, extract } from "./lib/extractor";


function ChooseFileButton() {
    return <>
        <div className= 'flex-1'>
            <input name="file" type="file" className="block w-full text-sm text-white
            file:mr-4 file:py-5 file:px-5
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-[#555CF0] file:text-white
            hover:file:bg-[#555CF0]/75 file:cursor-pointer
            "/>
        </div>
    </>
}

function TextInput() {
    return <>
        <div className='flex-1'>
            <label htmlFor='notes' className='font-raleway font-semibold'>Additional Notes</label>
            <textarea
                id = 'notes'
                name = 'notes'
                className='block min-h-64 w-full rounded-lg resize-none border-none border-2 border-white bg-[#171717]  focus:ring-[#555CF0] focus:ring-inset focus:ring-4'
            />
        </div>
    </>
}

function TimeInput() {
    return <>
        <div className='flex'>
            <input
                name = 'time'
                type='time'
                className='border-none bg-[#171717] block rounded-lg form-input font-raleway focus:ring-[#555CF0] focus:ring-inset focus:ring-2'
            />
        </div>
    </>
}

function DateInput() {
    return<>
        <div className='flex'>
            <input
            name = 'date'
            type='date'
                className='border-none bg-[#171717] block rounded-lg font-raleway  focus:ring-[#555CF0] focus:ring-inset focus:ring-2'
            />
        </div>
    </>
}

export default function MainPage() {

    const [extractedOutput, setExtractedOutput]   = useState<ExtractOutput>()

    async function submitAction(formData: FormData) {
        const file = formData.get('file') as File;
        const time = formData.get('time') as string;
        const date = formData.get('date') as string;
        const notes = formData.get('notes') as string;
        
    
        const dateTimeStr = date.concat("T", time);
        const startTime = new Date(Date.parse(dateTimeStr));
        
    
        console.debug("Submitted! args: ", {
            file, 
            startTime,
            notes,
        })
        const extractOutput = await extract(file, startTime, notes)
        console.log("output:", extractOutput)
        setExtractedOutput(extractOutput)
    }
    


    return(
        <div className="h-screen flex flex-col space-y-10 bg-[#171717] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]">
            <header className="flex flex-col p-10">
                <div className='flex justify-start'><span className= "text-[#36CE7D] text-2xl font-raleway font-black">The Heller Lab</span></div>

                <div className='flex justify-center'><span className='text-[#555CF0] underline decoration-[#FF6915] font-raleway tracking-wide text-6xl font-extrabold'>NMR Kinetics Extractor</span></div>
            </header>

            <div className='flex flex-1 justify-center overflow-auto'>


                <div className='flex flex-row flex-1 max-w-7xl space-between-2 p-20 bg-[#242424] rounded-lg'>
                    <div className='flex flex-col w-1/3 rounded-lg'>
                        <span className= 'font-raleway font-bold text-[#A3A3F8]'>What does the NMR File Extractor do?</span>
                        <span className='font-raleway'>This tool is intended to pull integration and chemical shift information from a given Bruker file. The tool will create an excel file which will automatically download with the information.  </span>
                    </div>

                    <div className='flex w-2/3 rounded-lg justify-center'>

                        <form className='flex flex-col w-2/3 place-content-center space-y-5' action={submitAction}>
                            <ChooseFileButton />

                            <label htmlFor='reactiontime' className='font-raleway font-semibold'>Reaction Start Time</label>
                            <div id='reactiontime' className ='flex flex-row space-x-2'>
                                <DateInput/>
                                <TimeInput/>
                            </div>

                            <TextInput/>
                            <input className= 'font-raleway font-bold bg-[#36CE7D] rounded-lg cursor-pointer w-1/3 hover:bg-[#36CE7D]/75' type='submit' value='Continue'/>
                        </form>

                        {/* div that appears based on state */}
                        {!!extractedOutput &&
                            <div className="bg-red-500 min-w-5">
                                remy's notes: {extractedOutput.notes}<br/>
                                remy's full output: <pre>{JSON.stringify(extractedOutput, null, 2)}</pre>
                            </div>
                        }

                    </div>

                </div>

            </div>

            <footer className="">
                
            </footer>

        </div>
        )

}