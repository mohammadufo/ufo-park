import { Field, ObjectType } from '@nestjs/graphql'
import { ValetAssignment as ValetAssignmentType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class ValetAssignment
  implements RestrictProperties<ValetAssignment, ValetAssignmentType>
{
  bookingId: number
  createdAt: Date
  updatedAt: Date
  pickupLat: number
  pickupLng: number
  @Field({ nullable: true })
  returnLat: number
  @Field({ nullable: true })
  returnLng: number
  pickupValetId: string
  returnValetId: string
}
