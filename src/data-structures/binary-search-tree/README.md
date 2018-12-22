# JavaScript Binary Search Tree Class

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Overview

A JavaScript implementation of a binary search tree. This class uses the conventions of built-in JavaScript collection objects, such as:

1. There is a `[Symbol.iterator]` method so each instance is iterable.
1. The `size` getter property instead of a `length` data property to indicate that the size of the tree is dynamically counted rather than stored.
1. Defining a `values()` generator method.

Additionally, this implementation follows the JavaScript `Set` interface for adding, detecting, and removing values:

* `add(value)` to add a value into the tree
* `has(value)` to detect if a value is in the tree
* `delete(value)` to remove a value from the tree

## Usage

Use CommonJS to get access to the `BinarySearchTree` constructor:

```js
const { BinarySearchTree } = require("@humanwhocodes/binary-search-tree");
```

Each instance of `BinarySearchTree` has the following properties and methods:

```js
const tree = new BinarySearchTree();

// add an item to the tree
tree.add(2);

// determine if a value is in the tree
let found = tree.has(2);

// get the number of nodes in the tree
let count = tree.size;

// convert to an array using iterators
let array1 = [...tree.values()];
let array2 = [...tree];

// remove a node with the given value
let value = tree.delete(2);

// remove all nodes
tree.clear();
```

## Note on Code Style

You may find the code style of this module to be overly verbose with a lot of comments. That is intentional, as the primary use of this module is intended to be for educational purposes. There are frequently more concise ways of implementing the details of this class, but the more concise ways are difficult for newcomers who are unfamiliar with linked trees as a concept or JavaScript as a whole.

## Issues and Pull Requests

As this is part of series of tutorials I'm writing, only bug fixes will be accepted. No new functionality will be added to this module.

## License

MIT