import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import useForm from '../useForm';

const MultipleFormExample = ({ onSubmit }) => {
  const INITIAL_CONTACT_VALUES = {
    name: '',
    number: '',
  };

  const [values, { contactList }] = useForm({
    contactList: [],
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={() => contactList.add(INITIAL_CONTACT_VALUES)}
      >
        Add contact
      </button>

      {_.map(contactList.list, (contact, index) => (
        <div key={index}>
          <input type="text" {...contact.name.text} />
          <input type="text" {...contact.number.text} />
          <button type="button" onClick={() => contactList.remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="submit"> Submit </button>
    </form>
  );
};

MultipleFormExample.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MultipleFormExample;
