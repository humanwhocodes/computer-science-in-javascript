/**
 * @fileoverview Doubly linked list implementation in JavaScript
 */

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const head = Symbol("head");
const tail = Symbol("tail");

/**
 * Represents a single item in a DoublyLinkedList.
 * @class DoublyLinkedListItem
 */
class DoublyLinkedListItem {

    /**
     * Creates a new instance of DoublyLinkedListItem.
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
         * A pointer to the next item in the DoublyLinkedList.
         * @property next
         * @type ?DoublyLinkedListItem
         */
        this.next = null;

        /**
         * A pointer to the previous item in the DoublyLinkedList.
         * @property previous
         * @type ?DoublyLinkedListItem
         */
        this.previous = null;
    }
}

/**
 * A doubly linked list implementation in JavaScript.
 * @class DoublyLinkedList
 */
class DoublyLinkedList {

    /**
     * Creates a new instance of DoublyLinkedList
     */
    constructor() {

        /**
         * Pointer to first item in the list.
         * @property head
         * @type ?DoublyLinkedListItem
         * @private
         */
        this[head] = null;

        /**
         * Pointer to last item in the list.
         * @property tail
         * @type ?DoublyLinkedListItem
         * @private
         */
        this[tail] = null;
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
        const item = new DoublyLinkedListItem(data);
                
        //special case: no items in the list yet
        if (this[head] === null) {

            /*
             * Because there are no items in the list, just set the
             * `this[head]` and `this[tail]` pointers to the new item.
             */
            this[head] = item;
            this[tail] = item;
        } else {

            /*
             * Unlike in a singly linked list, we have a direct reference to
             * the last item in the list. Set the `next` pointer of the
             * current last item to `item` in order to append the new data
             * to the end of the list. Then, set `item.previous` to the current
             * tail to ensure backwards tracking work. Last, reset `this[tail]`
             * to `item` to ensure we are still tracking the last item correctly.
             */
            this[tail].next = item;
            item.previous = this[tail];
            this[tail] = item;
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
        const item = new DoublyLinkedListItem(data);
                
        // special case: no items in the list yet
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * Special case: if `index` is `0`, then no traversal is needed
         * and we need to update `this[head]` to point to `item`.
         */
        if (index === 0) {

            /*
             * Ensure the new item's `next` property is pointed to the current
             * head.
             */
            item.next = this[head];

            /*
             * The current head's `previous` property needs to point to the new
             * item to ensure the list is traversable backwards.
             */
            this[head].previous = item;

            /*
             * Now it's safe to set `this[head]` to the new item, effectively
             * making the new item the first item in the list.
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
             * The `i` variable is used to track how deep into the list we've
             * gone. This important because it's the only way to know when
             * we've hit the `index` to insert into.
             */
            let i = 0;

            /*
             * Traverse the list items using `next` pointers, and make
             * sure to keep track of how many items have been visited. When
             * `i` is the same as `index`, it means we've found the location to
             * insert the new data.
             */
            while ((current.next !== null) && (i < index)) {
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
             * to insert new data before.
             * 
             * First, insert `item` after `current.previous` by updating
             * `current.previous.next` and `item.previous`.
             */
            current.previous.next = item;
            item.previous = current.previous;

            /*
             * Next, insert `current` after `item` by updating `item.next` and
             * `current.previous`.
             */
            item.next = current;
            current.previous = item;
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
        const item = new DoublyLinkedListItem(data);
                
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
         * to insert new data after.
         */
        
        // special case: `current` is the tail, so reset `this[tail]`
        if (this[tail] === current) {
            this[tail] = item;
        } else {

            /* 
             * Otherwise, insert `item` before `current.next` by updating
             * `current.next.previous` and `item.item`.
             */
            current.next.previous = item;
            item.next = current.next;
        }

        /*
         * Next, insert `item` after `current` by updating `item.previous` and
         * `current.next`.
         */
        item.previous = current;
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

            // special case: there was only one item, so also reset `this[tail]`
            if (this[head] === null) {
                this[tail] = null;
            } else {
                this[head].previous = null;
            }

            // return the data at the previous head of the list
            return current.data;
        }

        /*
         * The `i` variable is used to track how deep into the list we've
         * gone. This is important because it's the only way to know when
         * we've hit the `index` to remove.
         */
        let i = 0;

        /*
         * Traverse the list items similar to the `add()` method, but make
         * sure to keep track of how many items have been visited. When
         * `i` is the same as `index`, it means we've found the location to
         * remove.
         */
        while ((current !== null) && (i < index)) {

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
            current.previous.next = current.next;

            /*
             * If we are at the end of the list, then update `this[tail]`.
             * 
             * If we are not at the end of the list, then update the backwards
             * pointer for `current.next` to preserve reverse traversal.
             */
            if (this[tail] === current) {
                this[tail] = current.previous;
            } else {
                current.next.previous = current.previous;
            }

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

        // just reset both the head and tail pointer to null
        this[head] = null;
        this[tail] = null;
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
     * Create an iterator that returns each item in the list in reverse order.
     * @returns {Iterator} An iterator on the list. 
     */
    *reverse(){

        /*
         * The `current` variable is used to iterate over the list items.
         * It starts out pointing to the tail and is overwritten inside
         * of the loop below.
         */
        let current = this[tail];

        /*
         * As long as `current` is not `null`, there is a piece of data
         * to yield.
         */
        while (current !== null) {
            yield current.data;
            current = current.previous;
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

exports.DoublyLinkedList = DoublyLinkedList;