import React from 'react'
import Recorder from './Recorder'

const Export = ({ assets }) => !!Object.keys(assets).length && <Recorder />

export default Export
