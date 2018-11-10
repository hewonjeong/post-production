import React from 'react'
import Layout from './layout/Layout'
import Preview from './modules/Preview'
import Panel from './modules/Panel'
import Track from './modules/Track'
import crossFade from './videocontext/crossFade'

export const { Provider, Consumer } = React.createContext()
class App extends React.Component {
  canvas = React.createRef()
  state = { assets: {}, isPlaying: false }

  addAssets = assets => {
    this.setState(
      prev => ({ assets: { ...prev.assets, ...assets } }),
      this.playSample
    )
  }

  playSample = () => {
    const { assets } = this.state
    const canvas = this.canvas.current
    const videos = Object.values(assets).map(asset => asset.url)
    const callback = Array.from({ length: 2 }, (_, i) => () =>
      this.setState({ isPlaying: !i })
    )
    crossFade(canvas)(videos, callback)
  }

  render() {
    const value = {
      ...this.state,
      canvas: this.canvas.current,
      addAssets: this.addAssets
    }

    return (
      <Provider value={value}>
        <Layout
          content={<Preview canvas={this.canvas} />}
          aside={<Panel />}
          footer={<Track />}
        />
      </Provider>
    )
  }
}

export default App
