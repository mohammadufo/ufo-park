import { PickType } from '@nestjs/swagger'
import { UserEntity } from '../entity/user.entity'

export class CreateUser extends PickType(UserEntity, ['name', 'uid']) {}
