import { QueryClient, QueryClientProvider } from 'react-query'

import { AppQueryProps } from './types'

const queriesConfig = {
  /* Available configuration settings: */
  // cacheTime,
  // enabled,
  // initialData,
  // initialDataUpdatedAt,
  // isDataEqual,
  // keepPreviousData,
  // notifyOnChangeProps,
  // notifyOnChangePropsExclusions,
  // onError,
  // onSettled,
  // onSuccess,
  // queryKeyHashFn,
  // refetchInterval,
  // refetchIntervalInBackground,
  // refetchOnMount,
  // refetchOnReconnect,
  // refetchOnWindowFocus,
  retry: false,
  // retryOnMount,
  // retryDelay,
  // select,
  staleTime: 1000 * 60 * 5,
  // structuralSharing,
  // suspense,
  // useErrorBoundary,
}

const queryClient = new QueryClient({ defaultOptions: { queries: queriesConfig } })

export default function AppQueriesProvider({ children }: AppQueryProps): React.ReactElement {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
