import { InputType, OmitType } from '@nestjs/graphql'
import { Slot } from '../entity/slot.entity'

@InputType()
export class CreateSlotInput extends OmitType(
  Slot,
  ['createdAt', 'updatedAt', 'id'],
  InputType,
) {}
