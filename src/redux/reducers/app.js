import * as actionTypes from '../actions/app';

const initialState = {
  loading: false,
  location: {},
  weather: {},
};

export default (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case actionTypes.SET_LOADER: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case actionTypes.LOCATION: {
      return {
        ...state,
        location: {...action.payload},
      };
    }

    case actionTypes.SET_WEATHER: {
      return {
        ...state,
        weather: {...action.payload},
      };
    }
    default:
      return state;
  }
};
