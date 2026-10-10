import {
  FormTypeSearchGarage,
  formDefaultValuesSearchGarages,
} from '@ufopark/forms/src/searchGarages'
import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Button } from '../../atoms/Button'
import { IconAdjustmentsHorizontal } from '@tabler/icons-react'
import { Sidebar } from '../Sidebar'
import { RangeSlider } from '../../molecules/RangeSlider'
import {
  ToggleButtonGroup,
  ToggleButton,
} from '../../molecules/ToggleButtonGroup'
import { FilterHeading } from '../../molecules/FilterHeading'
import { IconTypes } from '../../molecules/IconTypes'

export const FilterSidebar = () => {
  const [open, setOpen] = useState(false)
  const {
    control,
    reset,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchGarage>()

  const activeFilters = ['types', 'pricePerHour', 'width', 'height', 'length']
    .map((key) => key in dirtyFields)
    .filter(Boolean).length

  return (
    <>
      <Button
        size="sm"
        variant="outlined"
        color="black"
        onClick={() => setOpen(true)}
        aria-label={
          activeFilters ? `Filters, ${activeFilters} active` : 'Filters'
        }
      >
        <IconAdjustmentsHorizontal className="h-4 w-4" />
        Filters
        {activeFilters ? (
          <span className="flex h-4 min-w-[1rem] items-center justify-center bg-primary px-1 text-[10px] font-black text-black">
            {activeFilters}
          </span>
        ) : null}
      </Button>
      <Sidebar open={open} setOpen={setOpen} blur={false} title="Filters">
        <div className="flex flex-1 flex-col gap-8">
          <Controller
            name="types"
            control={control}
            render={({
              field: { value = [], onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Vehicle type" />
                  <ToggleButtonGroup
                    value={value}
                    onChange={(_, value) => {
                      onChange(value.sort())
                    }}
                    aria-label="text formatting"
                  >
                    {defaultValues?.types?.map((val) => {
                      if (!val) return null
                      return (
                        <ToggleButton
                          key={val}
                          value={val}
                          selected={value.includes(val)}
                        >
                          {IconTypes[val]}
                        </ToggleButton>
                      )
                    })}
                  </ToggleButtonGroup>
                </div>
              )
            }}
          />
          <Controller
            name="pricePerHour"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Price per hour" />
                  <RangeSlider
                    min={defaultValues?.pricePerHour?.[0]}
                    max={defaultValues?.pricePerHour?.[1]}
                    // max={200}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `$ ${sliderValue.toLocaleString()}`
                    }
                    step={5}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="width"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Width" />
                  <RangeSlider
                    min={defaultValues?.width?.[0]}
                    max={defaultValues?.width?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={2}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="height"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Height" />
                  <RangeSlider
                    min={defaultValues?.height?.[0]}
                    max={defaultValues?.height?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={2}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="length"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Length" />
                  <RangeSlider
                    min={defaultValues?.length?.[0]}
                    max={defaultValues?.length?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={5}
                  />
                </div>
              )
            }}
          />
          <div className="mt-auto grid grid-cols-2 gap-2 border-t border-line pt-4">
            <Button
              variant="outlined"
              color="black"
              onClick={() =>
                reset({ ...getValues(), ...formDefaultValuesSearchGarages })
              }
              disabled={!activeFilters}
            >
              Clear all
            </Button>
            <Button onClick={() => setOpen(false)}>Show garages</Button>
          </div>
        </div>
      </Sidebar>
    </>
  )
}
