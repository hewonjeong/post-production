import React from 'react'
import VideoList from '../packages/components/VideoList'
import { Consumer } from '../App'
import ImportAssets from './ImportAssets'

const Assets = () => (
  <Consumer>
    {({ assets, addAssets }) => (
      <>
        <ImportAssets onImport={addAssets} />
        <VideoList videos={assets} />
      </>
    )}
  </Consumer>
)

export default Assets
