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

  addAssets = (assets, afterAdd) => {
    const next = () => {
      afterAdd()
      this.playSample()
    }

    this.setState(prev => ({ assets: { ...prev.assets, ...assets } }), next)
  }

  playSample = () => {
    const { assets } = this.state
    const targetVideos = Object.values(assets).map(asset => asset.url)
    crossFade(this.canvas.current)(targetVideos)
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
