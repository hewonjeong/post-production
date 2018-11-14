import { combineReducers } from 'redux'

const video = (state = {}, action) => {
  switch (action.type) {
    case 'video/add':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

const audio = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const text = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({ video, audio, text })
