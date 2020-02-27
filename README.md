# require-hook

Run fink modules in node.

Example file `./foobar.fnk`:

```fnk
{log} = console

main = fn:
  log:: `hello world`

match require.main:
  module: main()
```

Run it using:

```bash
node -r '@fink/require-hook' ./foobar.fnk
```

Or use it from within another javascript module e.g. `./shrub.js`:

```js
import '@fink/require-hook'

import {main} from './foobar.fnk'

main();
```