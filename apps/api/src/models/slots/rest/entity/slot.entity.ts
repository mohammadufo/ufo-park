import { $Enums, Slot } from '@prisma/client'
import { IsOptional } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class SlotEntity implements RestrictProperties<SlotEntity, Slot> {
  id: number
  createdAt: Date
  updatedAt: Date
  @IsOptional()
  displayName: string
  pricePerHour: number
  @IsOptional()
  length: number
  @IsOptional()
  width: number
  @IsOptional()
  height: number

  type: $Enums.SlotType
  garageId: number
}
