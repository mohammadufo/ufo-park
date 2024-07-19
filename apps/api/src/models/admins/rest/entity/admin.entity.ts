import { Admin } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class AdminEntity implements RestrictProperties<AdminEntity, Admin> {
  uid: string
  createdAt: Date
  updatedAt: Date
}
