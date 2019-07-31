import _ from 'lodash';

const buildArrayField = (path, form, setForm) => ({
  list: [],
  add: initialValue => {
    const newValue = [..._.get(form, path), _.clone(initialValue)];
    const newForm = _.set(_.clone(form), path, newValue);
    setForm(newForm);
  },
  remove: index => {
    const newValues = _.clone(_.get(form, path));
    _.pullAt(newValues, index);
    const newForm = _.set(_.clone(form), path, newValues);
    setForm(newForm);
  },
});

const buildPropertyField = (path, form, setForm) => ({
  // TODO: Add an unique ID
  radio: value => ({
    id: `${path.replace(/\[|]|.list/g, '')}-${value}`,
    name: path.replace(/\[|]|.list/g, ''),
    value,
    onChange: ({ target }) => {
      const newValue =
        target.type === 'checkbox' ? target.checked : target.value;
      const newForm = _.set(_.clone(form), path.replace('.list', ''), newValue);
      setForm(newForm);
    },
    checked: value === _.get(form, path.replace('.list', '')),
  }),
  // TODO: Add checkbox
  text: {
    id: path.replace(/\[|]|.list/g, ''),
    name: path.replace(/\[|]|.list/g, ''),
    value: _.get(form, path.replace('.list', '')),
    onChange: ({ target }) => {
      const newValue =
        target.type === 'checkbox' ? target.checked : target.value;
      const newForm = _.set(_.clone(form), path.replace('.list', ''), newValue);
      setForm(newForm);
    },
  },
  // TODO Add input types?
});

const buildField = (path, form, setForm) => {
  if (path.endsWith('._isArray')) {
    return buildArrayField(path.replace('._isArray', ''), form, setForm);
  }

  return buildPropertyField(path, form, setForm);
};

export default buildField;
