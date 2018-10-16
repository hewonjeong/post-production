import React from 'react'
import FileInput from '../packages/components/FileInput'
import VideoList from '../packages/components/VideoList'
import { Consumer } from '../App'

const Assets = () => (
  <Consumer>
    {({ assets, addAssets }) => (
      <>
        <FileInput accept="video" multiple onChange={addAssets} />
        <VideoList list={assets} />
      </>
    )}
  </Consumer>
)

export default Assets
