import { Prop, Schema } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { UkrsibbankOnline } from '../../task/type/ukrsibbank-online.type';
import { UkrsibbankBusiness } from '../../task/type/ukrsibbank-business.type';

@Schema({ timestamps: true })
export class FinanceStatementFieldSchema {
  @IsNotEmpty()
  @IsBoolean()
  @Prop({ required: true, type: Boolean })
  status: boolean;

  @IsNotEmpty()
  @IsDate()
  @Prop({ required: true, type: Date })
  date: Date;

  @IsString()
  @Prop({ required: true, type: String })
  description: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, type: String })
  account: string;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true, type: Number })
  debit: number;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true, type: Number })
  credit: number;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, type: String })
  currency: string;

  @IsObject()
  @Prop({ required: true, type: Object })
  originSource: UkrsibbankOnline | UkrsibbankBusiness;
}
