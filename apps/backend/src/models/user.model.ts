import { prisma } from '../utils/db'

async function findFirst() {
  const user = await prisma.user.findFirst()
  console.log(user)
} 

findFirst()