# React Use Fields

useFields builds an structure of inputs props based on the initial values of a form.
It provides a way to track and update those values, but does not handle validations, focus/blur effects or the form itself.

### Simple usage

```jsx
import React from 'react';
import useFields from 'react-use-fields';

const myComponent = ({ onSubmit }) => {
  // initial values must be an object, although it can have more objects or arrays nested within.
  const [values, fields] = {
    username: '',
    password: '',
  };

  return (
    // values will be updated on every onChange call on the fields
    <form onSubmit={() => { onSubmit(values) }}>
      // fields.username.text contains value, onChange, id, name properties
      <input type="text" {...fields.username.text} />
      <input type="password" {...fields.password.text} />
    </form>
  );
};
```

### Multiple Forms

```jsx
import React from 'react';
import useFields from 'react-use-fields';

const myComponent = ({ onSubmit }) => {
  const INITIAL_CONTACT_VALUES = { name: '', email: '', phone: '' };
  const [values, fields] = {
    contacts: [INITIAL_CONTACT_VALUES]
  };

  // fields.contacts has:
  // a list array with all the contact items
  // an add function which receives an initial values and adds it as a new contact
  // a remove function which receives an index and deletes the item from the list.


  return (
    <form
      onSubmit={() => {
        onSubmit(values);
      }}
    >
      <button
        type="button"
        onClick={() => fields.contacts.add(INITIAL_CONTACT_VALUES)}
      >
        Add Contact
      </button>

      {fields.contacts.list.map((contact, index) => (
        <>
          <input type="text" {...contact.name.text} />
          <input type="email" {...contact.email.text} />
          <input type="tel" {...contact.phone.text} />
          <button type="button" onClick={() => fields.contacts.remove(index)}>
            Remove Contact
          </button>
        </>
      ))}
    </form>
  );
};
```

### Radio Buttons

```jsx
//...

const [values, fields] = { 'fruit': '' };

return (
  <>
    <input type="radio" {...fields.fruit.radio('apple')} />
    <input type="radio" {...fields.fruit.radio('banana')} />
    <input type="radio" {...fields.fruit.radio('orange')} />
  </>
);
```

Unlike the `text` property of a field, `radio` is a function which receives a value, and it also returns a `checked` prop, based on the value given and the current value of the form.
