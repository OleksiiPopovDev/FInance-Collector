import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { BankListEnum } from '../enum/bank-list.enum';
import { UkrsibbankOnline } from '../file-statement-handler/task/type/ukrsibbank-online.type';
import { UkrsibbankBusiness } from '../file-statement-handler/task/type/ukrsibbank-business.type';

export enum SourceType {
  FILE = 'file',
  API = 'api',
}

export class ApiCredentials {
  @IsNotEmpty()
  @IsUrl()
  baseUrl: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class FieldMapper {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsNumber()
  debit: number;

  @IsNotEmpty()
  @IsNumber()
  credit: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsObject()
  originSource: UkrsibbankOnline | UkrsibbankBusiness;
}

export class FinanceSource {
  @IsNotEmpty()
  @IsEnum(BankListEnum)
  name: BankListEnum;

  @IsNotEmpty()
  @IsEnum(SourceType)
  type: SourceType;

  @ValidateIf((v) => v.type === SourceType.API)
  @IsNotEmpty()
  credentials?: ApiCredentials;

  @ValidateIf((v) => v.type === SourceType.FILE)
  @IsNotEmpty()
  @IsString()
  fileHash?: string;

  @IsNotEmpty()
  mapper: FieldMapper[];
}
