# JavaScript Linked List Class

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Overview

A JavaScript implementation of a linked list. This class uses the conventions of built-in JavaScript collection objects, such as:

1. There is a `[Symbol.iterator]` method so each instance is iterable.
1. The `size` getter property instead of a `length` data property to indicate that the size of the list is dynamically counted rather than stored.
1. Defining a `values()` generator method.
1. Returning `undefined` from `get()` when no such index exists.

Read the [blog post](https://humanwhocodes.com/blog/2019/01/computer-science-in-javascript-linked-list/) about the design of this class.

## Usage

Use CommonJS to get access to the `LinkedList` constructor:

```js
const { LinkedList } = require("@humanwhocodes/linked-list");
```

Each instance of `LinkedList` has the following properties and methods:

```js
const list = new LinkedList();

// add an item to the end
list.add("foo");

// insert an item
list.insertBefore("bar", 0);
list.insertAfter("baz", 1);

// get the value at an index
let value = list.get(0);

// get the number of items
let count = list.size;

// get the index of a value
let index = list.indexOf("foo");

// convert to an array using iterators
let array1 = [...list.values()];
let array2 = [...list];

// remove an item at the given index and return the data that was removed
let data = list.remove(0);

// remove all items
list.clear();
```

## Note on Code Style

You may find the code style of this module to be overly verbose with a lot of comments. That is intentional, as the primary use of this module is intended to be for educational purposes. There are frequently more concise ways of implementing the details of this class, but the more concise ways are difficult for newcomers who are unfamiliar with linked lists as a concept or JavaScript as a whole.

## Issues and Pull Requests

As this is part of series of tutorials I'm writing, only bug fixes will be accepted. No new functionality will be added to this module.

## License

MIT