import React from 'react'
import { node } from 'prop-types'

const propTypes = { header: node, content: node, aside: node, footer: node }
const defaultProps = { header: null, content: null, aside: null, footer: null }

const Layout = ({ header, content, aside, footer }) => (
  <>
    <header style={style.header}>{header}</header>

    <main style={style.main}>
      <section style={style.content}>{content}</section>
      <aside style={style.aside}>{aside}</aside>
    </main>

    <footer style={style.footer}>{footer}</footer>
  </>
)

Layout.propTypes = propTypes
Layout.defaultProps = defaultProps

const borderBottom = '2px solid hsl(0, 0%, 15%)'
const backgroundColor = 'hsl(0, 0%, 20%)'
const flex = { display: 'flex', flexDirection: 'column', overflow: 'hidden' }

const style = {
  header: { flex: 'none', height: 40, backgroundColor, borderBottom },
  main: { flex: 1, display: 'flex' },
  content: { flex: 1, padding: 16, ...flex },
  aside: { flex: 'none', width: 400, backgroundColor, ...flex },
  footer: { flex: 'none', height: 250 }
}

export default Layout
