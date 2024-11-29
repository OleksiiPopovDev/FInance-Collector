import { Injectable } from '@nestjs/common';
import { FileParserTask } from './task/file-parser.task';
import { UkrsibbankOnline } from '../dto/finance-source';
import { BankListEnum } from '../enum/bank-list.enum';

@Injectable()
export class DataExtractAction {
  constructor(private readonly fileParserTask: FileParserTask) {}

  public run(filePath: string, bankName: string) {
    switch (bankName) {
      case BankListEnum.UKRSIB_ONLINE:
        return this.fileParserTask.run<UkrsibbankOnline>(filePath);
    }
    const data = this.fileParserTask.run<UkrsibbankOnline>(filePath);
  }
}
