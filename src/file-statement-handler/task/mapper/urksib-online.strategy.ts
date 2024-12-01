import { StrategyInterface } from './strategy.interface';
import { FieldMapper } from '../../../dto/finance-source';
import { UkrsibbankOnline } from '../type/ukrsibbank-online.type';

export class UrksibOnlineStrategy extends StrategyInterface {
  run(data: any[]): FieldMapper[] {
    return data.map((row) => {
      const [day, month, year] = row['data_operaciyi']?.split('.').map(Number);

      const mappedOriginSource: UkrsibbankOnline = {
        status: row['ctatus']?.toLowerCase() == 'виконано',
        date: new Date(year, month - 1, day),
        description: row['opis_operaciyi'],
        account: row['rahunok/kartka'],
        category: row['kategoriya'],
        amount: Number(row['suma']),
        currency: row['valyuta'],
      } as UkrsibbankOnline;

      return {
        status: mappedOriginSource.status,
        date: new Date(mappedOriginSource.date),
        description: mappedOriginSource.description,
        account: mappedOriginSource.account,
        debit: mappedOriginSource.amount > 0 ? mappedOriginSource.amount : 0,
        credit:
          mappedOriginSource.amount < 0
            ? Math.abs(mappedOriginSource.amount)
            : 0,
        currency: mappedOriginSource.currency,
        originSource: mappedOriginSource,
      } as FieldMapper;
    });
  }
}
