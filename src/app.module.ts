import { Logger, Module } from '@nestjs/common';
import { AppCommand } from './app.command';
import { FileParserTask } from './file-statement-handler/task/file-parser.task';
import { FileStatementHandlerModule } from './file-statement-handler/file-statement-handler.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    FileStatementHandlerModule,
  ],
  controllers: [],
  providers: [Logger, AppCommand, FileParserTask],
})
export class AppModule {}
