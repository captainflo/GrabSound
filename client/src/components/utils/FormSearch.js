import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../css/FormSearch.css';

const genres = [
  'All',
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
      {genres.map((val) => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

class FormSearch extends React.Component {
  state = {
    audio: '',
  };
  componentDidMount() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }
  submit = (form) => {
    if (form.value) this.props.history.push(`/music/list/${form.value}`);
    this.props.getMusicByGenre(form.value);
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className="box-search hoverable">
          <Field name="value" component={renderGenreSelector} />
          <button
            type="submit"
            className="btn-search hoverable"
            disabled={submitting}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    );
  }
}

export default compose(
  reduxForm({
    form: 'simple', // a unique identifier for this form
  }),
  connect(null, actions),
  withRouter
)(FormSearch);
