import * as actions from "../constant";

const initailState = {
  getData: [],
  loading: false,
  error: null,
};
export const Reducer = (state = initailState, action) => {
  switch (action.type) {
    case actions.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actions.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        getData: state.getData.concat(action.payload),
      };

    case actions.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
