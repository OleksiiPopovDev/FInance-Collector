import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileListTask {
  constructor(private readonly configService: ConfigService) {}

  public async run(): Promise<string[]> {
    const directory = this.configService.get<string>('WORK_DIRECTORY');
    const statementFilesList = fs
      .readdirSync(directory)
      .map((file) => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        return { file, creationTime: stats.birthtime };
      })
      .sort((a, b) => a.creationTime.getTime() - b.creationTime.getTime())
      .map((item) => item.file);

    if (statementFilesList.length === 0) {
      throw new Error('Not found any unprocessed statement files');
    }

    return statementFilesList;
  }
}
