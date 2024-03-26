import { ExtractOutput, extract } from './extractor';
import ExcelJS from 'exceljs'


export function makeWorkbook(input: ExtractOutput): ExcelJS.Workbook {
  const duration: number = input.reactionDuration
  const notes: string = input.notes
  const integrations = input.integrations

  const tableRows = integrations.map((peak, index) => ([
    index + 1,
    peak.integratedRegion,
    peak.integral,
  ]))

  const reactionWorkbook = new ExcelJS.Workbook();
  const reactionSheet = reactionWorkbook.addWorksheet('Reaction Data', { pageSetup: { horizontalCentered: true } });
  reactionSheet.properties.defaultColWidth = 25;

  reactionSheet.getCell('A1').value = 'Reaction Title:';
  reactionSheet.getCell('A2').value = 'Reaction Duration (min):';
  reactionSheet.getCell('B2').value = duration

  reactionSheet.addTable({
    name: 'ReactionNMRIntegrations',
    ref: 'A4',
    headerRow: true,
    totalsRow: false,
    style: {
      theme: 'TableStyleMedium2',
      showRowStripes: true,

    },
    columns: [
      { name: 'Peak ID' },
      { name: 'Integrated Region' },
      { name: 'Integration' },
      { name: 'Peak Identification' },
      { name: 'Notes' },
    ],
    rows: tableRows,
  });


  return reactionWorkbook;

}