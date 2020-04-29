import { combineReducers } from 'redux';
import auth from './auth';
import music from './music';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: auth,
  form: formReducer,
  music: music,
});
