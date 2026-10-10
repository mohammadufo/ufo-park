import {
  ToastContainer as ReactToastifyContainer,
  toast,
  Slide,
} from 'react-toastify'

export const ToastContainer = () => (
  <ReactToastifyContainer
    transition={Slide}
    position="bottom-right"
    hideProgressBar={false}
    closeOnClick
  />
)

export { toast }
