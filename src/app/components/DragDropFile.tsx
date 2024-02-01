
'use client';

import { ChangeEventHandler, ChangeEvent, useState } from "react";


export default function DragDrop({ onFileReceived }: { onFileReceived: (fileUri: string) => void }) {
    const [error, setError] = useState<string | null>();

    async function onFileUpload(event: ChangeEvent<HTMLInputElement>) {
        // console.log(event)

        try {

            const firstFile = event?.target?.files?.[0];

            if (!firstFile || !firstFile.name.endsWith('.zip')) {
                throw new Error("File must end with .zip")
            }



            const reader = new FileReader();


            reader.readAsDataURL(firstFile);
            // const fileUri = await new Promise(resolve => reader.addEventListener('load', event => resolve(event.target.result)))
            reader.addEventListener('load', async event => {
                const fileUri = event.target?.result;

                if (typeof fileUri != 'string') {
                    throw new Error("typeof fileUri != 'string'")
                }

                setError(null)
                onFileReceived(fileUri)
            });


        } catch (err) {
            if (typeof err === "string") {
                setError(err)
            } else if (err instanceof Error) {
                setError(err.message)
            }
        }
    }

    return (
        <div>
            <input
                type='file'
                onChange={onFileUpload}
                accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
            />
            {error && "there's an error: " + error}

        </div>
    )
}
