import { InputType, OmitType } from '@nestjs/graphql'
import { Valet } from '../entity/valet.entity'

@InputType()
export class CreateValetInput extends OmitType(
  Valet,
  ['createdAt', 'updatedAt'],
  InputType,
) {}
