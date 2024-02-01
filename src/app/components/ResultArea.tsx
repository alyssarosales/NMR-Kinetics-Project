import { Result } from "../lib/zipFileProcessor"
import ExcelJS from 'exceljs'


function downloadFile(buffer: ExcelJS.Buffer) {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);


    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const objectURL = URL.createObjectURL(blob);

    link.href = objectURL;
    link.href = URL.createObjectURL(blob);
    link.download = 'file.xlsx';
    link.click();

}

export default function ResultArea({ result }: { result: Result }) {
    function downloadResultClicked() {
        // TODO: download the thing
        console.log(result.file)

        downloadFile(result.file)

    }

    return <div id="Result Area" className="border-2 border-black rounded-xl min-h-10 min-w-10 p-10">
        <p>result: {result.summary}</p>

        <button onClick={downloadResultClicked} className="border-1 bg-accent-yellow rounded">download result</button>
    </div>
}