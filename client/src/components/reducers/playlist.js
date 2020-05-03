import { PLAYLIST, PLAYLIST_ERROR, CREATE_PLAYLIST } from '../actions/types';
const INITIAL_STATE = {
  listAudio: '',
  createPlaylist: '',
  errorPlaylist: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PLAYLIST:
      return { ...state, listAudio: action.payload || false };
    case CREATE_PLAYLIST:
      return { ...state, createPlaylist: action.payload || false };
    case PLAYLIST_ERROR:
      return { ...state, errorPlaylist: action.payload };
    default:
      return state;
  }
}
