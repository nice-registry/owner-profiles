# owner-profiles

> Profile data for every npm author: name, email, GitHub handle, etc.

## Installation

```sh
npm install owner-profiles --save
```

## Usage

```js
const profiles = require('owner-profiles')

profiles.find('zeke')
// {
//   username: 'zeke',
//   email: 'zeke@sikelianos.com',
//   name: 'Zeke Sikelianos',
//   homepage: 'http://zeke.sikelianos.com',
//   github: 'zeke',
//   twitter: 'zeke'
// }

```

## Tests

```sh
npm install
npm test
```

## Dependencies

None

## Dev Dependencies

- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [clean-deep](https://github.com/seegno/clean-deep): Remove falsy, empty or nullable values from objects
- [lodash](https://github.com/lodash/lodash): Lodash modular utilities.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [npm-user](https://github.com/sindresorhus/npm-user): Get user info of a npm user
- [owners](https://github.com/nice-registry/owners): Usernames and package counts for every npm package author
- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [standard-markdown](https://github.com/zeke/standard-markdown): Test your Markdown files for Standard JavaScript Style™


## License

MIT
