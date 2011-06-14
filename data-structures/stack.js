//-----------------------------------------------------------------
// Class Stack
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 6/3/02
//
// Description
//  A classic stack interface.
//
// Arguments
//  Any number of parameters to be pushed onto the stack.
//-----------------------------------------------------------------
function Stack() {
    this.items = new LinkedList;
}

//-----------------------------------------------------------------
// Method Stack.isEmpty()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 6/3/02
//
// Description
//  This method determines if the stack is empty.
//
// Parameters
//  (none)
//
// Returns
//  True if the stack is empty, false if not.
//-----------------------------------------------------------------
Stack.prototype.isEmpty = function() {
  return this.items.length == 0;
}

//-----------------------------------------------------------------
// Method Stack.pop()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 6/3/02
//
// Description
//  This method pops off the top item in the stack and returns it.
//
// Parameters
//  (none)
//
// Returns
//  The popped item.
//-----------------------------------------------------------------
Stack.prototype.pop = function() {

    var vItem = null;

    if (!this.isEmpty()) {

        vItem = this.items.item(this.items.length - 1);

        this.items.remove(this.items.length - 1);
    }

    return vItem;
}


//-----------------------------------------------------------------
// Method Stack.push()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 6/3/02
//
// Description
//  This method pushes the given arguments onto the top of the stack.
//
// Parameters
//  vItem (variant) - the object to push onto the stack.
//
// Returns
//  (nothing)
//-----------------------------------------------------------------
Stack.prototype.push = function(vItem) {
  this.items.add(vItem);
  return vItem;
}

//-----------------------------------------------------------------
// Method Stack.toString()
//-----------------------------------------------------------------
// Author(s)
//  Nicholas C. Zakas (NCZ), 6/3/02
//
// Description
//  This method returns the contents of the stack as a string.
//
// Parameters
//  (none)
//
// Returns
//  A String representing the contents of the stack.
//-----------------------------------------------------------------
Stack.prototype.toString = function() {
  return this.items.toString();
}
