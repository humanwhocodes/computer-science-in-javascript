//-----------------------------------------------------------------
// Class Deque
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  A classic Deque interface.
//-----------------------------------------------------------------
function Deque() {
    this.items = new DoubleLinkedList
}

//-----------------------------------------------------------------
// Method Deque.getBack()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method gets off the back item in the Deque and returns it.
//
// Arguments
//  (none)
//
// Returns
//  The back item.
//-----------------------------------------------------------------
Deque.prototype.getBack = function() {

    var vItem = null;

    if (!this.isEmpty()) {

        vItem = this.items.item(this.items.length - 1);

        this.items.remove(this.items.length - 1);
    }

    return vItem;
}


//-----------------------------------------------------------------
// Method Deque.getFront()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method gets the first item in the Deque and returns it.
//
// Arguments
//  (none)
//
// Returns
//  The first item.
//-----------------------------------------------------------------
Deque.prototype.getFront = function() {

    var vItem = null;

    if (!this.isEmpty()) {

        vItem = this.items.item(0);

        this.items.remove(0);
    }

    return vItem;
}

//-----------------------------------------------------------------
// Method Deque.isEmpty()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method determines if the Deque is empty.
//
// Arguments
//  (none)
//
// Returns
//  True if the Deque is empty, false if not.
//-----------------------------------------------------------------
Deque.prototype.isEmpty = function() {
	return this.items.length == 0;
}

//-----------------------------------------------------------------
// Method Deque.putBack()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method puts the given argument at the back of the Deque.
//
// Arguments
//  vItem (variant) - the object to put into the Deque.
//
// Returns
//  (nothing)
//-----------------------------------------------------------------
Deque.prototype.putBack = function (vItem) {
    this.items.add(vItem);
    return vItem;
}

//-----------------------------------------------------------------
// Method Deque.putFront()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method puts the given argument at the front of the Deque.
//
// Arguments
//  oElement (Object) - the object to put into the Deque.
//
// Returns
//  (nothing)
//-----------------------------------------------------------------
Deque.prototype.putFront = function (vData) {
  var oNode = new DoubleLinkedListNode(vData);

  if (this.isEmpty()) {
    this.items.__first__ = oNode;
    this.items.__last__ = oNode;
  } else {
    var oPtr = this.items.__first__;
    this.items.__first__ = oNode;
    oNode.next = oPtr;
    oPtr.prev = oNode;
  }

  this.items.length++;
}

//-----------------------------------------------------------------
// Method Deque.toString()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 9/5/02
//
// Description
//  This method returns the contents of the Deque as a string.
//
// Arguments
//  (none)
//
// Returns
//  A String representing the contents of the Deque.
//-----------------------------------------------------------------
Deque.prototype.toString = function() {
  return this.items.toString();
}
