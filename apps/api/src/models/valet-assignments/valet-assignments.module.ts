import { Module } from '@nestjs/common'
import { ValetAssignmentsService } from './graphql/valet-assignments.service'
import { ValetAssignmentsResolver } from './graphql/valet-assignments.resolver'
import { ValetAssignmentsController } from './rest/valet-assignments.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [ValetAssignmentsResolver, ValetAssignmentsService, PrismaService],
  exports: [ValetAssignmentsService],
  controllers: [ValetAssignmentsController],
})
export class ValetAssignmentsModule {}
