import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { TaskModule } from "./task/task.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "./repositories/task/entities/task.entity";
import { databaseConfig } from "./config/database.config";
import { UserEntity } from "./repositories/user/entities/user.entity";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    AuthModule,
    TaskModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...databaseConfig,
      entities: [TaskEntity, UserEntity],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
