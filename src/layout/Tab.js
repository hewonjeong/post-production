import React from 'react'

const Tab = ({ list }) =>
  list.map(({ name, component }) => (
    <article style={{ display: 'flex', flexDirection: 'column' }} key={name}>
      <h1 style={{ flex: 'none' }}>{name}</h1>
      <main style={{ flex: 1, ...overflow }}>{component}</main>
    </article>
  ))

const overflow = { overflow: 'hidden', overflowY: 'scroll' }

export default Tab
