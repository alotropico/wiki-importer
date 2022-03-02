import { BrowserRouter } from 'react-router-dom'

import { AppRouterProps } from './types'

export default function AppRouterProvider({ children }: AppRouterProps): React.ReactElement {
  return <BrowserRouter>{children}</BrowserRouter>
}
