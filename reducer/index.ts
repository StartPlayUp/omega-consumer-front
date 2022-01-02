import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import { combineReducers } from "redux";

// (이전상태, 액션) => 다음상태
const rootReducer = (state: any, action: any) => {
  // console.log("reducer : action : ", state, action)
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        // post,
      });
      return combinedReducer(state, action);
    }
  }
};


export default rootReducer;
