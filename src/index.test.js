import {addHook} from 'pirates';


jest.mock('pirates', ()=> ({
  addHook: jest.fn()
}));


describe('hook', ()=> {
  it('registers upon import', ()=> {
    const {transform} = require('.');

    expect(addHook).toHaveBeenCalledWith(
      transform, {exts: ['.fnk'], ignoreNodeModules: false}
    );
  });


  it('transforms fnk', ()=> {
    const {transform} = require('.');

    expect(
      transform('foobar = 3', 'foobar.fnk')
    ).toBe(
      'const foobar = 3;'
    );
  });
});


