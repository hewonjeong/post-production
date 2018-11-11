import React from 'react'
import Layout from './layout/Layout'
import Preview from './modules/Preview'
import Panel from './modules/Panel'
import Track from './modules/Track'

export const { Provider, Consumer } = React.createContext()
class App extends React.Component {
  canvas = React.createRef()
  state = { assets: {}, isPlaying: false }

  addAssets = assets => {
    this.setState(prev => ({ assets: { ...prev.assets, ...assets } }))
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
