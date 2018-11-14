export default (state = {}, action) => {
  switch (action.type) {
    case 'assets/add':
      return { ...state, ...action.assets }

    default:
      return state
  }
}
