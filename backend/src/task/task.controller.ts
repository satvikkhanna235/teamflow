import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() body: any) {
    return this.taskService.create(body.projectId, body.title);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() body: any) {
    return this.taskService.updateStatus(Number(id), body.status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(Number(id));
  }
}
