import { Module } from '@nestjs/common'
import { UsersService } from './graphql/users.service'
import { UsersResolver } from './graphql/users.resolver'
import { UsersController } from './rest/users.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
