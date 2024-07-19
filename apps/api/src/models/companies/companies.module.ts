import { Module } from '@nestjs/common'
import { CompaniesService } from './graphql/companies.service'
import { CompaniesResolver } from './graphql/companies.resolver'
import { CompaniesController } from './rest/companies.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [CompaniesResolver, CompaniesService, PrismaService],
  exports: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
