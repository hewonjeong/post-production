import { combineReducers } from 'redux'
import assets from './assets'
import timeline from './timeline'
import transitions from './transitions'
import meta from './meta'

export default combineReducers({ assets, timeline, transitions, meta })
