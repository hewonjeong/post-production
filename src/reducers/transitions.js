import uuidv4 from 'uuid/v4'

export default (state = {}, action) => {
  switch (action.type) {
    case 'transition/add':
      return { ...state, [uuidv4()]: action.transition }

    default:
      return state
  }
}
