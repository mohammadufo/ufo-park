import { Module } from '@nestjs/common'
import { CustomersService } from './graphql/customers.service'
import { CustomersResolver } from './graphql/customers.resolver'
import { CustomersController } from './rest/customers.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [CustomersResolver, CustomersService, PrismaService],
  exports: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
