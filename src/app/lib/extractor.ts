import { BlobReader, ZipReader, TextWriter } from "@zip.js/zip.js";
import { parse } from 'date-fns'


export type ExtractOutput = {
    integrations: {
        integratedRegion: [number, number],
        integral: number,
    }[],
    reactionTimeMs: number,
    notes: string,
};

async function getFileContents(file: File) {

    const blobReader = new BlobReader(file);
    const zipReader = new ZipReader(blobReader);
    const zipFileEntries = await zipReader.getEntries();
    console.log('entries', zipFileEntries);

    function getEntryByPath(path: string) {
        const entry = zipFileEntries.find(entry => entry.filename.match(/^[^\/]+\/(.*)/)?.[1] === path)
        if (!entry) {
            throw new Error(`File not found at path ${path}`)
        }
        return entry
    }

    async function getEntryTextContents(entry: ReturnType<typeof getEntryByPath>) {
        if (!entry?.getData) {
            throw new Error("entry.getData is undefined")
        }
        return await entry.getData(
            new TextWriter()
        );
    }

    const integrationText = await getEntryTextContents(getEntryByPath('1/pdata/1/integrals.txt'));
    const parmText = await getEntryTextContents(getEntryByPath('1/pdata/1/parm.txt'));
    console.log('integrationFile', integrationText)
    console.log('parmText', parmText)

    return {
        integrationText,
        parmText,
    }
}

function getEndTimeFromParmText(parmText: string) {
    const dateString = parmText.split('\n').find(line => line.startsWith('Date_'))?.replace('Date_', '').trim()

    const timeString = parmText.split('\n').find(line => line.startsWith('Time'))?.replace('Time', '').replace('h', '').trim()

    // dateString looks like "20211007" and timeString looks like "15.19"
    const endTime = parse(dateString + 'T' + timeString, "yyyyMMdd'T'HH'.'mm", new Date());

    console.debug("Extracted endTime:", endTime)

    return endTime
}

function processIntegralsText(integralsText: string) {
    const lines = integralsText.split('\n');

    // First, remove all of the lines up to and including "Number Integrated..."
    while (true) {
        const line = lines.shift()
        if (!line) {
            throw new Error("Didn't find \"Number\" in integrals.txt")
        }
        if (line.trim().startsWith('Number')) {
            break
        }
    }

    // Next, parse the numbers
    // TODO: Parse these numbers, compute "answer" (see below for example of what answer should look like). It may be helpful to convert to an array like "numbersArray" first, but that's not required.
    const numbersArray = [
        [1, 15.690, 15.224, 1.0],
        [2, 5.605, 5.380, 1.11475],
        [3, 3.774, 3.501, 0.39266]
    ]


    // TODO: Once you're computing "answer", replace this with your value
    const answer: ExtractOutput['integrations'] = [
        {integratedRegion: [15.690, 15.224], integral: 1.0},
        {integratedRegion: [5.605, 5.380], integral: 1.11475},
        {integratedRegion: [3.774, 3.501], integral: 0.39266},
    ]

    return answer;

}

export async function extract(file: File, startTime: Date, notes: string): Promise<ExtractOutput> {
    const { integrationText, parmText } = await getFileContents(file);

    const  endTime  = getEndTimeFromParmText(parmText)
    console.log("endTime", endTime)


    const integrations = processIntegralsText(integrationText)
    console.log('integrals', integrations)


    // TODO: compute reactionTimeMs ( https://date-fns.org/v3.4.0/docs/differenceInMilliseconds )
    const reactionTimeMs = 1234;

    return {
        integrations,
        reactionTimeMs,
        notes,
    }

}