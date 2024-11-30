import { Logger, Module } from '@nestjs/common';
import { FileStatementListAction } from './file-statement-handler.action';
import { FileListTask } from './task/file-list.task';
import { MenuDrawerTask } from './task/menu-drawer.task';
import { FileParserTask } from './task/file-parser.task';
import { DataExtractAction } from './data-extract.sub-action';
import { MapperTask } from './task/mapper/mapper.task';
import { UrksibOnlineStrategy } from './task/mapper/urksib-online.strategy';
import { UrksibBusinessStrategy } from './task/mapper/urksib-business.strategy';

@Module({
  providers: [
    Logger,
    FileStatementListAction,
    DataExtractAction,
    FileListTask,
    MenuDrawerTask,
    FileParserTask,
    MapperTask,
    UrksibOnlineStrategy,
    UrksibBusinessStrategy,
  ],
  exports: [FileStatementListAction],
})
export class FileStatementHandlerModule {}
