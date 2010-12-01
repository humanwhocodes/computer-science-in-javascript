(function () {

    /**
     * Swap the elements indexed by `x` and `y` in the array `ary`.
     * @param {Array} ary The array.
     * @param {Number} x The index of the first item.
     * @param {Number} y The index of the second item.
     */
    function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp;
    }

    /**
     * Returns a random integer within the range `low .. high` inclusive.
     * @param {Number} low The lower bound on the range.
     * @param {Number} high The upper bound on the range.
     */
    function randomIntInRange(low, high) {
        return Math.round(low + (Math.random() * (high - low)));
    }

    /**
     * The partition function chooses a pivot between `p` and `r` and moves all
     * elements that are less than or equal to the pivot to the before it, and
     * all the elements that are greater than it after it. The effect is that
     * once partition is run, the pivot is in the exact place it will be when
     * the array is put in sorted order, and it will not need to be moved
     * again. This runs in O(n) time.
     * @param {Array} ary The array to partition.
     * @param {function} comparator The function with which to compare items.
     * @param {Number} p Start index of the array.
     * @param {Number} r End index of the array.
     */
    function partition(ary, comparator, p, r) {
        // Always choose a random pivot so that an input array which is reverse
        // sorted does not cause O(n^2) running time.
        var pivotIndex = randomIntInRange(p, r),
            i          = p - 1,
            j,
            pivot;

        swap(ary, pivotIndex, r);
        pivot = ary[r];

        // Immediately after `j` is incremented in this loop, the following hold
        // true:
        //
        //   * Every element in `ary[p .. i]` is less than or equal to the
        //     pivot.
        //
        //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
        for (j = p; j < r; j += 1) {
            if (comparator(ary[j], pivot) <= 0) {
                i += 1;
                swap(ary, i, j);
            }
        }

        swap(ary, i + 1, j);
        return i + 1;

    }

    /**
     * The Quick Sort algorithm in JavaScript. Items are sorted in place.
     * @param {Array} ary An array to sort.
     * @param {function} comparator Optional function to use to compare two items.
     * @param {Number} p Start index of the array; defaults to 0;
     * @param {Number} r End index of the array; defaults to ary.length-1.
     */
    function quickSort(ary, comparator, p, r) {
        var q;

        // Provide default parameters.
        p = typeof p === "undefined" ? 0 : p;
        r = typeof r === "undefined" ? ary.length - 1 : r;
        comparator = comparator || function (a, b) {
            return a < b ?
                -1 : (a > b ?
                          1 : 0);
        };

        // If our lower bound is less than our upper bound, we partition the
        // array into two pieces and recurse on each half. If it is not, this is
        // the empty array and our base case.
        if (p < r) {
            q = partition(ary, comparator, p, r);
            quickSort(ary, comparator, p, q - 1);
            quickSort(ary, comparator, q + 1, r);
        }

        return ary;
    }

    // Expose the quickSort function globally.
    this.quickSort = quickSort;

}());