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
 * Represents a single node in a LinkedList.
 * @class LinkedListNode
 */
class LinkedListNode {

    /**
     * Creates a new instance of LinkedListNode.
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
         * A pointer to the next node in the LinkedList.
         * @property next
         * @type ?LinkedListNode
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
         * Pointer to first node in the list.
         * @property head
         * @type ?LinkedListNode
         * @private
         */
        this[head] = null;
    }
    
    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the data at the end in a new node.
     * @param {*} data The data to add to the list.
     * @returns {void}
     */
    add(data) {
    
        /*
         * Create a new list node object and store the data in it.
         * This node will be added to the end of the existing list.
         */
        const newNode = new LinkedListNode(data);
                
        //special case: no nodes in the list yet
        if (this[head] === null) {

            /*
             * Because there are no nodes in the list, just set the
             * `this[head]` pointer to the new node.
             */
            this[head] = newNode;
        } else {

            /*
             * The `current` variable is used to track the node that is being
             * used inside of the loop below. It starts out pointing to
             * `this[head]` and is overwritten inside of the loop.
             */
            let current = this[head];

            /*
             * Follow each `next` pointer until the end. The last node in the
             * list has `next` equal to `null`, so when we reach that node,
             * we know we're at the end.
             */
            while (current.next !== null) {
                current = current.next;
            }
           
            /*
             * At this point, `current` is equal to the last node in the list.
             * Setting its `current.next` equal to node means adding a new node
             * at the end of the list.
             */
            current.next = newNode;            
        }
    }
    
    /**
     * Inserts some data into the middle of the list. This method traverses
     * the existing list and places the data in a new node at a specific index.
     * @param {*} data The data to add to the list.
     * @param {int} index The zero-based index at which to insert the data.
     * @returns {void}
     * @throws {RangeError} If the index doesn't exist in the list.
     */
    insertBefore(data, index) {
    
        /*
         * Create a new list node object and store the data in it.
         * This node will be inserted into the existing list.
         */
        const newNode = new LinkedListNode(data);
                
        // special case: no nodes in the list yet
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * Special case: if `index` is `0`, then no traversal is needed
         * and we need to update `this[head]` to point to `node`. First,
         * set `node.next` to the current `this[head]` so the previous
         * head of the list is now the second node in the list. Then it's
         * safe to update `this[head]` to point to `node`.
         */
        if (index === 0) {
            newNode.next = this[head];
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
             * Traverse the list nodes similar to the `add()` method, but make
             * sure to keep track of how many nodes have been visited and update
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
             * At this point, `current` is either the node to insert the new data
             * before, or the last node in the list. The only way to tell is if
             * `i` is still less than `index`, that means the index is out of range
             * and an error should be thrown.
             */
            if (i < index) {
                throw new RangeError(`Index ${index} does not exist in the list.`);
            }

            /*
             * If code continues to execute here, it means `current` is the node
             * to insert new data before and `previous` is the node to insert
             * new data after. So `previous.next` must point to `node` and
             * `node.next` must point to `current`.
             */
            previous.next = newNode;
            newNode.next = current;
        }
    }
    
    /**
     * Inserts some data into the middle of the list. This method traverses
     * the existing list and places the data in a new node after a specific index.
     * @param {*} data The data to add to the list.
     * @param {int} index The zero-based index after which to insert the data.
     * @returns {void}
     * @throws {RangeError} If the index doesn't exist in the list.
     */
    insertAfter(data, index) {
    
        /*
         * Create a new list node object and store the data in it.
         * This node will be inserted into the existing list.
         */
        const newNode = new LinkedListNode(data);
                
        // special case: no nodes in the list yet
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * The `current` variable is used to track the node that is being
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
         * Traverse the list nodes similar to the `add()` method, but make
         * sure to keep track of how many nodes have been visited and update
         * the `previous` pointer in addition to `current`. When
         * `i` is the same as `index`, it means we've found the location to
         * insert the new data.
         */
        while ((current !== null) && (i < index)) {
            current = current.next;
            i++;
        }
        
        /*
         * At this point, `current` is either the node to insert the new data
         * before, or the last node in the list. The only way to tell is if
         * `i` is still less than `index`, that means the index is out of range
         * and an error should be thrown.
         */
        if (i < index) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * If code continues to execute here, it means `current` is the node
         * to insert new data after. So `current.next` must point to
         * `node` for the data to be in the correct spot, but before that,
         * `node.next` must point to `current.next` to ensure the list
         * remains intact.
         */
        newNode.next = current.next;
        current.next = newNode;
    }
    
    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the node whose data 
     *      should be returned.
     * @returns {*} The data in the "data" portion of the given node
     *      or undefined if the node doesn't exist.
     */
    get(index) {
    
        // ensure `index` is a positive value
        if (index > -1) {

            /*
             * The `current` variable is used to track the node that is being
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
             * Traverse the list nodes similar to the `add()` method, but make
             * sure to keep track of how many nodes have been visited and update
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
             * that the node at `index` was not found. If `current` is not
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
         * continues until there are no more nodes to search (when `current` is `null`).
         */
        while (current !== null) {
            if (current.data === data) {
                return index;
            }

            // traverse to the next node in the list
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
     * Removes the node from the given location in the list.
     * @param {int} index The zero-based index of the node to remove.
     * @returns {*} The data in the given position in the list.
     * @throws {RangeError} If index is out of range.
     */
    remove(index) {
    
        // special cases: empty list or invalid `index`
        if ((this[head] === null) || (index < 0)) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        // special case: removing the first node
        if (index === 0) {
            
            // temporarily store the data from the node
            const data = this[head].data;
            
            // just replace the head with the next node in the list
            this[head] = this[head].next;
            
            // return the data at the previous head of the list
            return data;
        }
        
        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        /*
         * The `previous` variable keeps track of the node just before
         * `current` in the loop below. This is necessary because removing
         * an node means updating the previous node's `next` pointer.
         */
        let previous = null;

        /*
         * The `i` variable is used to track how deep into the list we've
         * gone. This is important because it's the only way to know when
         * we've hit the `index` to remove.
         */
        let i = 0;

        /*
         * Traverse the list nodes similar to the `add()` method, but make
         * sure to keep track of how many nodes have been visited and update
         * the `previous` pointer in addition to `current`. When
         * `i` is the same as `index`, it means we've found the location to
         * remove.
         */
        while ((current !== null) && (i < index)) {

            // save the value of current
            previous = current;

            // traverse to the next node
            current = current.next;

            // increment the count
            i++;
        }

        /*
         * If `current` isn't `null`, then that means we've found the node
         * to remove.
         */
        if (current !== null) {

            // skip over the node to remove
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
     * Removes all nodes from the list.
     * @returns {void}
     */
    clear() {
        this[head] = null;
    }

    /**
     * Returns the number of nodes in the list.
     * @returns {int} The number of nodes in the list.
     */
    get size() {

        // special case: the list is empty
        if (this[head] === null) {
            return 0;
        }

        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[head];

        /*
         * The `count` variable is used to keep track of how many nodes have
         * been visited inside the loop below. This is important because this
         * is the value to return from this method.
         */
        let count = 0;

        /*
         * As long as `current` is not `null`, that means we're not yet at the
         * end of the list, so adding 1 to `count` and traverse to the next node.
         */
        while (current !== null) {
            count++;
            current = current.next;
        }

        /*
         * When `current` is `null`, the loop is exited at the value of `count`
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
    *values(){

        /*
         * The `current` variable is used to iterate over the list nodes.
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