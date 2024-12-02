import { StrategyInterface } from './strategy.interface';
import { FinanceStatementFieldSchema } from '../../database/schema/finance-statement-field.schema';

export class UrksibOnlineStrategy extends StrategyInterface {
  run(data: any): FinanceStatementFieldSchema[] {
    return [];
  }
}
