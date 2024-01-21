export interface IAddBill {
  amount: string;
  typeId: number;
  typeName: string;
  date: Date;
  payType: number;
  remark?: string;
}