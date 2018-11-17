import { combineReducers } from 'redux'

// 마지막으로 편집된 시간 (이를 기반으로 캔버스 업데이트)
const timestamp = (state = 0, action) => {
  switch (action.type) {
    case 'timeline/add':
      return Date.now()

    default:
      return state
  }
}

// 현재 재생 여부
const isPlaying = (state = false, action) => {
  switch (action.type) {
    case 'control/play':
      return true

    case 'control/pause':
      return false

    default:
      return state
  }
}

// 현재 재생 위치
const current = (state = 0, action) => {
  switch (action.type) {
    case 'control/current':
      return action.current

    default:
      return state
  }
}

// 줌 배율 (1초당 가로픽셀)
const zoom = (state = 40, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({ timestamp, isPlaying, current, zoom })
