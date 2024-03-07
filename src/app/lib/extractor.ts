import { BlobReader, ZipReader } from "@zip.js/zip.js";

export type ExtractOutput = {
    integrations: {
        location: number,
        values: number[],
    }[],
    reactionTimeMs: number,
    notes: string,   
};

export async function extract(file: File, datetime: Date, notes: string): Promise<ExtractOutput> {

    const blobReader = new BlobReader(file); 
    const zipReader = new ZipReader(blobReader);
    const zipFileEntries = await zipReader.getEntries();
    console.log('entries', zipFileEntries);  


    return {
        integrations: [],
        reactionTimeMs: 1234,
        notes: notes,
    }

}