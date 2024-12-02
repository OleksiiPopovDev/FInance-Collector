import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FinanceStatementSourceSchema } from './schema/finance-statement-source.schema';
import { Model } from 'mongoose';

@Injectable()
export class FinanceStatementRepository {
  constructor(
    @InjectModel(FinanceStatementSourceSchema.name)
    private readonly model: Model<FinanceStatementSourceSchema>,
  ) {}

  async create(
    source: FinanceStatementSourceSchema,
  ): Promise<FinanceStatementSourceSchema> {
    return this.model.create(source);
  }
}
