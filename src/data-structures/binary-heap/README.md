# JavaScript Binary Heap Class

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Overview

A JavaScript implementation of a binary heap. This class uses the conventions of built-in JavaScript collection objects, such as:

1. There is a `[Symbol.iterator]` method so each instance is iterable.
1. The `size` getter property instead of a `length` data property to indicate that the size of the list is dynamically counted rather than stored.
1. Defining a `values()` generator method.
1. Using `includes()` instead of `contains()`.

## Usage

Use CommonJS to get access to the `BinaryHeap` constructor:

```js
const { BinaryHeap } = require("@humanwhocodes/binary-heap");
```

Each instance of `BinaryHeap` has the following properties and methods:

```js
const heap = new BinaryHeap();

// add an item to the end
heap.add("foo");

// get the minimum value without removing
let value = heap.peek();

// get the minimum value and remove
let value = heap.poll();

// get the number of items
let count = heap.size;

// does the value exist in the heap?
let found = heap.includes(5);

// convert to an array using iterators
let array1 = [...heap.values()];
let array2 = [...heap];

// remove all items
heap.clear();
```

By default, the `BinaryHeap` class is a min heap designed to work with numbers. You can change the comparator used to determine ordering by passing a function into the constructor, such as:

```js
// create a max numeric heap
let heap = new BinaryHeap((a, b) => b - a);
```

The comparator function uses the same format as comparator functions for JavaScript arrays, two values are passed in and you must return:

* A negative number if the first value should come before the second
* Zero if the ordering of the two values should remain unchanged
* A positive number if the first value should come after the second

## Note on Code Style

You may find the code style of this module to be overly verbose with a lot of comments. That is intentional, as the primary use of this module is intended to be for educational purposes. There are frequently more concise ways of implementing the details of this class, but the more concise ways are difficult for newcomers who are unfamiliar with linked lists as a concept or JavaScript as a whole.

## Issues and Pull Requests

As this is part of series of tutorials I'm writing, only bug fixes will be accepted. No new functionality will be added to this module.

## License

MIT