import { Module } from '@nestjs/common'
import { ValetsService } from './graphql/valets.service'
import { ValetsResolver } from './graphql/valets.resolver'
import { ValetsController } from './rest/valets.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [ValetsResolver, ValetsService, PrismaService],
  exports: [ValetsService],
  controllers: [ValetsController],
})
export class ValetsModule {}
