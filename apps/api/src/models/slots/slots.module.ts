import { Module } from '@nestjs/common'
import { SlotsService } from './graphql/slots.service'
import { SlotsResolver } from './graphql/slots.resolver'
import { SlotsController } from './rest/slots.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [SlotsResolver, SlotsService, PrismaService],
  exports: [SlotsService],
  controllers: [SlotsController],
})
export class SlotsModule {}
