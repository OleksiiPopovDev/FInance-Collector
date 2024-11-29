import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MapperStrategyAbstract {
  abstract run(data: any): any;

  public readonly bankList: string[] = [
    'UrkSibBank Online',
    'UrkSibBank Business',
    'Monobank',
  ];
}
