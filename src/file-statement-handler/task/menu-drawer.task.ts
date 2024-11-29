import { Injectable } from '@nestjs/common';
// import * as path from 'node:path';
import inquirer from 'inquirer';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';

@Injectable()
export class MenuDrawerTask {
  private readonly questions = [
    'UrkSibBank Online:',
    'UrkSibBank Business:',
    'Monobank:',
  ];

  constructor(private readonly configService: ConfigService) {}

  public async run(statementFilesList: string[]) {
    const directory = this.configService.get<string>('WORK_DIRECTORY');
    const selectedFiles: string[] = [];

    for (const message of this.questions) {
      if (statementFilesList.length === 1) {
        selectedFiles.push(path.join(directory, statementFilesList[0]));
        return selectedFiles;
      }

      const { selectedFile } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedFile',
          message,
          choices: statementFilesList,
        },
      ]);

      selectedFiles.push(path.join(directory, selectedFile));
      statementFilesList = statementFilesList.filter(
        (file) => file !== selectedFile,
      );
    }

    return selectedFiles;
  }
}
