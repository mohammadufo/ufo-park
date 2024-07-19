import { Module } from '@nestjs/common'
import { BookingsService } from './graphql/bookings.service'
import { BookingsResolver } from './graphql/bookings.resolver'
import { BookingsController } from './rest/bookings.controller'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  providers: [BookingsResolver, BookingsService, PrismaService],
  exports: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
