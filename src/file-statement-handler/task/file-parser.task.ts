import { Injectable } from '@nestjs/common';
import xlsx from 'node-xlsx';
import { transliterate } from 'transliteration';

@Injectable()
export class FileParserTask {
  public run<T>(fileName: string) {
    const parsed = xlsx.parse(fileName);

    const [header, ...records] = parsed.shift().data;
    return records.map(this.convertCSVtoJSON(header)) as T[];
  }

  private convertCSVtoJSON = (header: string[]) => (row: string[]) =>
    row
      .map((column, index) =>
        column
          ? {
              [transliterate(
                header[index]
                  .replaceAll(' ', '_')
                  .replaceAll('-', '')
                  .toLowerCase(),
              )]: column,
            }
          : {},
      )
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
}
