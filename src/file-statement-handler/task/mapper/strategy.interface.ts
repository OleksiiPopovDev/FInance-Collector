import { Injectable } from '@nestjs/common';
import { FieldMapper } from '../../../dto/finance-source';

@Injectable()
export abstract class StrategyInterface {
  abstract run(data: any[]): FieldMapper[];
}
