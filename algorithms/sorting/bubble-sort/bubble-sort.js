/*
 * Bubble sort implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 * MIT Licensed - see LICENSE for details on license.
 */
 
/**
 * A bubble sort implementation in JavaScript. The array
 * is sorted in-place.
 * @param {Array} items An array of items to sort.
 */

function sort(items){
    for (var i=items.length-1; i >= 0; i--){
        for (var j=i; j >= 0; j--){
            if (items[j] < items[j-1]){
                var temp = items[j];
                items[j] = items[j-1];
                items[j-1] = temp;
            }
        }
    }
}