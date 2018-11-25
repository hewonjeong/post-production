import React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Layout from './layout/Layout'
import Preview from './modules/Preview'
import Panel from './modules/Panel'
import Timeline from './modules/Timeline'

const App = () => (
  <DragDropContextProvider backend={HTML5Backend}>
    <Layout content={<Preview />} aside={<Panel />} footer={<Timeline />} />
  </DragDropContextProvider>
)

export default App
