import { MdArrowBack, MdContentCopy } from "react-icons/md";
import DownloadWorkbookButton from "./DownloadWorkbookButton";
import { ExtractOutput } from "../lib/extractor";
import { useRef } from "react";


function TableData({ integrations, notes }: { integrations: ExtractOutput["integrations"]; notes: ExtractOutput["notes"] }) {
    return <>
        <table id='table' className='flex-wrap text-center text-white md:table-fixed w-full'>
            <thead>
                <tr className='flex-wrap'>
                    <th className='border-b-4 border-[#555CF0]' scope="col">Peak ID</th>
                    <th className='border-b-4 border-[#555CF0]' scope="col">Integrated Region</th>
                    <th className='border-b-4 border-[#555CF0]' scope="col">Integration</th>
                    <th className='border-b-4 border-[#555CF0]' scope="col">Peak Identification</th>
                    <th className='border-b-4 border-[#555CF0]' scope="col">Notes</th>
                </tr>
            </thead>
            <tbody className='flex-wrap border-2 border-[#555CF0]'>
                {integrations.map((val, index) => (
                    <tr key={index}>
                        <td className='border-2 border-[#555CF0]'>{index + 1}</td>
                        <td className='border-2 border-[#555CF0]'>[{val.integratedRegion[0]}, {val.integratedRegion[1]}]</td>
                        <td className='border-2 border-[#555CF0]'>{val.integral}</td>
                        <td className='border-2 border-[#555CF0]'></td>
                        {index == 0 && <td rowSpan={integrations.length}>{notes}</td>}
                    </tr>
                ))}

            </tbody>
        </table>
    </>
}

export default function FormSubmitted({
    extractedOutput,
    onBackClick,
    onNewFileClick
}: {
    extractedOutput: ExtractOutput;
    onBackClick: () => void;
    onNewFileClick: () => void;
}) {

    const tableRef = useRef<HTMLTableElement | null>(null)





    async function onCopyClick() {

        const element = tableRef.current;
        if (!element) {
            throw new Error("Could not access table")
        }
        const integrationTableText = element.innerText
        await navigator.clipboard.writeText(integrationTableText)
    }
    return (<>
        <div className='flex flex-col flex-1 justify-center max-w-7xl space-between-2 p-20 bg-[#242424] rounded-lg'>
            <div className='flex size-fit bg-[#36CE7D] font-raleway font-bold rounded-md'>
                <button className='flex p-2 items-center' onClick={onBackClick}><MdArrowBack /> Edit Submission</button>
            </div>

            <div className='flex justify-center justify-around items-center flex-col flex-1 max-w-5/6 p-20'>

                <div className='flex flex-col gap-1'>

                    <div ref={tableRef} className='flex flex-row rounded-md border-4 border-[#555CF0]'>
                        <TableData
                            integrations={extractedOutput.integrations}
                            notes={extractedOutput.notes}
                        />
                    </div>

                    <div className="flex place-content-center rounded-md bg-[#555CF0] px-2">
                        <button className="py-2" onClick={onCopyClick}><MdContentCopy /></button>
                    </div>

                </div>

                <DownloadWorkbookButton extractOutput={extractedOutput} />

            </div>

            <div className='flex place-content-center'>
                <button className='font-raleway hover:underline hover:decoration-[#8A8AD3] hover:decoration-4' onClick={onNewFileClick}> Process Another File</button>
            </div>
        </div>
    </>
    )
}