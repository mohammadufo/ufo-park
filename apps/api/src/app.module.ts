import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { JwtModule } from '@nestjs/jwt'
import { AdminsModule } from './models/admins/admins.module'
import { CustomersModule } from './models/customers/customers.module'
import { ManagersModule } from './models/managers/managers.module'
import { CompaniesModule } from './models/companies/companies.module'
import { ValetsModule } from './models/valets/valets.module'
import { GaragesModule } from './models/garages/garages.module'
import { AddressesModule } from './models/addresses/addresses.module'
import { SlotsModule } from './models/slots/slots.module'
import { BookingsModule } from './models/bookings/bookings.module'
import { ValetAssignmentsModule } from './models/valet-assignments/valet-assignments.module'
import { BookingTimelinesModule } from './models/booking-timelines/booking-timelines.module'
import { ReviewsModule } from './models/reviews/reviews.module'
import { VerificationsModule } from './models/verifications/verifications.module'
import { UsersModule } from './models/users/users.module'
import { StripeModule } from './models/stripe/stripe.module'
import { PrismaModule } from './common/prisma/prisma.module'

const MAX_AGE = 24 * 60 * 60
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: MAX_AGE,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      // Show Apollo Sandbox at /graphql in every environment. Without it,
      // production disables the landing page and a browser visit to
      // /graphql only gets Apollo's CSRF error.
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      fieldResolverEnhancers: ['guards'],
      // Vercel's filesystem is read-only, so keep the schema in memory there.
      autoSchemaFile: process.env.VERCEL
        ? true
        : join(process.cwd(), 'src/schema.gql'),
      // buildSchemaOptions: {
      //   numberScalarMode: 'integer',
      // },
    }),

    PrismaModule,

    StripeModule,

    AdminsModule,
    CustomersModule,
    ManagersModule,
    ValetsModule,
    CompaniesModule,
    GaragesModule,
    AddressesModule,
    SlotsModule,
    BookingsModule,
    ValetAssignmentsModule,
    BookingTimelinesModule,
    ReviewsModule,
    VerificationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
