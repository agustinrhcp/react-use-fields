import mapPaths from './mapPaths';

describe('mapPaths', () => {
  describe('with an array', () => {
    it('fails', () => {
      const mapPathWithArray = () => mapPaths([]);
      expect(mapPathWithArray).toThrow('Form must be an object');
    });
  });

  describe('with an empty array', () => {
    it('returns array modifiers', () => {
      expect(mapPaths({ contactList: [] })).toEqual(['contactList._isArray']);
    });
  });

  describe('with an array with 1 object', () => {
    it('returns array modifiers and properties', () => {
      expect(mapPaths({ contactList: [{ name: '', phone: '' }] })).toEqual([
        'contactList._isArray',
        'contactList.list[0].name',
        'contactList.list[0].phone',
      ]);
    });
  });

  describe('with an array with 1 object', () => {
    it('returns array modifiers and properties', () => {
      expect(
        mapPaths({
          contactList: [{ name: '', phone: '' }, { name: '', phone: '' }],
        })
      ).toEqual([
        'contactList._isArray',
        'contactList.list[0].name',
        'contactList.list[0].phone',
        'contactList._isArray', // TODO: FIX ME
        'contactList.list[1].name',
        'contactList.list[1].phone',
      ]);
    });
  });

  it('for simple object', () => {
    expect(mapPaths({ a: 'a', b: 'b' })).toEqual(['a', 'b']);
  });

  it('for nested object', () => {
    expect(mapPaths({ a: { b: 'b' } })).toEqual(['a.b']);
  });

  it('with a form', () => {
    expect(
      mapPaths({
        user: '',
        email: '',
        password: '',
      })
    ).toEqual(['user', 'email', 'password']);
  });
});
