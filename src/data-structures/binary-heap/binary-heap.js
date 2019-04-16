
/**
 * @fileoverview Binary Heap implementation in JavaScript
 */

//-----------------------------------------------------------------------------
// Private
//-----------------------------------------------------------------------------

/**
 * Determines the index in an array that is the parent of the given index.
 * @param {int} index The index to find the parent of. 
 * @returns {int} The index of the parent value.
 * @private
 */
function getParentIndex(index) {
    return Math.floor((index - 1) / 2);
}

/**
 * Determines the index in an array that is the left child of the given index.
 * @param {int} index The index to find the left child of. 
 * @returns {int} The index of the left child value.
 * @private
 */
function getLeftChildIndex(index) {
    return (index * 2) + 1;
}

/**
 * Determines the index in an array that is the right child of the given index.
 * @param {int} index The index to find the right child of. 
 * @returns {int} The index of the right child value.
 * @private
 */
function getRightChildIndex(index) {
    return (index * 2) + 2;
}

/**
 * Determines if a left child exists for the given index in the array.
 * @param {Array} array The array to check.
 * @param {int} index The index to check.
 * @returns {boolean} True if the index has a left child, false if not.
 * @private
 */
function hasLeftChild(array, index) {
    return getLeftChildIndex(index) < array.length;
}

/**
 * Determines if a right child exists for the given index in the array.
 * @param {Array} array The array to check.
 * @param {int} index The index to check.
 * @returns {boolean} True if the index has a right child, false if not.
 * @private
 */
function hasRightChild(array, index) {
    return getRightChildIndex(index) < array.length;
}

/**
 * Swaps the positions of two values in an array.
 * @param {Array} array The array to swap values in.
 * @param {int} index1 The first index to swap. 
 * @param {int} index2 The second index to swap.
 * @returns {void}
 * @private
 */
function swap(array, index1, index2) {
    const value = array[index1];
    array[index1] = array[index2];
    array[index2] = value;
}

/**
 * Normalizes the heap by starting with the last inserted item and ensuring
 * the entire path up to the heap root is in the correct order.
 * @param {Array} array The array to adjust. 
 * @param {Function} compare The comparator to use on values in the array. 
 * @returns {void}
 * @private
 */
function heapifyUp(array, compare) {

    /*
     * `currentIndex` is used to traverse the array. It starts at the last item
     * in the array and moves to the first item (the heap root).
     */
    let currentIndex = array.length - 1;

    /*
     * This loop continues so long as `currentIndex` is not the heap root (in
     * position 0). When `currentIndex` is 0, it means the path from the last
     * inserted value to the heap root is correct.
     */
    while (currentIndex > 0) {

        // get the index of this value's parent so we can get the value
        let parentIndex = getParentIndex(currentIndex);

        /*
         * If the value of the parent should come after the current value
         * (pointed to by `currentIndex`), then swap the two values so they
         * are in the correct order. Note that any value returned from the
         * comparator that is greater than zero means that the parent value
         * should come after the current value.
         */
        if (compare(array[parentIndex], array[currentIndex]) > 0) {
            swap(array, parentIndex, currentIndex);

            // move the current index to the parent so the loop can continue
            currentIndex = parentIndex;
        } else {

            /*
             * If we've reached here then the parent and current values are
             * already in the correct order. We can infer that this means
             * the rest of the path up to the root is also in the correct order
             * and so we can safely exit the loop.
             */
            break;
        }
    }
}

/**
 * Normalizes the heap by starting with the root item and ensuring
 * the entire heap is in the correct order. This is run after a node is
 * removed from the heap and the root is replaced with a value, so
 * the root is most likely incorrect.
 * @param {Array} array The array to adjust.
 * @param {Function} compare The comparator to use on values in the array.
 * @returns {void}
 * @private
 */
function heapifyDown(array, compare) {

    /*
     * `currentIndex` is used to traverse the array. It starts at the first item
     * in the array and moves towards the last.
     */
    let currentIndex = 0;

    /*
     * This loop continues so long as the current item has at least one child.
     * Because the heap is filled in starting with the left child and then
     * moving to the right, simply checking if a left child is present is enough
     * to continue because we know there is at least one child.
     * 
     * When the current item has no children, we know the entire path there is
     * in the correct state and so we can exit.
     */
    while (hasLeftChild(array, currentIndex)) {

        /*
         * This variable is called `smallerChildIndex` because we want to
         * identify which of the two children contain the smaller value.
         * We can start by assuming this will be the left child and then
         * change it if we discover the right child is actually smaller.
         */
        let smallerChildIndex = getLeftChildIndex(currentIndex);

        // if there is a right child, check that
        if (hasRightChild(array, currentIndex)) {
            let rightChildIndex = getRightChildIndex(currentIndex);

            /*
             * If the right child value should come after the left child value
             * (meaning the `compare()` function returns a value greater than
             * zero), then note that the smaller value is actually in the right
             * child by storing the right child index in `smallerChildIndex`.
             */
            if (compare(array[smallerChildIndex], array[rightChildIndex]) > 0) {
                smallerChildIndex = rightChildIndex;
            }
        }

        /*
         * If the current value should come after the smaller child value, then
         * the two values need to be swapped to be in the correct order.
         */
        if (compare(array[currentIndex], array[smallerChildIndex]) > 0) {
            swap(array, currentIndex, smallerChildIndex);
            
            // move down the tree to the previous location of the smaller child
            currentIndex = smallerChildIndex;
        } else {

            /*
             * If we've reached here then the current and child values are
             * already in the correct order. We can infer that this means
             * the rest of the path down is also in the correct order
             * and so we can safely exit the loop.
             */
            break;
        }
    }

}

//-----------------------------------------------------------------------------
// BinaryHeap Class
//-----------------------------------------------------------------------------

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const array = Symbol("array");
const compare = Symbol("compare");

/**
 * A binary heap implementation in JavaScript.
 * @class BinaryHeap
 */
class BinaryHeap {

    /**
     * Creates a new instance of BinaryHeap
     * @param {Function} [comparator] A comparator function.
     */
    constructor(comparator = (a, b) => a - b) {

        /**
         * Array used to manage the heap.
         * @property array
         * @type Array
         * @private
         */
        this[array] = [];

        /**
         * Comparator to compare values.
         * @property comparator
         * @type Function
         * @private
         */
        this[compare] = comparator;
    }
    
    /**
     * Appends some data to the heap.
     * @param {*} data The data to add to the heap.
     * @returns {void}
     */
    add(data) {
        this[array].push(data);
        heapifyUp(this[array], this[compare]);
    }

    /**
     * Determines if the heap is empty.
     * @returns {boolean} True if the heap is empty, false if not.
     */
    isEmpty() {
        return this[array].length === 0;
    }

    /**
     * Returns the value at the top of the heap but does not remove it from
     * the heap.
     * @returns {*} The value at the top of the heap.
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error("Heap is empty.");
        }

        return this[array][0];
    }
    
    /**
     * Returns and removes the value at the top of the heap.
     * @returns {*} The value at the top of the heap.
     */
    poll() {
        if (this.isEmpty()) {
            throw new Error("Heap is empty.");
        }

        /*
         * If there are at least two items in the array, then we need to do a
         * remove and rebalance operation to ensure the heap remains consistent.
         */
        if (this[array].length > 1) {

            // first remove the top value for safe keeping
            const topValue = this[array][0];

            /*
             * Next, take the last item from the array and move it into the top
             * slot. This will likely not be the correct value but maintains the
             * tree hierarchy. Then, reorganize the heap so it remains properly
             * ordered.
             */
            const replacementValue = this[array].pop();
            this[array][0] = replacementValue;
            heapifyDown(this[array], this[compare]);

            // finally, return the value
            return topValue;
        } else {

            /*
             * In this case, the array has only one item, so it's simpler to just
             * pop the value off of the array and return it.
             */
            return this[array].pop();
        }
        
    }
    
    /**
     * Returns the number of values in the heap.
     * @returns {int} The number of values in the heap.
     */
    get size() {
        return this[array].length;
    }

    /**
     * Determines if the given value exists in the heap.
     * @param {*} value The value to search for.
     * @returns {boolean} True if the value exists in the heap, false if not.
     */
    includes(value) {
        return this[array].includes(value);
    }

    /**
     * Removes all values from the heap.
     * @returns {void}
     */
    clear() {
        this[array] = [];
    }

    /**
     * The default iterator for the class.
     * @returns {Iterator} An iterator for the class.
     */
    [Symbol.iterator]() {
        return this.values();
    }

    /**
     * Create an iterator that returns each node in the list.
     * @returns {Iterator} An iterator on the list. 
     */
    values() {
        return this[array].values();
    }
        
    /**
     * Converts the heap into a string representation.
     * @returns {String} A string representation of the heap.
     */
    toString(){
        return [...this[array]].toString();
    }
}

exports.BinaryHeap = BinaryHeap;