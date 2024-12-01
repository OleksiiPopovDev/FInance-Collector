import { Injectable } from '@nestjs/common';
import { FileParserTask } from './task/file-parser.task';
import { FieldMapper, FinanceSource, SourceType } from '../dto/finance-source';
import { BankListEnum } from '../enum/bank-list.enum';
import { MapperTask } from './task/mapper/mapper.task';
import { UrksibOnlineStrategy } from './task/mapper/urksib-online.strategy';
import { UrksibBusinessStrategy } from './task/mapper/urksib-business.strategy';
import { UkrsibbankOnline } from './task/type/ukrsibbank-online.type';
import { UkrsibbankBusiness } from './task/type/ukrsibbank-business.type';

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

  public run(): FinanceSource {
    if (!this.filePath || !this.bankName) {
      throw new Error('File path or bank name not found!');
    }

    switch (this.bankName) {
      case BankListEnum.UKRSIB_ONLINE:
        this.mapperTask.setStrategy(this.ukrsibbankOnline);
        return this.prepareResponse(
          BankListEnum.UKRSIB_ONLINE,
          SourceType.FILE,
          this.mapperTask.run(
            this.fileParserTask.run<UkrsibbankOnline>(this.filePath),
          ),
        );

      case BankListEnum.UKRSIB_BUSINESS:
        this.mapperTask.setStrategy(this.ukrsibbankBusiness);
        return this.prepareResponse(
          BankListEnum.UKRSIB_BUSINESS,
          SourceType.FILE,
          this.mapperTask.run(
            this.fileParserTask.run<UkrsibbankBusiness>(this.filePath),
          ),
        );

      case BankListEnum.MONOBANK:
        return this.prepareResponse(
          BankListEnum.UKRSIB_BUSINESS,
          SourceType.API,
          [],
        );

      default:
        throw new Error('Bank not found!');
    }
  }

  private prepareResponse(
    bankName: BankListEnum,
    sourceType: SourceType,
    mappedStatementsList: FieldMapper[],
  ): FinanceSource {
    return {
      name: bankName,
      type: sourceType,
      fileHash: sourceType === SourceType.FILE ? this.filePath : null,
      mapper: mappedStatementsList,
    } as FinanceSource;
  }
}
