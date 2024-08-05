import { InputType, OmitType } from '@nestjs/graphql'
import { Verification } from '../entity/verification.entity'

@InputType()
export class CreateVerificationInput extends OmitType(
  Verification,
  ['createdAt', 'updatedAt', 'adminId'],
  InputType,
) {}
