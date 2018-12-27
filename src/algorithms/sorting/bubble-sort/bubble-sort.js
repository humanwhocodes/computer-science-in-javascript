/**
 * @fileoverview Bubble sort implementation in JavaScript
 */

/**
 * Swaps two values in an array.
 * @param {Array} items The array containing the items.
 * @param {int} firstIndex Index of first item to swap.
 * @param {int} secondIndex Index of second item to swap.
 * @returns {void}
 */
function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}
 
/**
 * A bubble sort implementation in JavaScript. The array
 * is sorted in-place.
 * @param {Array} items An array of items to sort.
 * @return {Array} The sorted array.
 */
exports.bubbleSort = (items) => {

    /*
     * The outer loop moves from the first item in the array to the last item
     * in the array.
     */
    for (let i = 0; i < items.length; i++){
        
        /*
         * The inner loop also moves from the first item in the array towards
         * a stopping point. The `stop` value is the length of the array
         * minus the position of the outer loop minus one. The stop position 
         * is used because items start by being sorted at the back of the 
         * array and increasing towards the front of the array. The minus one
         * is necessary because we are comparing each item to the next
         * item, and the last item doesn't have a next item to compare to.
         */  
        for (let j = 0, stop = items.length - i - 1; j < stop; j++){

            /*
             * If the item at index `j` is greater than the item at index
             * `j + 1`, then swap the values.
             */
            if (items[j] > items[j + 1]){
                swap(items, j, j + 1);
            }
        }
    }
    
    return items;
};