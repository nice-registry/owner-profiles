# owner-profiles

> Profile data for every npm author: name, email, GitHub handle, etc.

## Installation

```sh
npm install owner-profiles --save
```

## Usage

As of version 2, this module exports a [leveldb] database with npm username 
strings as keys and user profile objects as values.

```js
const profiles = require('owner-profiles')
```

To find a specific user:

```js
profiles.get('zeke')
```

This returns a promise, which resolves to an object like this:

```js
{
  email: 'zeke@sikelianos.com',
  name: 'Zeke Sikelianos',
  homepage: 'http://zeke.sikelianos.com',
  github: 'zeke',
  twitter: 'zeke'
}
```

You can also stream the entire contents of the database:

```js
db.createReadStream()
  .on('data', ({key: username, value: profile}) => {
    console.log(username, profile)
  })
  .on('error', (err) => {
    console.error('Oh my!', err)
  })
```

For other stuff you can do with the data, see the `level` API: [github.com/Level/level#api](https://github.com/Level/level#api)

## Tests

```sh
npm install
npm test
```

## License

MIT

[leveldb]: https://ghub.io/level