import { Controller, Post, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Req() req, @Body() body) {
    return this.ordersService.createOrder(req.user.sub, body);
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
