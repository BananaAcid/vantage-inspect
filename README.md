# vantage-inspect

Simple object inspect extension for vantage.js

##### Installation

```bash
npm install vantage-inspect
npm install vantage
```

##### Programmatic use

```js
// app.js
var Vantage = require('vantage')
  , inspect = require('vantage-inspect)
  ;

var vantage = Vantage();

vantage
  .delimiter('node~$')
  .use(inspect, {context:{app: koa, socketio: io}})
  .show();
```

```bash
$ node app.js
node~$ 
node~$ i vantage
{ _version: '',
  commands: [Object],
  _queue: [Object],
  _command: undefined,
  ui: [Object],
  _delimiter: 'node~$',
  _banner: ' ... ',
  client: [Object],
  server: [Object],
  _hooked: false,
  util: [Object],
  _authFn: [Object],
  session: [Object],
  executables: true,
  firewall: [Object],
  _histCache: undefined,
  _histCtrCache: NaN,
  _hist: [Object],
  _histCtr: 0 }
node~$
node~$ i Vantage.util
{ parseArgs: [Object],
  humanReadableArgName: [Object],
  pad: [Object],
  fixArgsForApply: [Object] }
node~$
```

##### What it does

context adds the objects to be inspectable


it adds a version group command, that all modules may use to add their version
```
node~$ version

  Commands:

    version inspect     inspect version 1.0

```

You may open the help to see its details, and possible commands
```
node~$ version inspect
Author
 * Nabil Redmann (BananaAcid)
 * bananaacid.de

Commands:
 - version inspect
 - i [object]
 - il [object]
```