/*
 * Binary search implementation in JavaScript
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
 * Uses a binary search algorithm to locate a value in the specified array.
 * @param {Array} items The array containing the item.
 * @param {variant} value The value to search for.
 * @return {int} The zero-based index of the value in the array or -1 if not found.
 */
function binarySearch(items, value){

    var startIndex  = 0,
        middle      = Math.floor(items.length / 2),
        stopIndex   = items.length;
        
    while(items[middle] != value && startIndex < stopIndex){
    
        //adjust search area
        if (value < items[middle]){
            stopIndex = middle - 1;            
        } else if (value > items[middle]){
            startIndex = middle + 1;
        }
        
        //recalculate middle
        middle = Math.floor((stopIndex + startIndex)/2);
    
    }

    //make sure it's the right value
    return (items[middle] != value) ? -1 : middle;
}