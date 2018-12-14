/**
 * @fileoverview Circular Linked List implementation in JavaScript
 */

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const tail = Symbol("tail");

/**
 * Represents a single node in a LinkedList.
 * @class CircularLinkedListNode
 */
class CircularLinkedListNode {

    /**
     * Creates a new instance of CircularLinkedListNode.
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
         * @type ?CircularLinkedListNode
         */
        this.next = null;

    }
}

/**
 * A linked list implementation in JavaScript.
 * @class CircularLinkedList
 */
class CircularLinkedList {

    /**
     * Creates a new instance of LinkedList
     */
    constructor() {

        /**
         * Pointer to last node added to the list.
         * @property tail
         * @type ?CircularLinkedListNode
         * @private
         */
        this[tail] = null;
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
        const newNode = new CircularLinkedListNode(data);
                
        //special case: no nodes in the list yet
        if (this[tail] === null) {

            /*
             * Because there are no nodes in the list, set `node.next`
             * equal to itself to complete the cycle.
             */
            newNode.next = newNode;
        } else {

            /*
             * We are inserting `newNode` in between `this[tail]` and
             * `this[tail].next`, so update pointers.
             */
            newNode.next = this[tail].next;
            this[tail].next = newNode;
        }
        
        // update the pointer to the last inserted node
        this[tail] = newNode;
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
        const newNode = new CircularLinkedListNode(data);
                
        // special case: no nodes in the list yet
        if (this[tail] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * Special case: if `index` is `0`, then no traversal is needed
         * and we need to update `this[tail]` to point to `newNode`. First,
         * set `node.next` to the current `this[tail]` so the previous
         * head of the list is now the second node in the list. Then it's
         * safe to update `this[tail]` to point to `newNode`.
         */
        if (index === 0) {
            newNode.next = this[tail].next;
            this[tail].next = newNode;
        } else {

            /*
             * The `current` variable is used to track the node that is being
             * used inside of the loop below. It starts out pointing to
             * `this[tail].next` and is overwritten inside of the loop.
             *
             * The `previous` variable tracks one step behind `current`, which
             * is necessary because we need to adjust the node at `index`-1's
             * `next` pointer to point to the new node.
             */
            let current = this[tail].next,
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
            while ((current.next !== this[tail].next) && (i < index)) {
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
        const newNode = new CircularLinkedListNode(data);
                
        // special case: no nodes in the list yet
        if (this[tail] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * The `current` variable is used to track the node that is being
         * used inside of the loop below. It starts out pointing to
         * `this[tail].next` (the first node) and is overwritten inside of the loop.
         */
        let current = this[tail].next;

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
            } while ((current !== this[tail]) && (i < index));

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
        current.next = newNode;

        if (current === this[tail]) {
            this[tail] = newNode;
        }
    }
    
    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the node whose data 
     *      should be returned.
     * @returns {*} The data in the "data" portion of the given node
     *      or undefined if the node doesn't exist.
     */
    get(index) {
    
        // ensure `index` is a positive value and the list isn't empty
        if ((index > -1) && (this[tail] !== null)) {

            /*
             * The `current` variable is used to track the node that is being
             * used inside of the loop below. It starts out pointing to
             * `this[tail].next` (the first node) and is overwritten inside of the loop.
             */
            let current = this[tail].next;

            /*
             * The `i` variable is used to track how deep into the list we've
             * gone. This is important because it's the only way to know when
             * we've hit the `index` to insert into.
             */
            let i = 0;

            /*
             * Traverse the nodes in the list and keep track of how deep we are
             * into the list. If we've reached the first node in the list
             * (`this[head].next`) or we've gone past the end of the list
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

            } while ((current !== this[tail].next) && (i <= index));

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
        if (this[tail] === null) {
            return -1;
        }
    
        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[tail].next;

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

        } while (current !== this[tail].next);

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
    
        // special case: no nodes in the list
        if (this[tail] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        // special case: `index` is an invalid value
        if (index < 0) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this[tail].next;

        // special case: removing the first node
        if (index === 0) {

            // if there's only one node, null out `this[tail]`
            if (current.next === this[tail]) {
                this[tail] = null;
            } else {
                /*
                 * The tail doesn't change when there is more than one item
                 * in the list. Just skip over `current` by setting
                 * `this[tail].next` to `current.next`.
                 */
                this[tail].next = current.next;
            }

            // return the data at the previous head of the list
            return current.data;
        }

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
         * Traverse the list, keeping track of the previous position so
         * that we can remove the node once it's found. The loop is exited
         * when either the start of the list is encountered or `i` is no
         * longer less than `index` (meaning we have found the node to remove).
         */
        do {

            // save the value of current
            previous = current;

            // traverse to the next node
            current = current.next;

            // increment the count
            i++;

        } while ((current !== this[tail].next) && (i < index));

        /*
         * If `current` isn't `this[tail].next`, then that means we've found the node
         * to remove.
         */
        if (current !== this[tail].next) {

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
        this[tail] = null;
    }

    /**
     * Returns the number of nodes in the list.
     * @returns {int} The number of nodes in the list.
     */
    get size() {

        // special case: the list is empty
        if (this[tail] === null) {
            return 0;
        }

        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below. `this[tail].next` points to the first node
         * in the list because the last node always points to the first node.
         */
        let current = this[tail].next;

        /*
         * The `count` variable is used to keep track of how many nodes have
         * been visited inside the loop below. This is important because this
         * is the value to return from this method.
         */
        let count = 0;

        /*
         * Because the list is circular, we need to stop when `current` is
         * equal to `this[tail].next`, otherwise this will be an infinite loop.
         */
        do {
            count++;
            current = current.next;
        } while (current !== this[tail].next);

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
    *values(){

        // special case: list is empty
        if (this[tail] !== null) {

            // special case: only one node
            if (this[tail].next === this[tail]) {
                yield this[tail].data;
            } else {

                /*
                 * The `current` variable is used to iterate over the list nodes.
                 * It starts out pointing to the head and is overwritten inside
                 * of the loop below. `this[tail].next] points to the first node
                 * in the list because the last node always points to the first node.
                 */
                let current = this[tail].next;
        
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
                } while (current !== this[tail].next);
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
    *circularValues(){

        // special case: list is empty
        if (this[tail] !== null) {

            /*
                * The `current` variable is used to iterate over the list nodes.
                * It starts out pointing to the head and is overwritten inside
                * of the loop below. `this[tail].next] points to the first node
                * in the list because the last node always points to the first node.
                */
            let current = this[tail].next;
    
            /*
                * This is an infinite loop if you remove the `yield` call. The `yield`
                * allows execution to stop and not pick up again until the iterator's
                * `next()` method is called again.
                * 
                * It's possible for this loop to exit if the list is emptied
                * in between calls to the iterator's `next()` method. That will
                * cause `current` to be `null` and the iterator will close.
                */ 
            do {
                yield current.data;
                current = current.next;
            } while (current !== null);
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

exports.CircularLinkedList = CircularLinkedList;