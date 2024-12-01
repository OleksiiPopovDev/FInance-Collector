export type UkrsibbankBusiness = {
  srpe: string; // ЄДРПОУ
  account: string;
  currency: string;
  date: Date;
  operationCode: string;
  sender: UkrsibbankBusinessSender;
  document: UkrsibbankBusinessDocument;
  description: string;
  credit: number;
  debit: number;
  uanCover: number;
};

export type UkrsibbankBusinessSender = {
  srpe: string;
  name: string;
  bankName: string;
  account: string;
};

export type UkrsibbankBusinessDocument = {
  number: string;
  date: Date;
};
