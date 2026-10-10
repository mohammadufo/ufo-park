import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import StripeService from './stripe.service'
import { BookingsService } from '../bookings/graphql/bookings.service'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import { CreateBookingInput } from '../bookings/graphql/dtos/create-booking.input'
import { Response } from 'express'

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly bookingService: BookingsService,
  ) {}

  @Get()
  helloStripe() {
    return 'Hello Stripe'
  }

  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createStripeSession(createStripeDto)
  }

  @Get('success')
  async handleStripeSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    if (!sessionId) {
      throw new BadRequestException('Session id missing.')
    }

    const session =
      await this.stripeService.stripe.checkout.sessions.retrieve(sessionId)

    // Only a paid checkout may create a booking. Without this check anyone
    // could create bookings from an abandoned session id.
    if (session.payment_status !== 'paid') {
      return res.redirect(
        process.env.STRIPE_CANCEL_URL || process.env.BOOKINGS_REDIRECT_URL,
      )
    }

    const bookingInput: CreateBookingInput = JSON.parse(
      session.metadata.bookingData,
    )

    // Stripe can send the customer here more than once (refresh, back
    // button). Don't create the same booking twice.
    const [existing] = await this.bookingService.findAll({
      where: {
        customerId: { equals: bookingInput.customerId },
        vehicleNumber: { equals: bookingInput.vehicleNumber },
        startTime: { equals: new Date(bookingInput.startTime).toISOString() },
        endTime: { equals: new Date(bookingInput.endTime).toISOString() },
      },
      take: 1,
    })

    if (!existing) {
      await this.bookingService.create(bookingInput)
    }
    res.redirect(process.env.BOOKINGS_REDIRECT_URL)
  }
}
