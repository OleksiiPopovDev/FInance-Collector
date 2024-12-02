import { Injectable } from '@nestjs/common';
import { FinanceStatementFieldSchema } from '../../database/schema/finance-statement-field.schema';

@Injectable()
export abstract class StrategyInterface {
  abstract run(data: any[]): FinanceStatementFieldSchema[];
}
