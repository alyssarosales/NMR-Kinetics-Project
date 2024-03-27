import { BlobReader, ZipReader, TextWriter } from "@zip.js/zip.js";
import { differenceInMilliseconds, formatDuration, intervalToDuration, millisecondsToHours, millisecondsToMinutes, parse } from 'date-fns';


export type ExtractOutput = {
    integrations: {
        integratedRegion: [number, number],
        integral: number,
    }[],
    reactionDuration: number,
    notes: string,
    title: string,
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

function processIntegralsText(integralsText: string): ExtractOutput['integrations'] {
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
    console.log(lines);

    const integralArray: number[][] = new Array();
    for (let line of lines) {
        if (line.length == 0) {
            continue
        }
        integralArray.push(line.trim().split(/\s+/).map(Number));
    }
    console.log('integralArray:', integralArray);


    const peakArray = integralArray.map(peak => ({
        peakNumber: peak[0],
        integratedRegion: [peak[1], peak[2]] as [number, number],
        integral: peak[3],
    }))

    console.log('peakArray:', peakArray);

    return peakArray;
}

export async function extract(file: File, startTime: Date, notes: string, title:string): Promise<ExtractOutput> {
    const { integrationText, parmText } = await getFileContents(file);

    const endTime = getEndTimeFromParmText(parmText)
    console.log("endTime", endTime)


    const integrations = processIntegralsText(integrationText)
    console.log('integrals', integrations)

    const reactionTimeMs = differenceInMilliseconds(endTime, startTime)
    const reactionDuration = millisecondsToMinutes(reactionTimeMs)
    console.log(reactionDuration);

    return {
        integrations,
        reactionDuration,
        notes,
        title,
    }

}