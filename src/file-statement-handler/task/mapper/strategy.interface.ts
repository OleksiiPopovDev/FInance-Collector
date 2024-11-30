import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class StrategyInterface {
  abstract run(data: any[]): any[];
}
