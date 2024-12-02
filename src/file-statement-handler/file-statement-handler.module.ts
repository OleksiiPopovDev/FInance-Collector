import { Logger, Module } from '@nestjs/common';
import { FileStatementListAction } from './file-statement-handler.action';
import { FileListTask } from './task/file-list.task';
import { MenuDrawerTask } from './task/menu-drawer.task';
import { FileParserTask } from './task/file-parser.task';
import { DataExtractAction } from './data-extract.sub-action';
import { MapperTask } from './task/mapper/mapper.task';
import { UrksibOnlineStrategy } from './task/mapper/urksib-online.strategy';
import { UrksibBusinessStrategy } from './task/mapper/urksib-business.strategy';
import { FinanceStatementRepository } from './database/finance-statement.repository';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { FinanceStatementSourceSchema } from './database/schema/finance-statement-source.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FinanceStatementSourceSchema.name,
        schema: SchemaFactory.createForClass(FinanceStatementSourceSchema),
      },
    ]),
  ],
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

    FinanceStatementRepository,
  ],
  exports: [FileStatementListAction],
})
export class FileStatementHandlerModule {}
