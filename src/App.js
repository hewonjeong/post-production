import React from 'react'
import Layout from './layout/Layout'
import Preview from './modules/Preview'
import Panel from './modules/Panel'
import Timeline from './modules/Timeline'

export const { Provider, Consumer } = React.createContext()
class App extends React.Component {
  canvas = React.createRef()
  state = { assets: {}, timeline: { video: {}, audio: {}, title: {} } }

  addAssets = assets => {
    this.setState(prev => ({ assets: { ...prev.assets, ...assets } }))
  }

  addTimeline = type => object => {
    this.setState(({ timeline }) => ({
      timeline: { ...timeline, [type]: { ...timeline[type], ...object } }
    }))
  }

  render() {
    const value = {
      ...this.state,
      meta: { total: getTotalEnd(this.state.timeline.video) },
      canvas: this.canvas.current,
      addAssets: this.addAssets,
      addTimeline: this.addTimeline
    }

    return (
      <Provider value={value}>
        <Layout
          content={<Preview canvas={this.canvas} />}
          aside={<Panel />}
          footer={<Timeline />}
        />
      </Provider>
    )
  }
}

export default App

/* helper */
const getTotalEnd = object => {
  const values = Object.values(object).map(o => o.end)
  return values.length ? Math.max(...values) : 0
}
