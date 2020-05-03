import { combineReducers } from 'redux';
import auth from './auth';
import music from './music';
import playlist from './playlist';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: auth,
  music: music,
  playlist: playlist,
  form: formReducer,
});
