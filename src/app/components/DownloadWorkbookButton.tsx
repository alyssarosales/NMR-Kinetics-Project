import { ExtractOutput, extract } from "../lib/extractor";
import { makeWorkbook } from "../lib/workbookCreator";
import ExcelJS from 'exceljs';




function downloadFileFromBuffer(buffer: ExcelJS.Buffer, fileName: string) {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const objectURL = URL.createObjectURL(blob);

    link.href = objectURL;
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}


export default function DownloadWorkbookButton({ extractOutput }: { extractOutput?: ExtractOutput }) {
    async function downloadFile() {
        if (!extractOutput) {
            throw new Error("No extractOutput")
        }

        const workbookFile = makeWorkbook(extractOutput);

        downloadFileFromBuffer(
            await workbookFile.xlsx.writeBuffer({
                useStyles: true
            }),
            extractOutput.title + '.xlsx'
        )

    }
    return (
        <div className='flex size-fit justify-around font-raleway font-bold mt-6 bg-[#FF6915] rounded-lg size-1/5'>
            <button className='p-4' onClick={downloadFile} disabled={!extractOutput}>Download XLSX</button>
        </div>
    );
}
