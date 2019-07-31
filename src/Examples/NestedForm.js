import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../useForm';

const NestedFormExample = ({ onSubmit }) => {
  const [values, { address }] = useForm({
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
    },
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...address.line1.text} />
      <input type="text" {...address.line2.text} />
      <input type="text" {...address.city.text} />
      <input type="text" {...address.state.text} />

      <button type="submit"> Submit </button>
    </form>
  );
};

NestedFormExample.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NestedFormExample;
