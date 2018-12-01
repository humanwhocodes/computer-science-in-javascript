/**
 * @fileoverview Linked List implementation in JavaScript
 */

"use strict";

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const head = Symbol("head");

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
         * @type Object
         * @private
         */
        this[head] = null;
    }
    
    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the data at the end in a new item.
     * @param {variant} data The data to add to the list.
     * @returns {void}
     */
    add(data) {
    
        //create a new item object, place the data in it
        const node = {
                data,
                next: null
            };
                
        //used to traverse the structure
        let current;
    
        //special case: no items in the list yet
        if (this[head] === null) {
            this[head] = node;
        } else {
            current = this[head];    

            // iterate to the end of the list
            while (current.next){
                current = current.next;
            }
           
            // add new node at the end of the list
            current.next = node;            
        }
        
    }
    
    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the item whose data 
     *      should be returned.
     * @returns {variant} The data in the "data" portion of the given item
     *      or null if the item doesn't exist.
     */
    get(index) {
    
        //check for out-of-bounds datas
        if (index > -1) {
            let current = this[head],
                i = 0;
                
            while(current && i++ < index){
                current = current.next;            
            }
        
            return current ? current.data : null;
        } else {
            return null;
        }
    }
    
    /**
     * Retrieves the index of the data in the list.
     * @param {variant} data The data to search for.
     * @returns {int} The index of the first instance of the data in the list
     *      or -1 if not found.
     */
    indexOf(data) {
    
        let current = this[head],
            index = 0;
            
        while (current) {
            if (current.data === data) {
                return index;
            }

            current = current.next;
            index++;
        }

        return -1;
    }
    
    /**
     * Removes the item from the given location in the list.
     * @param {int} index The zero-based index of the item to remove.
     * @returns {variant} The data in the given position in the list or null if
     *      the item doesn't exist.
     */
    remove(index) {
    
        //check for out-of-bounds datas
        if (index > -1) {
        
            let current = this[head],
                previous,
                i = 0;
                
            //special case: removing first item
            if (index === 0) {
                this[head] = current.next;
                return current.data;
            } else {
        
                //find the right location
                while (current && i++ < index) {
                    previous = current;
                    current = current.next;       
                }

                if (current) {

                    //skip over the item to remove
                    previous.next = current.next;
                    return current.data;
                } else {
                    return null;
                }    
            }
        
        } else {
            return null;
        }
    
    }
    
    /**
     * Returns the number of items in the list.
     * @returns {int} The number of items in the list.
     */
    get size() {
        if (this[head] === null) {
            return 0;
        } else {
            let current = this[head],
                count = 0;

            // iterate to the end of the list
            while (current) {
                count++;
                current = current.next;
            }

            return count;
        }
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
        if (this[head] !== null) {
            let current = this[head];

            // iterate to the end of the list
            do {
                yield current.data;
                current = current.next;
            } while (current);
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