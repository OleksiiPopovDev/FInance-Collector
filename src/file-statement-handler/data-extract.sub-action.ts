import { Injectable } from '@nestjs/common';
import { FileParserTask } from './task/file-parser.task';
import { BankListEnum } from '../enum/bank-list.enum';
import { MapperTask } from './task/mapper/mapper.task';
import { UrksibOnlineStrategy } from './task/mapper/urksib-online.strategy';
import { UrksibBusinessStrategy } from './task/mapper/urksib-business.strategy';
import { UkrsibbankOnline } from './task/type/ukrsibbank-online.type';
import { UkrsibbankBusiness } from './task/type/ukrsibbank-business.type';
import { StrategyInterface } from './task/mapper/strategy.interface';
import { FinanceStatementSourceSchema } from './database/schema/finance-statement-source.schema';
import { SourceType } from './task/type/source.type';

@Injectable()
export class DataExtractAction {
  constructor(
    private readonly fileParserTask: FileParserTask,
    private readonly mapperTask: MapperTask,
    private readonly urksibOnlineStrategy: UrksibOnlineStrategy,
    private readonly urksibBusinessStrategy: UrksibBusinessStrategy,
    // private readonly monobankStrategy: UrksibBusinessStrategy,
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

  public run(): FinanceStatementSourceSchema {
    if (!this.filePath || !this.bankName) {
      throw new Error('File path or bank name not found!');
    }

    switch (this.bankName) {
      case BankListEnum.UKRSIB_ONLINE:
        return this.prepareResponse<UkrsibbankOnline>(
          this.urksibOnlineStrategy,
          BankListEnum.UKRSIB_ONLINE,
          SourceType.FILE,
        );

      case BankListEnum.UKRSIB_BUSINESS:
        return this.prepareResponse<UkrsibbankBusiness>(
          this.urksibBusinessStrategy,
          BankListEnum.UKRSIB_BUSINESS,
          SourceType.FILE,
        );

      case BankListEnum.MONOBANK:
        return {} as FinanceStatementSourceSchema;
      // this.prepareResponse<any>(
      //   this.monobankStrategy,
      //   BankListEnum.UKRSIB_BUSINESS,
      //   SourceType.API,
      // );

      default:
        throw new Error('Bank not found!');
    }
  }

  private prepareResponse<T>(
    strategy: StrategyInterface,
    bankName: BankListEnum,
    sourceType: SourceType,
  ): FinanceStatementSourceSchema {
    this.mapperTask.setStrategy(strategy);
    return {
      name: bankName,
      type: sourceType,
      fileHash: sourceType === SourceType.FILE ? this.filePath : null,
      mapper: this.mapperTask.run(this.fileParserTask.run<T>(this.filePath)),
    } as FinanceStatementSourceSchema;
  }
}
