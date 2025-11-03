// src/project/project.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, title: string) {
    return await this.prisma.project.create({
      data: {
        title,
        user: {
          connect: { id: userId },
        },
      },
    });
  }
  async findAllByUser(userId: number) {
  return this.prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

}
