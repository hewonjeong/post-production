import React from 'react'
import Layout from './layout/Layout'
import Preview from './modules/Preview'
import Panel from './modules/Panel'
import Track from './modules/Track'
import crossFade from './videocontext/crossFade'

export const { Provider, Consumer } = React.createContext()
class App extends React.Component {
  canvas = React.createRef()
  state = { assets: {} }

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
    crossFade(canvas)(videos)
  }

  render() {
    return (
      <Provider value={{ ...this.state, addAssets: this.addAssets }}>
        <Layout
          header="Title"
          content={<Preview canvas={this.canvas} />}
          aside={<Panel />}
          footer={<Track />}
        />
      </Provider>
    )
  }
}

export default App
