import Slider, { SliderProps } from '@mui/material/Slider'

export const RangeSlider = (props: SliderProps) => (
  <div className="w-full px-2 pt-8">
    <Slider valueLabelDisplay="on" {...props} />
  </div>
)
