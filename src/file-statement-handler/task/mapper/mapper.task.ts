import { MapperStrategyAbstract } from './mapper-strategy.abstract';

export class MapperTask {
  private strategy: MapperStrategyAbstract;

  public setStrategy(strategy: MapperStrategyAbstract) {
    this.strategy = strategy;
  }

  public run(data: any) {
    if (!this.strategy) {
      throw new Error('Strategy is not set');
    }
    return this.strategy.run(data);
  }
}
