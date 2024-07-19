import { InputType, OmitType } from '@nestjs/graphql'
import { ValetAssignment } from '../entity/valet-assignment.entity'

@InputType()
export class CreateValetAssignmentInput extends OmitType(
  ValetAssignment,
  ['createdAt', 'updatedAt'],
  InputType,
) {}
