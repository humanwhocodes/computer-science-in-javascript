# Bubble Sort in JavaScript

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Overview

This is an implementation of the bubble sort algorithm in JavaScript. The function sorts an array in place.

**Note:** You should always use the builtin `sort()` method on arrays in your code because it is already optimized for production use. This implementation should be used for learning purposes only.

## Usage

Use CommonJS to get access to the `bubbleSort()` function:

```js
const { bubbleSort } = require("@humanwhocodes/bubble-sort");

const items = [1, 5, 2];
const result = bubbleSort(items);

console.log(result);        // [1, 2, 5]
```

## Note on Code Style

You may find the code style of this module to be overly verbose with a lot of comments. That is intentional, as the primary use of this module is intended to be for educational purposes. There are frequently more concise ways of implementing the details of this class, but the more concise ways are difficult for newcomers who are unfamiliar with linked lists as a concept or JavaScript as a whole.

## Issues and Pull Requests

As this is part of series of tutorials I'm writing, only bug fixes will be accepted. No new functionality will be added to this module.

## License

MIT