import { Module } from '@nestjs/common'
import { ReviewsService } from './graphql/reviews.service'
import { ReviewsResolver } from './graphql/reviews.resolver'
import { ReviewsController } from './rest/reviews.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [ReviewsResolver, ReviewsService, PrismaService],
  exports: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
