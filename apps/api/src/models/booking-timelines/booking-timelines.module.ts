import { Module } from '@nestjs/common'
import { BookingTimelinesService } from './graphql/booking-timelines.service'
import { BookingTimelinesResolver } from './graphql/booking-timelines.resolver'
import { BookingTimelinesController } from './rest/booking-timelines.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [BookingTimelinesResolver, BookingTimelinesService, PrismaService],
  exports: [BookingTimelinesService],
  controllers: [BookingTimelinesController],
})
export class BookingTimelinesModule {}
