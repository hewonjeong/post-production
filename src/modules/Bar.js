import { connect } from 'react-redux'
import Bar from '../components/Bar'

export default connect(({ meta: { current, zoom } }) => ({
  left: Math.round(current * zoom)
}))(Bar)
