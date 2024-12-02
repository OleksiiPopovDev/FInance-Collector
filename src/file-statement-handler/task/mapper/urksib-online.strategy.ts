import { StrategyInterface } from './strategy.interface';
import { UkrsibbankOnline } from '../type/ukrsibbank-online.type';
import { FinanceStatementFieldSchema } from '../../database/schema/finance-statement-field.schema';

export class UrksibOnlineStrategy extends StrategyInterface {
  run(data: any[]): FinanceStatementFieldSchema[] {
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
      } as FinanceStatementFieldSchema;
    });
  }
}
