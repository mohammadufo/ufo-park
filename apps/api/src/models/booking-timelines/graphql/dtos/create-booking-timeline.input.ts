import { InputType, OmitType } from '@nestjs/graphql'
import { BookingTimeline } from '../entity/booking-timeline.entity'

@InputType()
export class CreateBookingTimelineInput extends OmitType(
  BookingTimeline,
  ['id'],
  InputType,
) {}
