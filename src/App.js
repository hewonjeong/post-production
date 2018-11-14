import React from 'react'
import Layout from './layout/Layout'
import Preview from './modules/Preview'
import Panel from './modules/Panel'
import Timeline from './modules/Timeline'

const App = () => (
  <Layout content={<Preview />} aside={<Panel />} footer={<Timeline />} />
)

export default App
