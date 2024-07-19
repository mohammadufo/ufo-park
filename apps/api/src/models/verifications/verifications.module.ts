import { Module } from '@nestjs/common'
import { VerificationsService } from './graphql/verifications.service'
import { VerificationsResolver } from './graphql/verifications.resolver'
import { VerificationsController } from './rest/verifications.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [VerificationsResolver, VerificationsService, PrismaService],
  exports: [VerificationsService],
  controllers: [VerificationsController],
})
export class VerificationsModule {}
