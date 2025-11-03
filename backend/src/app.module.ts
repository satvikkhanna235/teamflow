import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // ✅ loads .env automatically
    AuthModule,
    ProjectModule,
    TaskModule,
  ],
})
export class AppModule {}
