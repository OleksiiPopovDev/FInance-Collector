import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';

export type UkrsibbankOnline = {
  status: string;
  date: string;
  description: string;
  account: string;
  category: string;
  amount: string;
  currency: string;
};

export enum SourceType {
  FILE = 'file',
  API = 'api',
}

export class FinanceSource {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(SourceType)
  type: SourceType;

  @ValidateIf((v) => v.type === SourceType.API)
  @IsNotEmpty()
  credentials: ApiCredentials;

  @ValidateIf((v) => v.type === SourceType.FILE)
  @IsNotEmpty()
  @IsString()
  fileFieldName: string;

  @ValidateIf((v) => v.type === SourceType.FILE)
  @IsNotEmpty()
  mapper: FieldMapper;
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
  @IsNumber()
  @IsString()
  status: number | string;

  @IsString()
  @IsNumber()
  date: number | string;

  @IsNumber()
  @IsNumber()
  description: number | string;

  @IsNumber()
  @IsNumber()
  account: number | string;

  @IsNumber()
  @IsNumber()
  amount: number | string;

  @IsNumber()
  @IsNumber()
  currency: number | string;
}
