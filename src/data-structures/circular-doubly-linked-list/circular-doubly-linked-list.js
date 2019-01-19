/**
 * @fileoverview Circular Doubly linked list implementation in JavaScript
 */

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const head = Symbol("head");

/**
 * Represents a single item in a CircularDoublyLinkedList.
 * @class CircularDoublyLinkedListNode
 */
class CircularDoublyLinkedListNode {

    /**
     * Creates a new instance of CircularDoublyLinkedListNode.
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
         * A pointer to the next item in the CircularDoublyLinkedList.
         * @property next
         * @type ?CircularDoublyLinkedListNode
         */
        this.next = null;

        /**
         * A pointer to the previous item in the CircularDoublyLinkedList.
         * @property previous
         * @type ?CircularDoublyLinkedListNode
         */
        this.previous = null;
    }
}

/**
 * A doubly linked list implementation in JavaScript.
 * @class CircularDoublyLinkedList
 */
class CircularDoublyLinkedList {

    /**
     * Creates a new instance of CircularDoublyLinkedList
     */
    constructor() {

        /**
         * Pointer to first item in the list.
         * @property head
         * @type ?CircularDoublyLinkedListNode
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
        const newNode = new CircularDoublyLinkedListNode(data);
                
        // special case: no items in the list yet
        if (this[head] === null) {

            /*
             * Because there are no items in the list, just set the
             * `this[head]` pointer to the new item.
             */
            this[head] = newNode;

            /*
             * Setup the new node to point to itself in both directions
             * to create the circular link.
             */
            newNode.next = newNode;
            newNode.previous = newNode;
        } else {

            // get a reference to the last item in the list
            const tail = this[head].previous;

            /*
             * Setup the tail and `newNode` to point to each other, effectively
             * adding `newNode` to the end of the list.
             */
            tail.next = newNode;
            newNode.previous = tail;
            
            /*
             * Because `newNode` is now the last item, `newNode.next` must point
             * to the head and vice versa.
             */
            newNode.next = this[head];
            this[head].previous = newNode;
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
        const newNode = new CircularDoublyLinkedListNode(data);
                
        // special case: no nodes in the list yet
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * Special case: if `index` is `0`, then no traversal is needed
         * and we need to update `this[head]` to point to `newNode`.
         */
        if (index === 0) {

            // get the last item in the list to make things a bit clearer
            const tail = this[head].previous;

            // first make `tail` and `newNode` point to each other
            tail.next = newNode;
            newNode.previous = tail;

            // then make `this[head]` and `newNode` point to each other
            newNode.next = this[head];
            this[head].previous = newNode;

            // now it's safe to update `this[head]` to be `newNode`
            this[head] = newNode;
        } else {

            /*
             * The `current` variable is used to track the node that is being
             * used inside of the loop below. It starts out pointing to
             * `this[head]` and is overwritten inside of the loop.
             *
             * The `previous` variable tracks one step behind `current`, which
             * is necessary because we need to adjust the node at `index`-1's
             * `next` pointer to point to the new node.
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
             * Traverse and make sure to keep track of how many nodes have
             * been visited and update the `previous` pointer in addition to
             * `current`. When `i` is the same as `index`, it means we've
             * found the location to insert the new data.
             */
            while ((current.next !== this[head]) && (i < index)) {
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
             * If code continues to execute here, it means `current` is the node
             * to insert new data before and `previous` is the node to insert
             * new data after. So `previous.next` must point to `newNode` and
             * `newNode.next` must point to `current`.
             */
            previous.next = newNode;
            newNode.previous = previous;

            newNode.next = current;
            current.previous = newNode;
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
        const newNode = new CircularDoublyLinkedListNode(data);

        // special case: no nodes in the list yet
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * The `current` variable is used to track the node that is being
         * used inside of the loop below. It starts out pointing to
         * `this[head]` (the first node) and is overwritten inside of the loop.
         */
        let current = this[head];

        // special case: insert after index 0 doesn't require a traversal
        if (index > 0) {

            /*
             * The `i` variable is used to track how deep into the list we've
             * gone. This important because it's the only way to know when
             * we've hit the `index` to insert into.
             */
            let i = 0;

            /*
             * Traverse and keep track of how many nodes have been visited and
             * update the `current` pointer. When `i` is the same as `index`, 
             * it means we've found the location to insert the new data.
             */
            do {
                current = current.next;
                i++;
            } while ((current !== this[head]) && (i < index));

            /*
             * At this point, `current` is either the node to insert the new data
             * before, or the last node in the list. The only way to tell is if
             * `i` is still less than `index`, that means the index is out of range
             * and an error should be thrown.
             */
            if (i < index) {
                throw new RangeError(`Index ${index} does not exist in the list.`);
            }

        }

        /*
         * If code continues to execute here, it means `current` is the node
         * to insert new data after. So `current.next` must point to
         * `newNode` for the data to be in the correct spot, but before that,
         * `newNode.next` must point to `current.next` to ensure the list
         * remains intact.
         */
        newNode.next = current.next;
        current.next.previous = newNode;

        current.next = newNode;
        newNode.previous = current;
    }
    
    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the item whose data 
     *      should be returned.
     * @returns {*} The data in the "data" portion of the given item
     *      or undefined if the item doesn't exist.
     */
    get(index) {

        // ensure `index` is a positive value and the list isn't empty
        if ((index > -1) && (this[head] !== null)) {

            /*
             * The `current` variable is used to track the node that is being
             * used inside of the loop below. It starts out pointing to
             * `this[head]` (the first node) and is overwritten inside of the loop.
             */
            let current = this[head];

            /*
             * The `i` variable is used to track how deep into the list we've
             * gone. This is important because it's the only way to know when
             * we've hit the `index` to insert into.
             */
            let i = 0;

            /*
             * Traverse the nodes in the list and keep track of how deep we are
             * into the list. If we've reached the first node in the list
             * (`this[head]`) or we've gone past the end of the list
             * (`i > index`), then exit the loop.
             */
            do {

                /*
                 * If the current position matches, the index being requested,
                 * then return the data in the current node and exit immediately.
                 */
                if (i === index) {
                    return current.data;
                }

                // otherwise, go on to the next node
                current = current.next;

                // and increment the index
                i++;

            } while ((current !== this[head]) && (i <= index));

            /*
             * If we've made it here, it means that that the index is past the
             * end of the list. Execution now falls through the last `return`
             * statement in this method, returning `undefined` to indicate no
             * data was found.
             */
        }

        return undefined;
    }
    
    /**
     * Retrieves the index of the data in the list.
     * @param {*} data The data to search for.
     * @returns {int} The index of the first instance of the data in the list
     *      or -1 if not found.
     */
    indexOf(data) {

        // special case: the list is empty so there's nothing to search
        if (this[head] === null) {
            return -1;
        }

        /*
         * The `current` variable is used to iterate over the list nodes.
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
         * This loop checks each node in the list to see if it matches `data`.
         * If a match is found, it returns `index` immediately, exiting the
         * loop because there's no reason to keep searching. The search
         * continues until there are no more nodes to search because `current`
         * is once again pointing the first node in the list.
         */
        do {

            /*
             * If the data in the current node matches the data we are looking
             * for, then return `index`. This exits the loop immediately.
             */
            if (current.data === data) {
                return index;
            }

            // otherwise, go on to the next node
            current = current.next;

            // and increment the index
            index++;

        } while (current !== this[head]);

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

        // special cases: no nodes in the list or `index` is an invalid value
        if ((this[head] === null) || (index < 0)) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        // special case: removing the first node
        if (index === 0) {

            // if there's only one node, null out `this[head]`
            if (current.next === this[head]) {
                this[head] = null;
            } else {

                // get the last item in the list
                const tail = this[head].previous;

                /*
                 * Set the tail to point to the second item in the list.
                 * Then make sure that item also points back to the tail.
                 */
                tail.next = current.next;
                current.next.previous = tail;
                
                // now it's safe to update the head
                this[head] = tail.next;
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
         * Traverse the list and exit the loop when either the start of the 
         * list is encountered or `i` is no longer less than `index` (meaning
         * we have found the node to remove).
         */
        do {

            // traverse to the next node
            current = current.next;

            // increment the count
            i++;

        } while ((current !== this[head]) && (i < index));

        /*
         * If `current` isn't `this[head]`, then that means we've found the node
         * to remove.
         */
        if (current !== this[head]) {

            // skip over the node to remove
            current.previous.next = current.next;
            current.next.previous = current.previous;

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

        // just reset the head pointer to null
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
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below. `this[head]` points to the first node
         * in the list because the last node always points to the first node.
         */
        let current = this[head];

        /*
         * The `count` variable is used to keep track of how many nodes have
         * been visited inside the loop below. This is important because this
         * is the value to return from this method.
         */
        let count = 0;

        /*
         * Because the list is circular, we need to stop when `current` is
         * equal to `this[head]`, otherwise this will be an infinite loop.
         */
        do {
            count++;
            current = current.next;
        } while (current !== this[head]);

        /*
         * The loop is exited and the value of `count`
         * is the number of nodes that were counted in the loop.
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
     * Create an iterator that returns each node in the list.
     * @returns {Iterator} An iterator on the list. 
     */
    *values() {

        // special case: list is empty
        if (this[head] !== null) {

            // special case: only one node
            if (this[head].next === this[head]) {
                yield this[head].data;
            } else {

                /*
                 * The `current` variable is used to iterate over the list nodes.
                 * It starts out pointing to the head and is overwritten inside
                 * of the loop below.
                 */
                let current = this[head];

                /*
                 * Because the list is circular, we need to stop when `current` is
                 * equal to the first node, otherwise this will be an infinite loop.
                 * And because `current` starts out equal to the first node, we need
                 * to use a post-test loop because we know the loop should execute
                 * at least once.
                 */
                do {
                    yield current.data;
                    current = current.next;
                } while (current !== this[head]);
            }

        }
    }

    /**
     * Create an iterator that returns each node in the list and repeats
     * each node if it continues to be called. This is designed to be used
     * to manually iterate through the list, outside of using syntax such
     * as `for-of` (which will result in an infinite loop with this iterator).
     * @returns {Iterator} A circular iterator on the list. 
     */
    *circularValues() {

        // special case: list is empty
        if (this[head] !== null) {

            /*
             * The `current` variable is used to iterate over the list nodes.
             * It starts out pointing to the head and is overwritten inside
             * of the loop below.
             */
            let current = this[head];

            /*
             * This is an infinite loop if you remove the `yield` call. The `yield`
             * allows execution to stop and not pick up again until the iterator's
             * `next()` method is called again.
             * 
             * It's not possible for this loop to exit. Even removing all nodes
             * from the list using `remove()` or `clear()` will not cause the 
             * loop to stop yield values. That's because `current.next` always
             * has a value, even if it just points back to `current`.
             */
            do {
                yield current.data;
                current = current.next;
            } while (true);
        }

    }
    
    /**
     * Create an iterator that returns each item in the list in reverse order.
     * @returns {Iterator} An iterator on the list. 
     */
    *reverse(){

        // special case: list is empty
        if (this[head] !== null) {

            /*
             * The `current` variable is used to iterate over the list items.
             * It starts out pointing to the head and is overwritten inside
             * of the loop below.
             */
            let current = this[head].previous;

            /*
             * As long as `current` is not `head`, there is a piece of data
             * to yield.
             */
            do {
                yield current.data;
                current = current.previous;
            } while (current !== this[head].previous);
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

exports.CircularDoublyLinkedList = CircularDoublyLinkedList;