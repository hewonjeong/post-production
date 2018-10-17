import React from 'react'
import { Consumer } from '../App'

const Track = () => (
  <Consumer>
    {({ assets: clips }) => (
      <div style={{ ...flex, overflowX: 'scroll', padding: 16 }}>
        {Object.entries(clips).map(([filename, clip]) => (
          <div style={style.clip} key={filename}>
            {clip.images.map((url, index) => (
              <img src={url} alt="" height={40} key={index} />
            ))}
          </div>
        ))}
      </div>
    )}
  </Consumer>
)

const flex = {
  display: 'flex',
  flexWrap: 'no-wrap'
}

const style = {
  clip: {
    ...flex,
    flex: 'none',
    border: '3px solid orange',
    borderRadius: 4,
    overflow: 'hidden'
  }
}

export default Track
