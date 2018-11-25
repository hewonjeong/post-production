import { combineReducers } from 'redux'

const url = (state = null, action) => {
  switch (action.type) {
    case 'record':
      return action.url

    default:
      return state
  }
}

export default combineReducers({ url })
