import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body('title') title: string) {
    const userId = req.user.userId;
    return this.projectService.create(userId, title);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserProjects(@Req() req) {
    const userId = req.user.userId;
    return this.projectService.findAllByUser(userId);
  }
}
