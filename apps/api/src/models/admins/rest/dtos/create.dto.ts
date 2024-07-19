import { AdminEntity } from '../entity/admin.entity'
import { PickType } from '@nestjs/swagger'

export class CreateAdmin extends PickType(AdminEntity, ['uid']) {}
