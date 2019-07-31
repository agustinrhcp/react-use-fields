import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../useForm';

const SimpleFormExample = ({ onSubmit }) => {
  const [values, { name, email, password }] = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...name.text} />
      <input type="email" {...email.text} />
      <input type="password" {...password.text} />

      <button type="submit"> Submit </button>
    </form>
  );
};

SimpleFormExample.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SimpleFormExample;
