import { Verification } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class VerificationEntity
  implements RestrictProperties<VerificationEntity, Verification>
{
  createdAt: Date
  updatedAt: Date
  verified: boolean
  adminId: string
  garageId: number
}
