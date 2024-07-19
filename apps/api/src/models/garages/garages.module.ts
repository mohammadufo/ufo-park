import { Module } from '@nestjs/common'
import { GaragesService } from './graphql/garages.service'
import { GaragesResolver } from './graphql/garages.resolver'
import { GaragesController } from './rest/garages.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [GaragesResolver, GaragesService, PrismaService],
  exports: [GaragesService],
  controllers: [GaragesController],
})
export class GaragesModule {}
