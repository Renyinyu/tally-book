import { prisma } from "@/utils/db"
import { IAddBill, IBillListDto, IBillModifyDto } from "./dto"

class BillModel {
  async add(data: IAddBill, uid: number){
    const bill = await prisma.bill.create({
      data: { userId: uid, remark: '', ...data }
    })
    return bill
  }

  async list(data: IBillListDto, uid: number) {
    const _list = await prisma.bill.findMany({
      where: { userId: uid, typeId: data.typeId, date: data.date },
      take: data.pageSize,
      skip: (data.page - 1) * data.pageSize,
      orderBy: { date: "desc" }
    })
    return _list
  }

  async modify(data: IBillModifyDto, uid: number){ 
    const { id, ...restData } = data
    const result = await prisma.bill.update({
      where: { id: id, userId: uid },
      data: { ...restData }
    })
    return result
  }

  async remove(id: number, uid: number) {
    const result = await prisma.bill.delete({ where: { id: id, userId: uid }})
    return result
  }
}

export {
  BillModel
}
