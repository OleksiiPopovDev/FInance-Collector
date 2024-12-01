import { StrategyInterface } from './strategy.interface';
import { FieldMapper } from '../../../dto/finance-source';
import {
  UkrsibbankBusiness,
  UkrsibbankBusinessDocument,
  UkrsibbankBusinessSender,
} from '../type/ukrsibbank-business.type';

export class UrksibBusinessStrategy extends StrategyInterface {
  run(data: any): FieldMapper[] {
    return data.map((row) => {
      const mappedOriginSource: UkrsibbankBusiness = {
        srpe: row['iedrpou'],
        account: row['rahunok'],
        currency: row['valyuta'],
        date: new Date(row['data_operaciyi']),
        operationCode: row['kod_operaciyi'],
        sender: {
          srpe: row['iedrpou_korespondenta'],
          name: row['korespondent'],
          bankName: row['nazva_banka'],
          account: row['rahunok_korespondenta'],
        } as UkrsibbankBusinessSender,
        document: {
          number: row['nomer_dokumenta'],
          date: new Date(row['data_dokumenta']),
        } as UkrsibbankBusinessDocument,
        description: row['priznachennya_platezhu'],
        credit: Number(row['kredit'] || 0),
        debit: Number(row['debet'] || 0),
        uanCover: Number(row['grivneve_pokrittya'] || 0),
      } as UkrsibbankBusiness;

      return {
        status: true,
        date: new Date(mappedOriginSource.date),
        description: mappedOriginSource.description,
        account: mappedOriginSource.account,
        debit: mappedOriginSource.debit,
        credit: mappedOriginSource.credit,
        currency: mappedOriginSource.currency,
        originSource: mappedOriginSource,
      } as FieldMapper;
    });
  }
}
