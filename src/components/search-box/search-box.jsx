import React from 'react';
import PropTypes from 'prop-types';

export const SearchBox = (props) => {
  const inputHandler = event => {
    if (event.key === 'Enter') {
      props.setPhrase(event.target.value);
    }
  };

  return (
    <section className="searchBox">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Type something here and press Enter to Start search.."
        onKeyUp={(event) => inputHandler(event)}
      />
    </section>
  );
};


SearchBox.propTypes = {
  setPhrase: PropTypes.func.isRequired
};
