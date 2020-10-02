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
 * A shell sort implementation in JavaScript.
 * @param {Array} items An array of items to sort.
 * @return {Array} The sorted array.
 */
function shellSort(items) {
	var len = items.length
	    step = len,
	    i, j;

	do {
		step = Math.floor(step/2);
		i = 0;
		j = i + step;
		while (j < len) {
			if (items[i] > items[j]) {
				swap(items, i, j);
			}

			i++;
			j = i + step;
		}
	} while (step >= 1);

	return items;
}
