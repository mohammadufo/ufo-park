import { Module } from '@nestjs/common'
import { AddressesService } from './graphql/addresses.service'
import { AddressesResolver } from './graphql/addresses.resolver'
import { AddressesController } from './rest/addresses.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [AddressesResolver, AddressesService, PrismaService],
  exports: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
