import { Logger, Module } from '@nestjs/common';
import { AppCommand } from './app.command';
import { FileParserTask } from './file-statement-handler/task/file-parser.task';
import { FileStatementHandlerModule } from './file-statement-handler/file-statement-handler.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FileStatementHandlerModule,
  ],
  controllers: [],
  providers: [Logger, AppCommand, FileParserTask],
})
export class AppModule {}
