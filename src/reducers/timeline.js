import { combineReducers } from 'redux'
import uuidv4 from 'uuid/v4'

const video = (state = {}, action) => {
  switch (action.type) {
    case 'clip/add':
      return action.payload.type === 'video'
        ? { ...state, [uuidv4()]: action.payload.clip }
        : state

    default:
      return state
  }
}

const audio = (state = {}, action) => {
  switch (action.type) {
    case 'clip/add':
      return action.payload.type === 'audio'
        ? { ...state, [uuidv4()]: action.payload.clip }
        : state

    default:
      return state
  }
}

const text = (state = {}, action) => {
  switch (action.type) {
    case 'clip/add':
      return action.payload.type === 'text'
        ? { ...state, [uuidv4()]: action.payload.clip }
        : state

    default:
      return state
  }
}

export default combineReducers({ video, audio, text })
