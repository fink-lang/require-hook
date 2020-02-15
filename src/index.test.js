import {generate} from '@fink/loxia';


const mock_hooks = [];
const mock_maps = [];


jest.mock('pirates', ()=> ({
  addHook: jest.fn((...args)=> mock_hooks.push(args))
}));

jest.mock('source-map-support', ()=> ({
  install: jest.fn((...args)=> mock_maps.push(args))
}));


jest.mock('@fink/loxia', ()=> ({
  generate: jest.fn()
}));


describe('hook', ()=> {
  require('.');

  it('registers hook', ()=> {

    expect(
      mock_hooks
    ).toEqual([
      [expect.anything(Function), {exts: ['.fnk'], ignoreNodeModules: false}]
    ]);
  });


  it('transforms fnk', ()=> {
    generate.mockReturnValue({code: 'test-code', map: 'test-map'});

    const [[hook]] = mock_hooks;

    expect(
      hook('test = `testing`\n', 'test.fnk')
    ).toBe(
      'test-code'
    );
  });


  it('registers source map support', ()=> {
    expect(
      mock_maps
    ).toEqual([[{
      handleUncaughtExceptions: false,
      environment: 'node',
      retrieveSourceMap: expect.anything(Function)
    }]]);
  });


  it('gets source-map', ()=> {
    const [[{retrieveSourceMap}]] = mock_maps;

    expect(
      retrieveSourceMap('test.fnk')
    ).toEqual(
      {map: 'test-map', url: null}
    );
  });


  it('returns null for missing source-map', ()=> {
    const [[{retrieveSourceMap}]] = mock_maps;

    expect(
      retrieveSourceMap('test-foo.fnk')
    ).toBe(
      null
    );
  });
});


