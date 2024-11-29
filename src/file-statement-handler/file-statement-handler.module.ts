import { Logger, Module } from '@nestjs/common';
import { FileStatementListAction } from './file-statement-handler.action';
import { FileListTask } from './task/file-list.task';
import { MenuDrawerTask } from './task/menu-drawer.task';
import { FileParserTask } from './task/file-parser.task';
import { DataExtractAction } from './data-extract.sub-action';

@Module({
  providers: [
    Logger,
    FileStatementListAction,
    DataExtractAction,
    FileListTask,
    MenuDrawerTask,
    FileParserTask,
  ],
  exports: [FileStatementListAction],
})
export class FileStatementHandlerModule {}
