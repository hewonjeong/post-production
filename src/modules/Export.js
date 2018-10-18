import React from 'react'
import { Consumer } from '../App'
import Recorder from './Recorder'

const Export = () => (
  <Consumer>
    {value => !!Object.keys(value.assets).length && <Recorder {...value} />}
  </Consumer>
)

export default Export
