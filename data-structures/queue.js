//-----------------------------------------------------------------
// Class Queue
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  A classic Queue interface.
//-----------------------------------------------------------------
function Queue() {
    this.items = new LinkedList;
}

//-----------------------------------------------------------------
// Method Queue.get()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method gets the first item in the Queue and returns it.
//
// Arguments
//  (none)
//
// Returns
//  The first item.
//-----------------------------------------------------------------
Queue.prototype.get = function() {

    var vItem = null;

    if (!this.isEmpty()) {

        vItem = this.items.item(0);

        this.items.remove(0);
    }

    return vItem;
}

//-----------------------------------------------------------------
// Method Queue.isEmpty()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method determines if the Queue is empty.
//
// Arguments
//  (none)
//
// Returns
//  True if the Queue is empty, false if not.
//-----------------------------------------------------------------
Queue.prototype.isEmpty = function() {
	return this.items.length == 0;
}



//-----------------------------------------------------------------
// Method Queue.put()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method puts the given arguments at the end of the Queue.
//
// Arguments
//  vItem (variant) - the object to put into the Queue.
//
// Returns
//  (nothing)
//-----------------------------------------------------------------
Queue.prototype.put = function (vItem) {
    this.items.add(vItem);
    return vItem;
}

//-----------------------------------------------------------------
// Method Queue.toString()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method returns the contents of the queue as a string.
//
// Arguments
//  (none)
//
// Returns
//  A String representing the contents of the queue.
//-----------------------------------------------------------------
Queue.prototype.toString = function() {
  return this.items.toString();
}