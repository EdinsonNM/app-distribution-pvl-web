import { handleActions } from 'redux-actions';
const initialState = {
  show: false,
  collapse: false
};
const reducer = handleActions({
  CHANGE_SIDEBAR_VISIBILITY:
    (state, action) => {
      return {...state, collapse: !state.collapse};
    },
  CHANGE_MOBILE_SIDEBAR_VISIBILITY:
    (state, action) => {
      return {...state, show: !state.show};
    },
}, initialState);


export default reducer;