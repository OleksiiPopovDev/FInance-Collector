import { Injectable, Logger } from '@nestjs/common';
import { FileListTask } from './task/file-list.task';
import { MenuDrawerTask } from './task/menu-drawer.task';
import { BankListEnum } from '../enum/bank-list.enum';
import { DataExtractAction } from './data-extract.sub-action';
import { FinanceStatementRepository } from './database/finance-statement.repository';

@Injectable()
export class FileStatementListAction {
  constructor(
    private readonly fileListTask: FileListTask,
    private readonly menuDrawerTask: MenuDrawerTask,
    private readonly dataExtractAction: DataExtractAction,
    private readonly financeStatementRepository: FinanceStatementRepository,
    private readonly logger: Logger,
  ) {}

  public async run() {
    this.logger.log('Reading directory...');

    try {
      const statementFilesList = await this.fileListTask.run();
      const selectedFiles = await this.menuDrawerTask.run(statementFilesList);
      for (const filePath of selectedFiles) {
        const index = selectedFiles.indexOf(filePath);
        const bankName = Object.values(BankListEnum)[index];
        this.logger.log(`\x1b[1m${bankName}:\x1b[0m \t=> ${filePath}`);
        const data = this.dataExtractAction
          .setFilePath(filePath)
          .setBankName(bankName)
          .run();

        await this.financeStatementRepository.create(data);

        const total = 0;
      }
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
