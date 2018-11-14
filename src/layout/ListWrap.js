import React from 'react'
import style from './ListWrap.module.css'

const ListWrap = ({ children = [] }) => (
  <ul className={style.ul}>
    {children.map((item, index) => (
      <li className={style.li} key={index}>
        {item}
      </li>
    ))}
  </ul>
)

export default ListWrap
