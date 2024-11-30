import { StrategyInterface } from './strategy.interface';
import { UkrsibbankOnline } from '../../../dto/finance-source';

export class UrksibOnlineStrategy extends StrategyInterface {
  run(data: any[]): UkrsibbankOnline[] {
    return data.map((row) => {
      return {
        status: row['Статус']?.toLowerCase() === 'виконано',
        date: row['Датаоперації'],
        description: row['Описоперації'],
        account: row['Рахунок/картка'],
        category: row['Категорія'],
        amount: Number(row['Сума']),
        currency: row['Валюта'],
      } as UkrsibbankOnline;
    });
  }
}
