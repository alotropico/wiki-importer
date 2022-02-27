import { useCallback, useLayoutEffect, useState } from 'react'

import useEventListener from './useEventListener'

function useElementSize() {
  const [ref, setRef] = useState<any>(null)
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })
  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    })
  }, [ref?.offsetHeight, ref?.offsetWidth])

  useEventListener('resize', handleSize)

  useLayoutEffect(() => {
    handleSize()
  }, [ref?.offsetHeight, ref?.offsetWidth])

  return [setRef, size]
}

export default useElementSize
