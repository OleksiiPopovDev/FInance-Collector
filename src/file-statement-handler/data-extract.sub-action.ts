import { Injectable } from '@nestjs/common';
import { FileParserTask } from './task/file-parser.task';
import { UkrsibbankOnline } from '../dto/finance-source';
import { BankListEnum } from '../enum/bank-list.enum';
import { MapperTask } from './task/mapper/mapper.task';
import { UrksibOnlineStrategy } from './task/mapper/urksib-online.strategy';
import { UrksibBusinessStrategy } from './task/mapper/urksib-business.strategy';

@Injectable()
export class DataExtractAction {
  constructor(
    private readonly fileParserTask: FileParserTask,
    private readonly mapperTask: MapperTask,
    private readonly ukrsibbankOnline: UrksibOnlineStrategy,
    private readonly ukrsibbankBusiness: UrksibBusinessStrategy,
  ) {}

  private filePath: string;
  private bankName: string;

  public setFilePath(filePath: string) {
    this.filePath = filePath;
    return this;
  }

  public setBankName(bankName: string) {
    this.bankName = bankName;
    return this;
  }

  public run() {
    if (!this.filePath || !this.bankName) {
      throw new Error('File path or bank name not found!');
    }

    switch (this.bankName) {
      case BankListEnum.UKRSIB_ONLINE:
        this.mapperTask.setStrategy(this.ukrsibbankOnline);
        return this.mapperTask.run(
          this.fileParserTask.run<UkrsibbankOnline>(this.filePath),
        );

      case BankListEnum.UKRSIB_BUSINESS:
        this.mapperTask.setStrategy(this.ukrsibbankBusiness);
        return this.mapperTask.run(
          this.fileParserTask.run<UkrsibbankOnline>(this.filePath),
        );

      case BankListEnum.MONOBANK:
        break;
      default:
        throw new Error('Bank not found!');
    }
  }
}
