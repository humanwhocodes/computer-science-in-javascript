/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function CircularLinkedList() {
    /**
     * The number of items in the list.
     * @property _length
     * @type int
     * @private
     */
    this._length = 0;
    
    /**
     * Pointer to first item in the list.
     * @property _head
     * @type Object
     * @private
     */
    this._head = null;
}

CircularLinkedList.prototype = new LinkedList();
CircularLinkedList.prototype.constructor = CircularLinkedList;

CircularLinkedList.prototype.add = function(data) {
  //create a new item object, place data in
        var node = {
            data: data,
            next: null
        },
        //used to traverse the structure
        current;

        //special case: no items in the list yet
        if (this._head === null) {
            this._head = node;
            //Makes the _head.next point to itself so it is circular
            this._head.next = this._head;
        } else {
            current = this._head;

            while (current.next && current.next !== this._head) {
                current = current.next;
            }

            current.next = node;
            current = current.next;

            //makes the last  node in the linked-list link back to this._head
            current.next = this._head;

        }

        //don't forget to update the count
        this._length++;  
};

CircularLinkedList.prototype.toArray = function() {
  var result = [],
                current = this._head;

        while (current && current.next !== this._head) {
            result.push(current.data);
            current = current.next;
        }

        return result;  
};