import { InputType, OmitType } from '@nestjs/graphql'
import { Review } from '../entity/review.entity'

@InputType()
export class CreateReviewInput extends OmitType(
  Review,
  ['createdAt', 'updatedAt', 'id'],
  InputType,
) {}
