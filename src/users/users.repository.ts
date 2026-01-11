import { PrismaClient, User } from '@prisma/client';

export class UsersRepository {
  constructor(private prisma: PrismaClient) {}

  create(email: string, password: string): Promise<User> {
    return this.prisma.user.create({
      data: { email, password },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}