/**
 * @fileoverview Linked List implementation in JavaScript
 */

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const head = Symbol("head");

/**
 * Represents a single item in a LinkedList.
 * @class LinkedListItem
 */
class LinkedListItem {

    /**
     * Creates a new instance of LinkedListItem.
     * @param {*} data The data to store in the node. 
     */
    constructor(data) {

        /**
         * The data that this node stores.
         * @property data
         * @type *
         */
        this.data = data;

        /**
         * A pointer to the next item in the LinkedList.
         * @property next
         * @type ?LinkedListItem
         */
        this.next = null;

    }
}

/**
 * A linked list implementation in JavaScript.
 * @class LinkedList
 */
class LinkedList {

    /**
     * Creates a new instance of LinkedList
     */
    constructor() {

        /**
         * Pointer to first item in the list.
         * @property head
         * @type ?LinkedListItem
         * @private
         */
        this[head] = null;
    }
    
    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the data at the end in a new item.
     * @param {*} data The data to add to the list.
     * @returns {void}
     */
    add(data) {
    
        /*
         * Create a new list item object and store the data in it.
         * This item will be added to the end of the existing list.
         */
        const item = new LinkedListItem(data);
                
        //special case: no items in the list yet
        if (this[head] === null) {

            /*
             * Because there are no items in the list, just set the
             * `this[head]` pointer to the new item.
             */
            this[head] = item;
        } else {

            /*
             * The `current` variable is used to track the item that is being
             * used inside of the loop below. It starts out pointing to
             * `this[head]` and is overwritten inside of the loop.
             */
            let current = this[head];

            /*
             * Follow each `next` pointer until the end. The last item in the
             * list has `next` equal to `null`, so when we reach that item,
             * we know we're at the end.
             */
            while (current.next !== null) {
                current = current.next;
            }
           
            /*
             * At this point, `current` is equal to the last item in the list.
             * Setting its `current.next` equal to item means adding a new item
             * at the end of the list.
             */
            current.next = item;            
        }
    }
    
    /**
     * Inserts some data into the middle of the list. This method traverses
     * the existing list and places the data in a new item at a specific index.
     * @param {*} data The data to add to the list.
     * @param {int} index The zero-based index at which to insert the data.
     * @returns {void}
     * @throws {RangeError} If the index doesn't exist in the list.
     */
    insertBefore(data, index) {
    
        /*
         * Create a new list item object and store the data in it.
         * This item will be inserted into the existing list.
         */
        const item = new LinkedListItem(data);
                
        // special case: no items in the list yet
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * Special case: if `index` is `0`, then no traversal is needed
         * and we need to update `this[head]` to point to `item`. First,
         * set `item.next` to the current `this[head]` so the previous
         * head of the list is now the second item in the list. Then it's
         * safe to update `this[head]` to point to `item`.
         */
        if (index === 0) {
            item.next = this[head];
            this[head] = item;
        } else {

            /*
             * The `current` variable is used to track the item that is being
             * used inside of the loop below. It starts out pointing to
             * `this[head]` and is overwritten inside of the loop.
             *
             * The `previous` variable tracks one step behind `current`, which
             * is necessary because we need to adjust the item at `index`-1's
             * `next` pointer to point to the new item.
             */
            let current = this[head],
                previous = null;

            /*
             * The `i` variable is used to track how deep into the list we've
             * gone. This important because it's the only way to know when
             * we've hit the `index` to insert into.
             */
            let i = 0;

            /*
             * Traverse the list items similar to the `add()` method, but make
             * sure to keep track of how many items have been visited and update
             * the `previous` pointer in addition to `current`. When
             * `i` is the same as `index`, it means we've found the location to
             * insert the new data.
             */
            while ((current.next !== null) && (i < index)) {
                previous = current;
                current = current.next;
                i++;
            }
           
            /*
             * At this point, `current` is either the item to insert the new data
             * before, or the last item in the list. The only way to tell is if
             * `i` is still less than `index`, that means the index is out of range
             * and an error should be thrown.
             */
            if (i < index) {
                throw new RangeError(`Index ${index} does not exist in the list.`);
            }

            /*
             * If code continues to execute here, it means `current` is the item
             * to insert new data before and `previous` is the item to insert
             * new data after. So `previous.next` must point to `item` and
             * `item.next` must point to `current`.
             */
            previous.next = item;
            item.next = current;
        }
    }
    
    /**
     * Inserts some data into the middle of the list. This method traverses
     * the existing list and places the data in a new item after a specific index.
     * @param {*} data The data to add to the list.
     * @param {int} index The zero-based index after which to insert the data.
     * @returns {void}
     * @throws {RangeError} If the index doesn't exist in the list.
     */
    insertAfter(data, index) {
    
        /*
         * Create a new list item object and store the data in it.
         * This item will be inserted into the existing list.
         */
        const item = new LinkedListItem(data);
                
        // special case: no items in the list yet
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * The `current` variable is used to track the item that is being
         * used inside of the loop below. It starts out pointing to
         * `this[head]` and is overwritten inside of the loop.
         */
        let current = this[head];

        /*
         * The `i` variable is used to track how deep into the list we've
         * gone. This important because it's the only way to know when
         * we've hit the `index` to insert into.
         */
        let i = 0;

        /*
         * Traverse the list items similar to the `add()` method, but make
         * sure to keep track of how many items have been visited and update
         * the `previous` pointer in addition to `current`. When
         * `i` is the same as `index`, it means we've found the location to
         * insert the new data.
         */
        while ((current !== null) && (i < index)) {
            current = current.next;
            i++;
        }
        
        /*
         * At this point, `current` is either the item to insert the new data
         * before, or the last item in the list. The only way to tell is if
         * `i` is still less than `index`, that means the index is out of range
         * and an error should be thrown.
         */
        if (i < index) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * If code continues to execute here, it means `current` is the item
         * to insert new data after. So `current.next` must point to
         * `item` for the data to be in the correct spot, but before that,
         * `item.next` must point to `current.next` to ensure the list
         * remains intact.
         */
        item.next = current.next;
        current.next = item;
    }
    
    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the item whose data 
     *      should be returned.
     * @returns {*} The data in the "data" portion of the given item
     *      or undefined if the item doesn't exist.
     */
    get(index) {
    
        // ensure `index` is a positive value
        if (index > -1) {

            /*
             * The `current` variable is used to track the item that is being
             * used inside of the loop below. It starts out pointing to
             * `this[head]` and is overwritten inside of the loop.
             */
            let current = this[head];

            /*
             * The `i` variable is used to track how deep into the list we've
             * gone. This is important because it's the only way to know when
             * we've hit the `index` to insert into.
             */
            let i = 0;

            /*
             * Traverse the list items similar to the `add()` method, but make
             * sure to keep track of how many items have been visited and update
             * the `previous` pointer in addition to `current`. When
             * `i` is the same as `index`, it means we've found the location to
             * insert the new data.
             */
            while ((current !== null) && (i < index)) {
                current = current.next;
                i++;          
            }
        
            /*
             * At this point, `current` might be null if we've gone past the
             * end of the list. In that case, we return `undefined` to indicate
             * that the item at `index` was not found. If `current` is not
             * `null`, then it's safe to return `current.data`.
             */
            return current !== null ? current.data : undefined;
        } else {
            return undefined;
        }
    }
    
    /**
     * Retrieves the index of the data in the list.
     * @param {*} data The data to search for.
     * @returns {int} The index of the first instance of the data in the list
     *      or -1 if not found.
     */
    indexOf(data) {
    
        /*
         * The `current` variable is used to iterate over the list items.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        /*
         * The `index` variable is used to track how deep into the list we've
         * gone. This is important because this is the value that is returned
         * from this method.
         */
        let index = 0;
        
        /*
         * This loop checks each item in the list to see if it matches `data`.
         * If a match is found, it returns `index` immediately, exiting the
         * loop because there's no reason to keep searching. The search
         * continues until there are no more items to search (when `current` is `null`).
         */
        while (current !== null) {
            if (current.data === data) {
                return index;
            }

            // traverse to the next item in the list
            current = current.next;

            // keep track of where we are
            index++;
        }

        /*
         * If execution gets to this point, it means we reached the end of the
         * list and didn't find `data`. Just return -1 as the "not found" value.
         */
        return -1;
    }
    
    /**
     * Removes the item from the given location in the list.
     * @param {int} index The zero-based index of the item to remove.
     * @returns {*} The data in the given position in the list.
     * @throws {RangeError} If index is out of range.
     */
    remove(index) {
    
        // special case: no items in the list
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        // special case: `index` is an invalid value
        if (index < 0) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * The `current` variable is used to iterate over the list items.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        // special case: removing the first item
        if (index === 0) {

            // just replace the head with the next item in the list
            this[head] = current.next;

            // return the data at the previous head of the list
            return current.data;
        }

        /*
         * The `previous` variable keeps track of the item just before
         * `current` in the loop below. This is necessary because removing
         * an item means updating the previous item's `next` pointer.
         */
        let previous = null;

        /*
         * The `i` variable is used to track how deep into the list we've
         * gone. This is important because it's the only way to know when
         * we've hit the `index` to remove.
         */
        let i = 0;

        /*
         * Traverse the list items similar to the `add()` method, but make
         * sure to keep track of how many items have been visited and update
         * the `previous` pointer in addition to `current`. When
         * `i` is the same as `index`, it means we've found the location to
         * remove.
         */
        while ((current !== null) && (i < index)) {

            // save the value of current
            previous = current;

            // traverse to the next item
            current = current.next;

            // increment the count
            i++;
        }

        /*
         * If `current` isn't `null`, then that means we've found the item
         * to remove.
         */
        if (current !== null) {

            // skip over the item to remove
            previous.next = current.next;

            // return the value that was just removed from the list
            return current.data;
        }

        /*
         * If we've made it this far, it means `index` is a value that
         * doesn't exist in the list, so throw an error.
         */
        throw new RangeError(`Index ${index} does not exist in the list.`);
    }
    
    /**
     * Removes all items from the list.
     * @returns {void}
     */
    clear() {
        this[head] = null;
    }

    /**
     * Returns the number of items in the list.
     * @returns {int} The number of items in the list.
     */
    get size() {

        // special case: the list is empty
        if (this[head] === null) {
            return 0;
        }

        /*
         * The `current` variable is used to iterate over the list items.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        /*
         * The `count` variable is used to keep track of how many items have
         * been visited inside the loop below. This is important because this
         * is the value to return from this method.
         */
        let count = 0;

        /*
         * As long as `current` is not `null`, that means we're not yet at the
         * end of the list, so adding 1 to `count` and traverse to the next item.
         */
        while (current !== null) {
            count++;
            current = current.next;
        }

        /*
         * When `current` is `null`, the loop is exited at the value of `count`
         * is the number of items that were counted in the loop.
         */
        return count;
    }
    
    /**
     * The default iterator for the class.
     * @returns {Iterator} An iterator for the class.
     */
    [Symbol.iterator]() {
        return this.values();
    }

    /**
     * Create an iterator that returns each item in the list.
     * @returns {Iterator} An iterator on the list. 
     */
    *values(){

        /*
         * The `current` variable is used to iterate over the list items.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        /*
         * As long as `current` is not `null`, there is a piece of data
         * to yield.
         */
        while (current !== null) {
            yield current.data;
            current = current.next;
        }
    }
    
    /**
     * Converts the list into a string representation.
     * @returns {String} A string representation of the list.
     */
    toString(){
        return [...this].toString();
    }
}

exports.LinkedList = LinkedList;