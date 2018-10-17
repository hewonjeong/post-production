import React from 'react'
import Layout from './layout/Layout'
import Preview from './modules/Preview'
import Panel from './modules/Panel'
import crossFade from './videocontext/crossFade'

export const { Provider, Consumer } = React.createContext()
class App extends React.Component {
  canvas = React.createRef()
  state = { assets: [] }

  addAssets = assets => {
    this.setState(
      prev => ({ assets: [...prev.assets, ...assets] }),
      this.playSample
    )
  }

  playSample = () => {
    crossFade(this.canvas.current)(this.state.assets.map(getURL))
  }

  render() {
    const value = { ...this.state, addAssets: this.addAssets }

    return (
      <Provider value={value}>
        <Layout
          header="Title"
          content={<Preview canvas={this.canvas} />}
          aside={<Panel />}
          footer="Track"
        />
      </Provider>
    )
  }
}

export default App

/* utils */
const getURL = file => URL.createObjectURL(file)
