import keys from '../../config/keys';
import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  EDIT_USER,
  MUSIC,
  MUSIC_BY_GENRE,
  ALL_MUSIC,
  MUSIC_ERROR,
} from './types';
import * as JWT from 'jwt-decode';

///////////////////////////////// User Authentification ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// Signup with Passport JWT
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signup`, formProps);
    localStorage.setItem('token', response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        id: data.sub,
        email: data.email,
      };
      const response = await axios.get(`/api/user/${data.id}`);
      dispatch({ type: AUTH_USER, payload: response.data });
      callback(); /* history callback */
    } else {
      token = null;
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

// Signin with Passport JWT
export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signin`, formProps);
    localStorage.setItem('token', response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        id: data.sub,
        email: data.email,
      };
      const response = await axios.get(`/api/user/${data.id}`);
      dispatch({ type: AUTH_USER, payload: response.data });
      callback(); /* history callback */
    } else {
      token = null;
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

// Signout User by Auth or Passport JWT
export const signout = () => async (dispatch) => {
  // Signout for Auth(Google, insta, linkedin, facebook)
  await axios.get('/api/logout');
  dispatch({ type: AUTH_USER, payload: '' });
  localStorage.removeItem('token');
  dispatch({ type: AUTH_ERROR, payload: '' });
};

// Fetch the user by Passport JWT
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  let token = localStorage.token;
  if (token) {
    // Decode token
    token = JWT(token);
    // let token to variable data
    let data = token;
    data = {
      id: data.sub,
      email: data.email,
    };
    const response = await axios.get(`/api/user/${data.id}`);
    dispatch({ type: AUTH_USER, payload: response.data });
  } else {
    token = null;
    dispatch({ type: AUTH_USER, payload: res.data });
  }
};

// Edit User
export const editUser = (id, formValues, callback) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_ERROR, payload: '' });
    const response = await axios.post(`/api/user/${id}`, formValues);
    dispatch({ type: EDIT_USER, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

// Edit delete
export const deleteUser = (id, callback) => async (dispatch) => {
  await axios.delete(`/api/user/${id}`);
  dispatch({ type: EDIT_USER, payload: '' });
  localStorage.removeItem('token');
  callback(); /* history callback */
};

///////////////////////////////// Music ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// Create Music
export const createMusic = (form, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/music/create`, form);
    dispatch({ type: MUSIC, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: MUSIC_ERROR, payload: 'error create music' });
  }
};

// All Music
export const getAllMusic = () => async (dispatch) => {
  try {
    const response = await axios.post(`/api/all/music`);
    dispatch({ type: ALL_MUSIC, payload: response.data });
  } catch (e) {
    dispatch({ type: MUSIC_ERROR, payload: 'error all music' });
  }
};

// get Music By genre
export const getMusicByGenre = (genre) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/music/list/${genre}`);
    dispatch({ type: MUSIC_BY_GENRE, payload: response.data });
  } catch (e) {
    dispatch({ type: MUSIC_ERROR, payload: 'error all music' });
  }
};

////////////////////////////////////////// Cloudinary ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

// Cloudinary Delete Image
export const deleteImage = (image) => async () => {
  await axios.post(`/api/delete/image`, image);
};

// Cloudinary Delete Audio
export const deleteAudio = (audio) => async () => {
  await axios.post(`/api/delete/audio`, audio);
};

////////////////////////////////////////// Stripe /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
export const handleToken = (token, form, callback) => async () => {
  const body = {
    form: form,
    token: token,
  };
  await axios.post(`/api/stripe`, body);
  callback();
};
