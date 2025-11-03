import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(projectId: number, title: string) {
    return this.prisma.task.create({
      data: { title, projectId },
    });
  }

  updateStatus(id: number, status: string) {
    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  delete(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
