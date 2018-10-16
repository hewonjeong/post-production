import React from 'react'
import { string, object } from 'prop-types'

const propTypes = { file: object, url: string }
const defaultProps = { file: object, url: '' }

const Item = ({ file, url }) => {
  const Video = () => <video src={url} autoPlay loop muted />
  const Title = () => <h1 style={{ fontSize: 12 }}>{file.name}</h1>

  return (
    <article>
      <Video />
      <Title />
    </article>
  )
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps

export default Item
