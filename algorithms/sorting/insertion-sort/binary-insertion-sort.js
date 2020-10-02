/**
 * An binary insertion sort implementation in JavaScript.
 * @param {Array} items An array of items to sort.
 * @return {Array} The sorted array.
 */

function binaryInsertionSort(items) {
	var len = items.length,
		left, right, center, i, item;

	for (i = 1; i < len; i++) {
		left = 0;
		right = i - 1;

		while (left < right) {
			center = Math.floor((left + right) / 2);
			if (items[center] > items[i]) {
				right = center;
			} else {
				left = center + 1;
			}
		}

		// Remove element from array and paste to new position
		item = items.splice(i, 1)[0];
		items.splice(left, 0, item);
	}

	return items;
}
