// TODO: Optimize
import { useState } from 'react';
import _ from 'lodash';

import mapPaths from './Utils/mapPaths';
import buildField from './Utils/buildField';

export default function useForm(initialValues = {}) {
  const [form, setForm] = useState(initialValues);

  const paths = _.uniq(mapPaths(form)); // TODO: FIX, stop needing the _.uniq

  return [
    form,
    _.reduce(
      paths,
      (acc, path) =>
        _.set(
          acc,
          path.replace('._isArray', ''),
          buildField(path, form, setForm)
        ),
      {}
    ),
  ];
}
