import { handleActions } from 'redux-actions';
const initialState = {
  className: 'theme-light'
};
const reducer = handleActions({
  CHANGE_THEME_TO_DARK:
    (state, action) => {
      return {className: 'theme-dark'};
    },
  CHANGE_THEME_TO_LIGHT:
    (state, action) => {
      return {className: 'theme-light'};
    },
}, initialState);


export default reducer;