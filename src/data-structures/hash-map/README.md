# JavaScript Hash Map Class

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Overview

A JavaScript implementation of a hash map where all keys must be strings. This class uses the conventions of built-in JavaScript collection objects, such as:

1. There is a `[Symbol.iterator]` method so each instance is iterable.
1. The `size` getter property instead of a `length` data property to indicate that the size of the list is dynamically counted rather than stored.
1. Defining `entries()`, `keys()`, and `values()` generator methods.

## Usage

Use CommonJS to get access to the `HashMap` constructor:

```js
const { HashMap } = require("@humanwhocodes/hash-map");
```

Each instance of `HashMap` has the following properties and methods:

```js
const map = new HashMap();

// add an item
map.set("foo", 1);

// get the value of an item
let value = map.get("foo");

// get the number of items
let count = map.size;

// does the key exist in the map?
let found = map.has("foo");

// remove a key
map.delete("foo");

// get all key-value pairs
let entries1 = [...map.entries()];
let entries2 = [...map];

// get all keys
let keys = [...map.keys()];

// get all values
let values = [...map.values()];

// remove all items
map.clear();
```

## Note on Code Style

You may find the code style of this module to be overly verbose with a lot of comments. That is intentional, as the primary use of this module is intended to be for educational purposes. There are frequently more concise ways of implementing the details of this class, but the more concise ways are difficult for newcomers who are unfamiliar with linked lists as a concept or JavaScript as a whole.

## Note on Usage

This module is intended for educational purposes. For production purposes, you should use the native JavaScript `Map` class.

## Issues and Pull Requests

As this is part of series of tutorials I'm writing, only bug fixes will be accepted. No new functionality will be added to this module.

## License

MIT