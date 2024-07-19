import { Module } from '@nestjs/common'
import { AdminsService } from './graphql/admins.service'
import { AdminsResolver } from './graphql/admins.resolver'
import { AdminsController } from './rest/admins.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [AdminsResolver, AdminsService, PrismaService],
  exports: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
