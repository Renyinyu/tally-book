export interface IAddBill {
  amount: string;
  typeId: number;
  typeName: string;
  date: Date;
  payType: number;
  remark?: string;
}

export interface IBillListDto {
  date: Date;
  page: number;
  pageSize: number;
  typeId?: number;
}

export interface IBillModifyDto extends Partial<IAddBill> {
  id: number;
}
