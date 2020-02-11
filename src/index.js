import {addHook} from 'pirates';

import {parse} from '@fink/larix';
import {generate} from '@fink/loxia';


export const transform = (source, filename)=> {
  const fink_ast = parse(source);
  const {code} = generate(fink_ast, filename, source);
  return code;
};


const main = ()=> addHook(
  transform,
  {
    exts: ['.fnk'],
    ignoreNodeModules: false
  }
);

main();
