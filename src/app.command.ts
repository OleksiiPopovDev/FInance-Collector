import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { FileStatementListAction } from './file-statement-handler/file-statement-handler.action';

@Command({
  name: 'gather',
  description: '',
})
export class AppCommand extends CommandRunner {
  constructor(
    private readonly fileListAction: FileStatementListAction,
    private readonly logger: Logger,
  ) {
    super();
  }

  public async run(): Promise<void> {
    this.logger.log('Run Gather Command');
    await this.fileListAction.run();
  }
}
