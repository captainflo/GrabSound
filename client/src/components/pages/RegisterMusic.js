import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import renderField from '../auth/renderField';
import M from 'materialize-css/dist/js/materialize.min.js';

const genre = [
  'Acoustic',
  'Alternative',
  'Blues',
  'Classical',
  'Country',
  'Electronic',
  'Hip Hop',
  'Beats and Instrumentals',
  'Jazz',
  'Latin',
  'Metal',
  'Podcasts',
  'Pop',
  'Rock',
  'Urban/R&B',
  'World',
];

const renderGenreSelector = ({ input, meta: { touched, error } }) => (
  <div className="input-field">
    <i className="material-icons prefix">album</i>
    <select {...input}>
      <option value="">Select a genre...</option>
      {genre.map((val) => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

class RegisterMusic extends React.Component {
  state = {
    image: '',
    imageSound: '',
    publicId: '',
    publicIdSound: '',
    value: '',
  };

  componentDidMount() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  deleteSound = async () => {
    const sound = {
      audio: this.state.publicIdSound,
    };
    this.props.deleteAudio(sound);
    this.setState({ imageSound: '', publicIdSound: '' });
  };

  deletePhoto = async () => {
    const image = {
      img: this.state.publicId,
    };
    this.props.deleteImage(image);
    this.setState({ image: '', publicId: '' });
  };

  uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: 'dxeiiwxha', upload_preset: 'cwkhqerx', tags: ['xmas'] },
      (error, result) => {
        if (result) {
          console.log(result[0]);
          this.setState({ image: result[0].url });
          this.setState({ publicId: result[0].public_id });
        }
      }
    );
  };

  uploadWidgetAudio = () => {
    const image = process.env.PUBLIC_URL + '/images/icon-sound.png';
    window.cloudinary.openUploadWidget(
      { cloud_name: 'dxeiiwxha', upload_preset: 'mqdda5jq', tags: ['m4a'] },
      (error, result) => {
        if (result) {
          console.log(result[0]);
          this.setState({ imageSound: image });
          this.setState({ publicIdSound: result[0].secure_url });
        }
      }
    );
  };

  submit = (form) => {
    console.log(form);
    if (this.state.publicIdSound && this.state.image) {
      const formValue = {
        name: form.name,
        singer: form.singer,
        cover: this.state.image,
        genre: form.value,
        audio: this.state.publicIdSound,
      };
      this.props.createMusic(formValue, () => this.props.history.push(`/`));
    } else {
      console.log('missing field');
    }
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container">
        <h4 className="center">Register Sound</h4>
        <form className="box-register" onSubmit={handleSubmit(this.submit)}>
          <div className="row">
            <div className="col m6 s12">
              <div className="input-field">
                <Field
                  name="name"
                  type="text"
                  component={renderField}
                  placeholder="name"
                  label="name"
                  icon="account_circle"
                />
              </div>
            </div>
            <div className="col m6 s12">
              <div className="input-field">
                <Field
                  name="singer"
                  type="text"
                  component={renderField}
                  label="singer"
                  icon="account_box"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col m6 s12">
              <Field name="value" component={renderGenreSelector} />
            </div>
            <div className="col m6 s12"></div>
          </div>
          <div className="row">
            <div className="col m6 s12">
              <p>Add Audio </p>
              <p
                onClick={this.uploadWidgetAudio.bind(this)}
                className="upload-button"
              >
                <i className="fas fa-headphones-alt"></i>
              </p>
              {this.state.imageSound ? (
                <div>
                  <div className="delete-picture" onClick={this.deleteSound}>
                    <i className="far fa-times-circle"></i>
                  </div>
                  <img
                    className="photo-show"
                    src={this.state.imageSound}
                    alt="avatar"
                  />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="col m6 s12">
              <p>Add Image </p>
              <p
                onClick={this.uploadWidget.bind(this)}
                className="upload-button"
              >
                <i className="fas fa-camera"></i>
              </p>
              {this.state.image ? (
                <div>
                  <div className="delete-picture" onClick={this.deletePhoto}>
                    <i className="far fa-times-circle"></i>
                  </div>
                  <img
                    className="photo-show"
                    src={this.state.image}
                    alt="avatar"
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="center">
            <button
              type="submit"
              disabled={submitting}
              className="waves-effect waves-light btn btn-signin"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

export default compose(
  connect(mapStateToPros, actions),
  reduxForm({ form: 'musicForm' })
)(RegisterMusic);
