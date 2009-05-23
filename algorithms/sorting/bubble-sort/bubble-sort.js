/*
 * Bubble sort implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 * MIT Licensed - see LICENSE for details on license.
 */
 

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
 * A bubble sort implementation in JavaScript. The array
 * is sorted in-place.
 * @param {Array} items An array of items to sort.
 * @return {Array} The sorted array.
 */
function bubbleSort(items){
    for (var i=items.length-1; i >= 0; i--){
        for (var j=i; j >= 0; j--){
            if (items[j] < items[j-1]){
                swap(items, j, j-1);
            }
        }
    }
    
    return items;
}
