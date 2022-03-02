import AppContextProvider from './Context'
import AppQueriesProvider from './Queries'
import AppRouterProvider from './Router'
import { AppProviderProps } from './types'

export default function Providers({ children }: AppProviderProps): React.ReactElement {
  return (
    <AppContextProvider>
      <AppQueriesProvider>
        <AppRouterProvider>{children}</AppRouterProvider>
      </AppQueriesProvider>
    </AppContextProvider>
  )
}
