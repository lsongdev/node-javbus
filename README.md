## node-javbus

> simple javbus api in node.js

[![node-javbus](https://img.shields.io/npm/v/node-javbus.svg)](https://npmjs.org/node-javbus)

### Installation

```bash
$ npm install node-javbus
```

### Example

```js
const javbus = require('node-javbus')();

(async () => {

  const videos = await javbus.page(1);
  console.log(videos);

  const show = await javbus.show(videos[0].id);
  console.log(show);

  const files = await javbus.magnet(show.gid);
  console.log(files);

})();
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---