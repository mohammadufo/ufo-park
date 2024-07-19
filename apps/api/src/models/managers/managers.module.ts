import { Module } from '@nestjs/common'
import { ManagersService } from './graphql/managers.service'
import { ManagersResolver } from './graphql/managers.resolver'
import { ManagersController } from './rest/managers.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [ManagersResolver, ManagersService, PrismaService],
  exports: [ManagersService],
  controllers: [ManagersController],
})
export class ManagersModule {}
