import { PropsWithChildren } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from "./Header";
import Modals from "../Modals";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header />
      {children}
      <Modals />
    </LocalizationProvider>
  )
}

export default Layout