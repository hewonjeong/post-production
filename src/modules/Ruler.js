import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import useWidth from '../hooks/useWidth'
import Bar from '../components/Bar'

const Ruler = ({ zoom }) => {
  const [width, ref] = useWidth()

  return (
    <div style={style.component} ref={ref}>
      {Array.from({ length: width / 40 }, (_, i) => {
        const bold = !(i % 5)
        const left = i * 40
        const backgroundColor = `hsl(0, 0%, ${bold ? 50 : 20}%)`

        return (
          <Fragment key={i}>
            <Bar left={left} backgroundColor={backgroundColor} />
            {bold && (
              <div style={{ ...style.text, left: left + 5 }}>
                {left / zoom + '초'}
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

const style = {
  component: { position: 'relative', height: 20, width: '100%' },
  text: { position: 'absolute', fontSize: 12, lineHeight: '20px' }
}

export default connect(({ meta: { zoom } }) => ({ zoom }))(Ruler)
