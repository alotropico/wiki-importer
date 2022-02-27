import { useEffect, useRef } from 'react'

function useEventListener(eventName, handler, element?) {
  const savedHandler = useRef<any>()

  useEffect(() => {
    const targetElement = element?.current || window
    if (!(targetElement && targetElement.addEventListener)) {
      return
    }

    if (savedHandler.current !== handler) {
      savedHandler.current = handler
    }

    const eventListener: typeof handler = (event) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!savedHandler?.current) {
        savedHandler.current(event)
      }
    }

    targetElement.addEventListener(eventName, eventListener)

    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, handler])
}

export default useEventListener
