// import { CreateUserInput } from './create-user.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { User } from '../entity/user.entity'

@InputType()
export class UpdateUserInput extends PartialType(User) {
  uid: User['uid']
}
