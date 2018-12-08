# Computer Science in JavaScript

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Description

Collection of classic computer science paradigms, algorithms, and approaches written in JavaScript. This is the source code for the series of blog posts on my website.

## Folder Structure

The most recent packages are found in these directories:

* `src` - the implementation source code
* `tests`` - tests for the implementation source code

These directories contain **old** implementations that will be replaced eventually, they are just here to avoid confusing people who find this repo through the old blog posts:

* `data-structures` - data structure implementations that have not been updated yet
* `encodings` - encoding implementations that have not been updated yet
* `algorithms` - miscellanous algorithm implementations that have not been updated yet

As I update these, implementations will move from these folders into `src`.

## Branches

* **2009** - the branch containing all of the original implementations as reflected in my 2009 blog post series.
* **master** - the branch where I'm updating the original implementations to use ECMAScript 2018 and later features.

## Installing

You must be using Node.js v8 or later.

First, clone the repo:

```
$ git clone git://github.com/humanwhocodes/computer-science-in-javascript.git
$ cd computer-science-in-javascript
```

Then install the dependencies:

```
$ npm install
```

You can then run tests like this:

```
$ npm test
```

## Original Blog Posts

At some point I will update these blog posts for the new implementations. For now, they still refer only to the 2009 version of this code.

### Data Structures

* Binary Search Tree: [Part 1](https://humanwhocodes.com/blog/2009/06/09/computer-science-in-javascript-binary-search-tree-part-1/), [Part 2](https://humanwhocodes.com/blog/2009/06/16/computer-science-in-javascript-binary-search-tree-part-2/)
* [Doubly Linked List](https://humanwhocodes.com/blog/2009/04/21/computer-science-in-javascript-doubly-linked-lists/)
* [Linked List](https://humanwhocodes.com/blog/2009/04/13/computer-science-in-javascript-linked-list/)

### Sorting Algorithms

* [Bubble Sort](https://humanwhocodes.com/blog/2009/05/26/computer-science-in-javascript-bubble-sort/)
* [Selection Sort](https://humanwhocodes.com/blog/2009/09/08/computer-science-in-javascript-selection-sort/)

### Other Algorithms

* [Base64 Encoding](https://humanwhocodes.com/blog/2009/12/08/computer-science-in-javascript-base64-encoding/)
* [Binary Search](https://humanwhocodes.com/blog/2009/09/01/computer-science-in-javascript-binary-search/)
* [Credit Card Number Validation](https://humanwhocodes.com/blog/2009/08/04/computer-science-in-javascript-credit-card-number-validation/)

## Note on Code Style

You may find the code style of this module to be overly verbose with a lot of comments. That is intentional, as the primary use of this module is intended to be for educational purposes. There are frequently more concise ways of implementing the details of this class, but the more concise ways are difficult for newcomers who are unfamiliar with linked lists as a concept or JavaScript as a whole.

## Issues and Pull Requests

As this is part of series of tutorials I'm writing, only bug fixes will be accepted. No new functionality will be added to this module.

## License

MIT