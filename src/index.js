import {addHook} from 'pirates';
import source_map_support from 'source-map-support';

import {parse} from '@fink/larix';
import {generate} from '@fink/loxia';


const transformer = (store_map)=> (source, filename)=> {
  const fink_ast = parse(source);
  // {sourceRoot: path.dirname(filename)}

  const {code, map} = generate(fink_ast, filename, source);

  store_map(filename, map);

  return code;
};


const install_source_map_support = (get_map)=> {
  source_map_support.install({
    handleUncaughtExceptions: false,
    environment: 'node',
    retrieveSourceMap: get_map
  });
};


const maps_retriever = (maps)=> (filename)=> {

  const map = maps[filename];
  if (map) {
    return {url: null, map};
  }
  return null;
};


const maps_updater = (maps)=> (filename, map)=> {
  maps[filename] = map;
};


const main = ()=> {
  const maps = {};

  install_source_map_support(maps_retriever(maps));
  const hook = transformer(maps_updater(maps));

  addHook(hook, {
    exts: ['.fnk'],
    ignoreNodeModules: false
  });
};


main();
