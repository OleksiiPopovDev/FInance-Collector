import { StrategyInterface } from './strategy.interface';
import {
  UkrsibbankBusiness,
  UkrsibbankBusinessDocument,
  UkrsibbankBusinessSender,
} from '../type/ukrsibbank-business.type';
import { FinanceStatementFieldSchema } from '../../database/schema/finance-statement-field.schema';

export class UrksibBusinessStrategy extends StrategyInterface {
  run(data: any): FinanceStatementFieldSchema[] {
    return data.map((row) => {
      const [operationDate, operationTime] = row['data_operaciyi']
        ?.split(' ')
        .map(String);
      const [dayOper, monthOper, yearOper] = operationDate
        ?.split('.')
        .map(Number);
      const [hourOper, minuteOper] = operationTime.split(':');

      const [dayDoc, monthDoc, yearDoc] = row['data_dokumenta']
        ?.split('.')
        .map(Number);

      const mappedOriginSource: UkrsibbankBusiness = {
        srpe: row['iedrpou'],
        account: row['rahunok'],
        currency: row['valyuta'],
        date: new Date(yearOper, monthOper - 1, dayOper, hourOper, minuteOper),
        operationCode: row['kod_operaciyi'],
        sender: {
          srpe: row['iedrpou_korespondenta'],
          name: row['korespondent'],
          bankName: row['nazva_banka'],
          account: row['rahunok_korespondenta'],
        } as UkrsibbankBusinessSender,
        document: {
          number: row['nomer_dokumenta'],
          date: new Date(yearDoc, monthDoc - 1, dayDoc),
        } as UkrsibbankBusinessDocument,
        description: row['priznachennya_platezhu'],
        credit: Number(row['kredit'] || 0),
        debit: Number(row['debet'] || 0),
        uanCover: Number(row['grivneve_pokrittya'] || 0),
      } as UkrsibbankBusiness;

      return {
        status: true,
        date: mappedOriginSource.date,
        description: mappedOriginSource.description,
        account: mappedOriginSource.account,
        debit: mappedOriginSource.debit,
        credit: mappedOriginSource.credit,
        currency: mappedOriginSource.currency,
        originSource: mappedOriginSource,
      } as FinanceStatementFieldSchema;
    });
  }
}
