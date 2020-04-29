import React from 'react';
import '../css/Welcome.css';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FormSearch from '../utils/FormSearch';

class Welcome extends React.Component {
  render() {
    return (
      <div className="banner-welcome">
        <h4 className="center">Download the beat of DJ FUMFUM</h4>
        <div className="box-form-search-welcome">
          <FormSearch />
        </div>
      </div>
    );
  }
}
function mapStateToPros(state) {
  return {
    music: state.music.allMusic,
  };
}

export default connect(mapStateToPros, actions)(Welcome);
