'use client'
import { FormTypeBookSlot } from '@ufopark/forms/src/bookSlot'
import { loadStripe } from '@stripe/stripe-js'

import {
  CreateBookingInput,
  SearchGaragesQuery,
} from '@ufopark/network/src/gql/generated'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { IconShieldCheck } from '@tabler/icons-react'
import { Form } from '../atoms/Form'
import { Badge } from '../atoms/Badge'
import { AutoImageChanger } from './AutoImageChanger'
import { DateRangeBookingInfo } from '../molecules/DateRangeBookingInfo'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { Radio, RadioGroup } from '@headlessui/react'
import { IconTypes } from '../molecules/IconTypes'
import { HtmlInput } from '../atoms/HtmlInput'
import { toLocalISOString } from '@ufopark/util/date'
import { useTotalPrice } from '@ufopark/util/hooks/price'
import { CostTitleValue } from '../molecules/CostTitleValue'
import { Button } from '../atoms/Button'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { TotalPrice } from '@ufopark/util/types'
import { ManageValets } from './ManageValets'
import { toast } from '../molecules/Toast'

export const BookSlotPopup = ({
  garage,
}: {
  garage: SearchGaragesQuery['searchGarages'][0]
}) => {
  const session = useSession()
  const uid = session.data?.user?.uid
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<FormTypeBookSlot>()

  const { startTime, endTime, phoneNumber, type, valet, vehicleNumber } =
    useWatch<FormTypeBookSlot>()

  const pricePerHour = garage.availableSlots.find(
    (slot) => slot.type === type,
  )?.pricePerHour

  const totalPriceObj = useTotalPrice({
    pricePerHour,
  })

  const totalPrice =
    totalPriceObj.parkingCharge +
    totalPriceObj.valetChargeDropoff +
    totalPriceObj.valetChargePickup

  const [booking, setBooking] = useState(false)

  return (
    <Form
      className="grid gap-x-8 gap-y-6 md:grid-cols-2"
      onSubmit={handleSubmit(async (data) => {
        if (!uid) {
          toast('Log in to book a slot.')
          return
        }
        const bookingData: CreateBookingInput = {
          phoneNumber: data.phoneNumber,
          customerId: uid,
          endTime: data.endTime,
          startTime: data.startTime,
          type: data.type,
          garageId: garage.id,
          vehicleNumber: data.vehicleNumber,
          totalPrice,
          pricePerHour,
          ...(data.valet?.pickupInfo && data.valet?.dropoffInfo
            ? {
                valetAssignment: {
                  pickupLat: data.valet?.pickupInfo?.lat,
                  pickupLng: data.valet?.pickupInfo?.lng,
                  returnLat: data.valet?.dropoffInfo?.lat,
                  returnLng: data.valet?.dropoffInfo?.lng,
                },
              }
            : null),
        }

        try {
          setBooking(true)
          // Create booking session
          const res = await createBookingSession(
            uid!,
            totalPriceObj,
            bookingData,
          )
        } catch (error) {
          toast('We couldn’t start the checkout. Try again in a moment.')
        } finally {
          setBooking(false)
        }
      })}
    >
      {/* Left: the garage and the slot */}
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm leading-relaxed text-fg-muted">
            {garage.address?.address}
          </p>
          {garage.verification?.verified ? (
            <Badge variant="green" size="sm">
              <IconShieldCheck className="h-3.5 w-3.5" /> Verified
            </Badge>
          ) : (
            <Badge variant="gray" size="sm">
              Not verified
            </Badge>
          )}
        </div>
        <div className="overflow-hidden border border-line">
          <AutoImageChanger
            images={garage.images || []}
            durationPerImage={10000}
            aspectRatio="aspect-video"
            noAutoChange
          />
        </div>

        <DateRangeBookingInfo startTime={startTime} endTime={endTime} />

        <HtmlLabel title="Slot type" error={errors.type?.message}>
          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                value={value || ''}
                onChange={onChange}
                className="grid grid-cols-2 gap-2"
              >
                {garage.availableSlots.map((slot) => (
                  <Radio
                    key={slot.type}
                    value={slot.type}
                    className="cursor-pointer focus:outline-none"
                  >
                    {({ checked }) => (
                      <div
                        className={`flex items-center gap-3 border p-3 transition-all duration-200 ${
                          checked
                            ? 'border-primary bg-primary/10 shadow-glow-sm'
                            : 'border-line-strong bg-surface-sunken hover:border-fg-subtle'
                        }`}
                      >
                        <span
                          className={checked ? 'text-primary' : 'text-fg-muted'}
                        >
                          {slot.type ? IconTypes[slot.type] : null}
                        </span>
                        <div className="min-w-0">
                          <div className="font-display text-lg font-extrabold leading-none text-fg">
                            ${slot.pricePerHour}
                            <span className="text-xs font-semibold text-fg-muted">
                              /hr
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-fg-subtle">
                            {slot.count} open
                          </div>
                        </div>
                      </div>
                    )}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          />
        </HtmlLabel>
        {!type ? (
          <p className="-mt-2 text-xs text-fg-subtle">
            Choose a slot type to see the total.
          </p>
        ) : null}
      </div>

      {/* Right: details, valet and the total */}
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <HtmlLabel title="Arrive" error={errors.startTime?.message}>
            <HtmlInput
              type="datetime-local"
              min={toLocalISOString(new Date()).slice(0, 16)}
              {...register('startTime')}
            />
          </HtmlLabel>
          <HtmlLabel title="Leave" error={errors.endTime?.message}>
            <HtmlInput
              min={toLocalISOString(new Date()).slice(0, 16)}
              type="datetime-local"
              {...register('endTime')}
            />
          </HtmlLabel>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <HtmlLabel
            title="Vehicle number"
            error={errors.vehicleNumber?.message}
          >
            <HtmlInput
              placeholder="KA01AB1234"
              className="uppercase"
              {...register('vehicleNumber')}
            />
          </HtmlLabel>
          <HtmlLabel title="Phone number" error={errors.phoneNumber?.message}>
            <HtmlInput
              type="tel"
              autoComplete="tel"
              placeholder="+910000000000"
              {...register('phoneNumber')}
            />
          </HtmlLabel>
        </div>

        <ManageValets garage={garage} />

        <div className="mt-auto border border-line bg-surface-sunken p-4">
          <dl className="space-y-2 text-sm">
            <CostTitleValue
              title="Parking"
              price={totalPriceObj.parkingCharge}
            />
            <CostTitleValue
              title="Valet pickup"
              price={totalPriceObj.valetChargePickup}
            />
            <CostTitleValue
              title="Valet drop-off"
              price={totalPriceObj.valetChargeDropoff}
            />
            <div className="flex items-baseline justify-between border-t border-dashed border-line-strong pt-3">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display text-3xl font-black tabular-nums text-primary">
                ${totalPrice ? totalPrice.toFixed(2) : '0.00'}
              </dd>
            </div>
          </dl>
          <Button
            loading={booking}
            type="submit"
            size="lg"
            fullWidth
            className="mt-4"
            disabled={!type}
          >
            Book and pay
          </Button>
          <p className="mt-2 text-center text-xs text-fg-subtle">
            You’ll finish paying on Stripe’s secure checkout.
          </p>
        </div>
      </div>
    </Form>
  )
}

export const createBookingSession = async (
  uid: string,
  totalPriceObj: TotalPrice,
  bookingData: CreateBookingInput,
) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPriceObj,
        uid,
        bookingData,
      }),
    })
    const checkoutSession = await response.json()

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    const stripe = await loadStripe(publishableKey || '')
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.sessionId,
    })

    return result
  } catch (error) {
    console.error('Error creating booking session:', error)
    throw error
  }
}
