import { Ref, useEffect, useImperativeHandle, useRef } from "react"

function ChooseFileButton() {
    return <>
        <div className='flex'>
            <input name="file" type="file" className="block w-full text-sm text-white
            file:mr-4 file:py-5 file:px-5
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-[#555CF0] file:text-white
            hover:file:bg-[#555CF0]/75 file:cursor-pointer
            " 
            required/>
        </div>
    </>
}

function TitleInput() {
    return <>
        <div className = 'flex-col'>
            <label htmlFor='title' className = 'font-raleway font-semibold'>Reaction Title</label>
            <textarea id='title' name = 'title' className ='block max-h-10 rounded-lg resize-none border-none border-2 border-white bg-[#171717] focus:ring-inset focus:ring-4 focus:ring-[#555CF0]'
            />
        </div>
    </>
}

function TextInput() {
    return <>
        <div className='flex-col'>
            <label htmlFor='notes' className='font-raleway font-semibold'>Additional Notes</label>
            <textarea
                id='notes'
                name='notes'
                className='block min-h-64 w-full rounded-lg resize-none border-none border-2 border-white bg-[#171717]  focus:ring-[#555CF0] focus:ring-inset focus:ring-4'
           />
        </div>
    </>
}

function TimeInput() {
    return <>
        <div className='flex'>
            <input
                name='time'
                type='time'
                className='border-none bg-[#171717] block rounded-lg form-input font-raleway focus:ring-[#555CF0] focus:ring-inset focus:ring-2'
                required
           />
        </div>
    </>
}

function DateInput() {
    return <>
        <div className='flex'>
            <input
                name='date'
                type='date'
                className='border-none bg-[#171717] block rounded-lg font-raleway focus:ring-[#555CF0] focus:ring-inset focus:ring-2'
                required
           />
        </div>
    </>
}



export type ResetRef = { resetForm: () => void; }

export default function FormUnsubmitted({
    submitAction,
    resetRef,
}: {
    submitAction: (data: FormData) => void;
    resetRef: Ref<ResetRef>;
}) {
    const formRef = useRef<HTMLFormElement | null>(null)

    useImperativeHandle(resetRef, () => {
        return {
            resetForm() {
                if (!formRef.current) {
                    throw new Error("formRef is null")
                }
                formRef.current.reset();
            }
        };
    }, []);

    return <>
        <div className='grid grid-cols-3 gap-6 max-w-7xl space-between-2 p-20 bg-[#242424] rounded-lg'>
            <div className='flex flex-col col-span-1'>
                <span className='font-raleway font-bold text-[#A3A3F8]'>What does the NMR Kinetics tool do?</span>
                <span className='font-raleway'> The NMR Kinetics Extractor accepts Bruker .zip files. Once your NMR file has been uploaded, the tool will provide a table with integration data. The table can either be copied to the clipboard or the CSV file can be downloaded directly.  </span>
                <span className='font-raleway font-bold text-[#A3A3F8]'>How the user entries are used.</span>
                <span className='font-raleway'> This tool uses the Reaction Start Time provided in the user form and the timestamp data in the Bruker file to calculate a reaction duration. Notes are placed in a table cell and are intended for any relevant observations or conclusions.  </span>
            </div>

            <div className='col-span-2 w-2/3 justify-self-center'>

                <form className='flex flex-col flex-wrap space-y-5' action={submitAction} ref={formRef}>
                    <ChooseFileButton />
                    <TitleInput/>
                    <label htmlFor='reactiontime' className='font-raleway font-semibold'>Reaction Start Time</label>
                    <div id='reactiontime' className='flex flex-row space-x-2'>
                        <DateInput />
                        <TimeInput />
                    </div>

                    <TextInput />
                    <input className='font-raleway font-bold bg-[#36CE7D] rounded-lg p-1.5 cursor-pointer w-1/3 hover:bg-[#36CE7D]/75' type='submit' value='Continue' />
                </form>
            </div>
        </div>
    </>
}