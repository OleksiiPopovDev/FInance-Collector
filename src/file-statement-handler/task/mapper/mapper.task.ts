import { StrategyInterface } from './strategy.interface';
import { FinanceStatementFieldSchema } from '../../database/schema/finance-statement-field.schema';

export class MapperTask {
  private strategy: StrategyInterface;

  public setStrategy(strategy: StrategyInterface) {
    this.strategy = strategy;
  }

  public run(data: any): FinanceStatementFieldSchema[] {
    if (!this.strategy) {
      throw new Error('Strategy is not set');
    }
    return this.strategy.run(data);
  }
}
