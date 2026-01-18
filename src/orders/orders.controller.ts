import { Controller, Post, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateOrderDto } from './dto/create-order-dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.sub, dto);
  }

  @Get(':id')
  getOne(@Req() req, @Param('id') id: string) {
    return this.ordersService.getOrder(id, req.user.sub);
  }

  @Get()
  getUserOrders(@Req() req) {
    return this.ordersService.getUserOrders(req.user.sub);
  }
}
