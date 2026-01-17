import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  private repository: OrdersRepository;

  constructor(private prisma: PrismaClient) {
    this.repository = new OrdersRepository(prisma);
  }

  createOrder(userId: string, dto: any) {
    return this.repository.create({
      userId,
      totalAmount: dto.totalAmount,
      items: dto.items,
    });
  }

  async getOrder(orderId: string, userId: string) {
    const order = await this.repository.findById(orderId);
    if (!order || order.userId !== userId) {
      throw new ForbiddenException();
    }
    return order;
  }

  getUserOrders(userId: string) {
    return this.repository.findByUser(userId);
  }
}
