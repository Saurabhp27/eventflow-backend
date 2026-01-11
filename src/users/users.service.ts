import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private repository: UsersRepository;

  constructor(private prisma: PrismaClient) {
    this.repository = new UsersRepository(prisma);
  }

  createUser(email: string, password: string) {
    return this.repository.create(email, password);
  }

  findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }
}