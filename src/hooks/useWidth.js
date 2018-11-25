import { useState, useEffect, useRef } from 'react'

export default () => {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const { width } = ref.current.getBoundingClientRect()
    setWidth(width)
  }, [])

  return [width, ref]
}
