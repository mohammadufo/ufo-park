import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'
import { IconSearch } from '@tabler/icons-react'
import { fieldStyles } from './fieldStyles'

type AutocompleteSimplifiedProps<T> = Omit<
  AutocompleteProps<T, false, false, false>,
  'renderInput'
> & {
  placeholder?: string
}

export const Autocomplete = <T,>({
  placeholder = 'Search...',
  ...props
}: AutocompleteSimplifiedProps<T>) => {
  return (
    <MuiAutocomplete
      autoSelect
      handleHomeEndKeys
      classes={{ listbox: 'p-0 max-h-72', option: 'px-3 py-2.5' }}
      renderInput={(params) => (
        <div ref={params.InputProps.ref} className="relative flex items-center">
          <IconSearch className="pointer-events-none absolute left-3 h-4 w-4 text-fg-subtle" />
          <input
            type="text"
            {...params.inputProps}
            className={`${fieldStyles} pl-9`}
            placeholder={placeholder}
          />
        </div>
      )}
      {...props}
    />
  )
}
