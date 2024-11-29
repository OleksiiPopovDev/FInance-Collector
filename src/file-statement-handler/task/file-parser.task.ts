import { Injectable } from '@nestjs/common';
import xlsx from 'node-xlsx';

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
          ? { [header[index].replaceAll(' ', '').replaceAll('-', '')]: column }
          : {},
      )
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
}
