/*
 * Bubble sort implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
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
 * is sorted in-place. This uses two reversed loops that
 * count down instead of counting up.
 * @param {Array} items An array of items to sort.
 * @return {Array} The sorted array.
 */
function bubbleSort(items){
    var len = items.length,
        i, j;

    for (i=len-1; i >= 0; i--){
        for (j=len-i; j >= 0; j--){
            if (items[j] < items[j-1]){
                swap(items, j, j-1);
            }
        }
    }
    
    return items;
}
