import React from 'react'
import Layout from './layout/Layout'
import Panel from './modules/Panel'

export const { Provider, Consumer } = React.createContext()
class App extends React.Component {
  state = { assets: [] }

  addAssets = assets => {
    this.setState(prev => ({ assets: [...prev.assets, ...assets] }))
  }

  render() {
    return (
      <Provider value={{ ...this.state, addAssets: this.addAssets }}>
        <Layout
          header="Title"
          content="Preview"
          aside={<Panel />}
          footer="Track"
        />
      </Provider>
    )
  }
}

export default App
