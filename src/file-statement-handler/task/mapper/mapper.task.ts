import { StrategyInterface } from './strategy.interface';

export class MapperTask {
  private strategy: StrategyInterface;

  public setStrategy(strategy: StrategyInterface) {
    this.strategy = strategy;
  }

  public run(data: any) {
    if (!this.strategy) {
      throw new Error('Strategy is not set');
    }
    return this.strategy.run(data);
  }
}
