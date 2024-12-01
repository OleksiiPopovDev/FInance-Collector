import { StrategyInterface } from './strategy.interface';
import { FieldMapper } from '../../../dto/finance-source';

export class MapperTask {
  private strategy: StrategyInterface;

  public setStrategy(strategy: StrategyInterface) {
    this.strategy = strategy;
  }

  public run(data: any): FieldMapper[] {
    if (!this.strategy) {
      throw new Error('Strategy is not set');
    }
    return this.strategy.run(data);
  }
}
