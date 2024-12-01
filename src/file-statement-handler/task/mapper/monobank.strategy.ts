import { StrategyInterface } from './strategy.interface';
import { FieldMapper } from '../../../dto/finance-source';

export class UrksibOnlineStrategy extends StrategyInterface {
  run(data: any): FieldMapper[] {
    return [];
  }
}
