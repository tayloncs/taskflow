import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/repositories/user/entities/user.entity";
import {
  IUserRepository,
  UserTypeOrmRepository,
} from "src/repositories/user/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUserRepository,
      useClass: UserTypeOrmRepository,
    },
  ],
})
export class UserModule {}
