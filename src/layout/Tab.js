import React, { useState } from 'react'
import { path, head } from 'ramda'
import classNames from 'classnames'
import style from './Tab.module.css'

const Tab = ({ list = [] }) => {
  const [current, setCurrent] = useState(path(['name'], head(list)))

  const tab = list.map(({ name }) => {
    const attrs = {
      className: classNames(style.item, current === name && style.active),
      onClick: () => setCurrent(name)
    }
    return (
      <button {...attrs} key={name}>
        {name}
      </button>
    )
  })

  const contents = list.map(({ name, component }) => (
    <article
      className={classNames(current !== name && style.hidden)}
      key={name}
    >
      {component}
    </article>
  ))

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <nav style={{ flex: 'none' }}>{tab}</nav>
      <main style={{ flex: 1, ...overflow }}>{contents}</main>
    </div>
  )
}

const overflow = { overflow: 'hidden', overflowY: 'scroll' }

export default Tab
