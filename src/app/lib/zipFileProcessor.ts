import * as zip from '@zip.js/zip.js'
import { Options } from '../components/OptionConfigurator';
import ExcelJS from 'exceljs'

export type Result = {
    file: ExcelJS.Buffer;
    summary: string;
}


export default async function processZipFile(fileUri: string, options: Options): Promise<Result> {
    // console.log('fileUri', fileUri)


    const zipFs = new zip.fs.FS();
    await zipFs.importData64URI(fileUri);
    console.log('zipFs:', zipFs)


    // TODO: check that file is actually a text file!
    const file = zipFs.children[0] as zip.ZipFileEntry<zip.TextReader, zip.TextWriter>;
    if (file.data?.directory) {
        throw new Error('First entry is a directory')
    }

    const text = await file.getText() as string;
    const formattedText = options.option3 ? text.toUpperCase() : text.toLowerCase()

    const workbook = new ExcelJS.Workbook();

    // TODO: update these values
    workbook.creator = 'TODO';
    workbook.lastModifiedBy = 'TODO';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);

    const worksheet = workbook.addWorksheet('My Sheet');

    const row = worksheet.addRow({ id: 1 });
    row.getCell(1).value = text;

    const buffer = await workbook.xlsx.writeBuffer({
        useStyles: true
    });


    return {
        file: buffer,
        summary: text
    }
}