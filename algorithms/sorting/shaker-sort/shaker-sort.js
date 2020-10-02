/**
 * Swaps two values in an array.
 * @param {Array} items The array containing the items.
 * @param {int} firstIndex Index of first item to swap.
 * @param {int} secondIndex Index of second item to swap.
 * @return {void}
 */
function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

/**
 * A shaker sort implementation in JavaScript.
 * @param {Array} items An array of items to sort.
 * @return {Array} The sorted array.
 */
function shakerSort(items) {
	var start  = 0,
		end = items.length - 1,
		i;

	do {

		for (i = end; i > 0; i--) {
			if (items[i-1] >= items[i]) {
				swap(items, i, i-1);
				start = i + 1;
			}
		}

		for (i = 1; i <= start; i++) {
			if (items[i-1] > items[i]) {
				swap(items, i, i-1);
				end = i - 1;
			}
		}

	} while (start < end);
}
