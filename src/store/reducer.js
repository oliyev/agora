const initialState = {
  user: { id: 'u-sadlfk', stance: false },
  debate: { _id: 'r-409089', _currentDebatingStance: false, _args: [], _spectators: [] },
  debateId: '',
  webSocket: {},
  isLoading: true,
  inChatroom: false
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

    case 'SET_IN_CHATROOM':
      return { ...state, inChatroom: action.inChatroom };
      break;

    default:
      return state;
  }

}

export default reducer;
