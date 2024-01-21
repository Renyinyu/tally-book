import { prisma } from "@/utils/db"
import { IAddBill } from "./dto"

class BillModel {
  async add(data: IAddBill, uid: number){
    const bill = await prisma.bill.create({
      data: { userId: uid, remark: '', ...data }
    })
    return bill
  }
}

export {
  BillModel
}
