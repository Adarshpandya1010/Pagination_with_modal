import { GET_API } from "../ApiService";
import * as actions from "../constant";

///redux action
export const pageData = (url) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_REQUEST });

    try {
      const res = await GET_API(url);
      const data = res.data.hits;
      // console.log(data);
      dispatch({ type: actions.GET_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: actions.GET_FAILURE, error: e });
    }
  };
};
