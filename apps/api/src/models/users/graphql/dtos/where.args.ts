import {
  Field,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql'
import { AuthProviderType, Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'

registerEnumType(AuthProviderType, {
  name: 'AuthProviderType',
})

@InputType()
export class UserWhereUniqueInput {
  uid: string
}

@InputType()
export class UserWhereInputStrict
  implements
    RestrictProperties<
      UserWhereInputStrict,
      Omit<
        Prisma.UserWhereInput,
        'Credentials' | 'AuthProvider' | 'Admin' | 'image'
      >
    >
{
  uid: StringFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  name: StringFilter

  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: UserWhereInput[]
  OR: UserWhereInput[]
  NOT: UserWhereInput[]
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict) {}

@InputType()
export class UserListRelationFilter {
  every?: UserWhereInput
  some?: UserWhereInput
  none?: UserWhereInput
}

@InputType()
export class UserRelationFilter {
  is?: UserWhereInput
  isNot?: UserWhereInput
}
