import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SearchBox extends Component {
  constructor (props) {
    super();
  }

  inputHandler = event => {
    if (event.key === 'Enter') {
      this.props.setPhrase(event.target.value);
    }
  }


  render () {
    return (
      <section className="searchBox">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Type something here and press Enter to Start search.."
          onKeyUp={(event) => this.inputHandler(event)}
        />
      </section>
    );
  }
}

SearchBox.propTypes = {
  setPhrase: PropTypes.func.isRequired
};
