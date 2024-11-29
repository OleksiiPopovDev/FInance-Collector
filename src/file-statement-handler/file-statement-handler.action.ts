import { Injectable, Logger } from '@nestjs/common';
import { FileListTask } from './task/file-list.task';
import { MenuDrawerTask } from './task/menu-drawer.task';
import { UkrsibbankOnline } from '../dto/finance-source';
import { FileParserTask } from './task/file-parser.task';

@Injectable()
export class FileStatementListAction {
  constructor(
    private readonly fileListTask: FileListTask,
    private readonly menuDrawerTask: MenuDrawerTask,
    private readonly fileParserTask: FileParserTask,
    private readonly logger: Logger,
  ) {}

  private readonly questions = [
    'UrkSibBank Online:',
    'UrkSibBank Business:',
    'Monobank:',
  ];

  public async run() {
    this.logger.log('Reading directory...');

    try {
      const statementFilesList = await this.fileListTask.run();
      const selectedFiles = await this.menuDrawerTask.run(statementFilesList);
      selectedFiles.forEach((filePath, index) => {
        this.logger.log(
          `\x1b[1m${this.questions[index]}\x1b[0m \t=> ${filePath}`,
        );
        const data = this.fileParserTask.run<UkrsibbankOnline>(filePath);
      });
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
