import React, { useEffect, useRef } from 'react'

const TextCanvas = ({ text, onFill }) => {
  const canvasRef = useRef()

  useEffect(
    () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const fontSize = [24, 14]
      ctx.fillStyle = 'white'

      text.forEach((text, index) => {
        const bottom = !index ? fontSize[0] : 0
        ctx.font = `${fontSize[index]}px sans-serif`
        ctx.fillText(text, 10, 540 - 10 - bottom)
      })

      onFill(canvas)
    },
    [text]
  )

  return <canvas ref={canvasRef} width="960" height="540" hidden />
}

export default TextCanvas
