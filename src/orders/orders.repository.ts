import { PrismaClient, Order } from '@prisma/client';

export class OrdersRepository {
  constructor(private prisma: PrismaClient) {}

  create(data: {
    userId: string;
    totalAmount: number;
    items: {
      productName: string;
      price: number;
      quantity: number;
    }[];
  }): Promise<Order> {
    return this.prisma.order.create({
      data: {
        userId: data.userId,
        totalAmount: data.totalAmount,
        items: {
          create: data.items,
        },
      },
      include: { items: true },
    });
  }

  findById(orderId: string) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
  }

  findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  }
}
