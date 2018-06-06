const initialState = {
  user: { id: 'u-sadlfk', stance: true },
  debate: { _id: 'r-409089', _currentDebatingStance: false },
  debateId: 'r-409089',
  webSocket: {},
  isLoading: true
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case 'SET_USER':
      return { ...state, user: action.user }

    case 'SET_DEBATE':
      return { ...state, debate: action.debate };
      break;

    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.isLoading };
      break;

    case 'SET_WEBSOCKET':
      return { ...state, webSocket: action.webSocket };
      break;

    default:
      return state;
  }

}

export default reducer;
