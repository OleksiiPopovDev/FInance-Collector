import { BankListEnum } from '../../../enum/bank-list.enum';
import { Prop, Schema } from '@nestjs/mongoose';
import { FinanceStatementFieldSchema } from './finance-statement-field.schema';
import { IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';
import { SourceType } from '../../task/type/source.type';

@Schema({ timestamps: true })
export class FinanceStatementSourceSchema {
  @IsNotEmpty()
  @IsEnum(BankListEnum)
  @Prop({ required: true, enum: BankListEnum })
  name: BankListEnum;

  @IsNotEmpty()
  @IsEnum(SourceType)
  @Prop({ required: true, enum: SourceType })
  type: SourceType;

  @ValidateIf((v) => v.type === SourceType.FILE)
  @IsNotEmpty()
  @Prop({ required: false, type: String })
  fileHash?: string;

  @IsNotEmpty()
  @Prop({ required: true, type: [FinanceStatementFieldSchema] })
  mapper: FinanceStatementFieldSchema[];
}
