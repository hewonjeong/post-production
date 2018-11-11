import React from 'react'
import VideoList from './VideoList'
import { Consumer } from '../App'
import ImportAssets from './ImportAssets'

const Assets = () => (
  <Consumer>
    {({ assets, timeline, meta, addAssets, addTimeline }) => (
      <>
        <ImportAssets onImport={addAssets} />
        <VideoList videos={assets} meta={meta} addTimeline={addTimeline} />
      </>
    )}
  </Consumer>
)

export default Assets
