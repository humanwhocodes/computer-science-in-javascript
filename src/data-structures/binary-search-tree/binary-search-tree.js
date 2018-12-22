/**
 * @fileoverview Binary Search Tree implementation in JavaScript
 */

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const root = Symbol("root");

/**
 * Represents a single node in a BinarySearchTree.
 * @class BinarySearchTree
 */
class BinarySearchTreeNode {

    /**
     * Creates a new instance of BinarySearchTreeNode.
     * @param {*} value The value to store in the node. 
     */
    constructor(value) {

        /**
         * The value that this node stores.
         * @property value
         * @type *
         */
        this.value = value;

        /**
         * A pointer to the left node in the BinarySearchTree.
         * @property left
         * @type ?BinarySearchTreeNode
         */
        this.left = null;

        /**
         * A pointer to the right node in the BinarySearchTree.
         * @property right
         * @type ?BinarySearchTreeNode
         */
        this.right = null;

    }
}

/**
 * A linked tree implementation in JavaScript.
 * @class BinarySearchTree
 */
class BinarySearchTree {

    /**
     * Creates a new instance of BinarySearchTree
     */
    constructor() {

        /**
         * Pointer to the root node in the tree.
         * @property root
         * @type ?BinarySearchTreeNode
         * @private
         */
        this[root] = null;
    }
    
    /**
     * Adds some value into the tree. This method traverses the tree to find
     * the correct location to insert the value. Duplicate values are discarded.
     * @param {*} value The value to add to the tree.
     * @returns {void}
     */
    add(value) {
    
        /*
         * Create a new node to insert into the tree and store the value in it.
         * This node will be added into the tree.
         */
        const newNode = new BinarySearchTreeNode(value);

        // special case: no nodes in the tree yet
        if (this[root] === null) {
            this[root] = newNode;
        } else {

            /*
             * The `current` variable is used to track the item that is being
             * used inside of the loop below. It starts out pointing to
             * `this[root]` and is overwritten inside of the loop.
             */
            let current = this[root];

            /*
             * This is loop is broken only when the node has been inserted
             * in the correct spot or a duplicate value is found.
             */
            while (current !== null) {

                // if the new value is less than this node's value, go left
                if (value < current.value) {

                    //if there's no left, then the new node belongs there
                    if (current.left === null) {
                        current.left = newNode;
                        break;
                    } else {
                        current = current.left;
                    }

                // if the new value is greater than this node's value, go right
                } else if (value > current.value) {

                    //if there's no right, then the new node belongs there
                    if (current.right === null) {
                        current.right = newNode;
                        break;
                    } else {
                        current = current.right;
                    }

                // if the new value is equal to the nodeToRemove one, just ignore
                } else {
                    break;
                }
            }
        }
    }
        

    /**
     * Determines if a given value exists in the tree.
     * @param {*} value The value to find.
     * @returns {boolean} True if the value is found in the tree, false if not. 
     */
    has(value) {


        /*
         * `found` keeps track of whether or not the value in question was
         * found in the tree. This variable is used for both the control
         * condition of the loop below and is the return value of this function.
         */ 
        let found = false;

        /*
         * The `current` variable is used to track the item that is being
         * used inside of the loop below. It starts out pointing to
         * `this[root]` and is overwritten inside of the loop.
         */
        let current = this[root];

        /*
         * The loop continues until either the value is found (so `found`
         * is `true`) or the tree has been completely searched
         * (`current` is `null`).
         */
        while (!found && current !== null) {

            // if the value is less than the current node's, go left
            if (value < current.value) {
                current = current.left;

            // if the value is greater than the current node's, go right
            } else if (value > current.value) {
                current = current.right;

            //values are equal, found it!
            } else {
                found = true;
            }
        }

        /*
         * Execution reaches here either because `found` is `true`, or because
         * the tree was completely searched and the value was not found. Either
         * way, the value of `found` is now the result of the search, so just
         * return it.
         */
        return found;
    }

    
    /**
     * Deletes the value from the tree.
     * @param {int} index The zero-based index of the item to remove.
     * @returns {*} The value in the given position in the tree.
     * @throws {RangeError} If index is out of range.
     */
    delete(value) {

        // special case: the tree is empty, just exit
        if (this[root] === null) {
            return;
        }
        
        /*
         * The `found` variable keeps track of whether or not the value has
         * been found in the tree.
         */
        let found = false;

        /*
         * These two variables keep track of the location during traversal.
         * The `current` variable is the node we have traversed to while the
         * `parent` variable is the parent node of `current`. Unlike with other
         * traversals, we need to keep track of the parent so we can remove
         * the child node.
         */
        let current = this[root],
            parent = null; 

        /*
         * The first step is to do a search for the value to remove. This is
         * the same algorithm as the `has()` method, with the difference being
         * that the parent is also tracked.
         */
        while (!found && current !== null) {

            // if the value is less than the current node's, go left
            if (value < current.value) {
                parent = current;
                current = current.left;

            // if the value is greater than the current node's, go right
            } else if (value > current.value) {
                parent = current;
                current = current.right;

            // values are equal, found it!
            } else {
                found = true;
            }
        }

        // if the value wasn't found, just exit
        if (!found) {
            return;
        }

        /*
         * If we make it to here, the `nodeToRemove` variable continues the node
         * to remove. This assignment isn't necessary but makes it easier to
         * figure out what's going on in the code below.
         */
        const nodeToRemove = current;

        /*
         * The `replacement` variable is filled with what should replace
         * `nodeToRemove`. It starts out set to `null` but can change based
         * on what we find later.
         */
        let replacement = null;

        /*
         * The most complicated case is when the `nodeToRemove` node has both a left
         * and a right child. In that case, we need to move things around to 
         * ensure the tree remains properly structured.
         */
        if ((nodeToRemove.left !== null) && (nodeToRemove.right !== null)) {

            /*
             * We need to find the best replacement for the removed node by
             * traversing the subtrees. To start, we assume that the best
             * replacement is `nodeToRemove.left`.
             */
            replacement = nodeToRemove.left;

            /*
             * We need to keep track of the replacement's parent to modify
             * the subtree as we go.
             */
            let replacementParent = nodeToRemove;

            /*
             * The best replacement is found by traversing the right subtree
             * of `replacement`. The rightmost node in this subtree is the
             * largest value in `nodeToRemove`'s left subtree and so is the
             * easiest one to use as a replacement to minimize the number of
             * modifications we need to do.
             */
            while (replacement.right !== null) {
                replacementParent = replacement;
                replacement = replacement.right;
            }


            /*
             * Because `replacement` has no right subtree, we can copy over the
             * `nodeToRemove`'s right subtree directly.
             */
            replacement.right = nodeToRemove.right;

            /*
             * Special case: if `nodeToRemove.left` doesn't have a right subtree,
             * then `replacementParent` will be equal to `nodeToRemove`. In that
             * case, we should not make any further changes. Otherwise, we need
             * to rearrange some more nodes.
             */
            if (replacementParent !== nodeToRemove) {
                
                /*
                 * Remove `replacement` from its current location and replace it
                 * with `replacement.left` (we know `replacement.right` is `null`).
                 * It's possible that `replacement.left` is `null`, but that doesn't
                 * matter. Both `null` and non-`null` values keep the tree intact.
                 */
                replacementParent.right = replacement.left;
    
                /*
                 * Assign the complete left subtree of `nodeToRemove` to
                 * `replacement` to maintain the proper structure.
                 */
                replacement.left = nodeToRemove.left;
            }

        } else if (nodeToRemove.left !== null) {
            replacement = nodeToRemove.left;
        } else if (nodeToRemove.right !== null) {
            replacement = nodeToRemove.right;
        }

        /*
         * If the `nodeToRemove` node has no children, then the default value of
         * `null` is used for `replacement`.
         */

        // special case: the `nodeToRemove` node is the root
        if (nodeToRemove === this[root]) {
            this[root] = replacement;
        } else {
            
            if (nodeToRemove.value < parent.value) {
                parent.left = replacement;
            } else {
                parent.right = replacement;
            }

        }



    }

    /**
     * Removes all nodes from the tree.
     * @returns {void}
     */
    clear() {
        this[root] = null;
    }

    /**
     * Returns the number of items in the tree.
     * @returns {int} The number of items in the tree.
     */
    get size() {

        // special case: the tree is empty
        if (this[root] === null) {
            return 0;
        }

        /*
         * The `count` variable is used to keep track of how many items have
         * been visited inside the loop below. This is important because this
         * is the value to return from this method.
         */
        let count = 0;

        /*
         * Traversal is easiest when using a recursive function, so define
         * a helper function here. This function does an in-order traversal
         * of the tree, meaning it yields values in sorted order from 
         * lowest value to highest. It does this by traversing to the leftmost
         * node first, then working its way back up the tree, visiting right nodes
         * along the way.
         */
        const traverse = (node) => {

            // special case: there is no node
            if (node) {

                //traverse the left subtree
                if (node.left !== null) {
                    traverse(node.left);
                }

                // increment the counter
                count++;

                //traverse the right subtree
                if (node.right !== null) {
                    traverse(node.right);
                }
            }
        };

        // start traversing from the root
        traverse(this[root]);

        // return the final count, which was updated inside traverse()
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
     * Create an iterator that returns each node in the tree.
     * @returns {Iterator} An iterator on the tree. 
     */
    *values(){
        
        /*
         * Traversal is easiest when using a recursive function, so define
         * a helper function here. This function does an in-order traversal
         * of the tree, meaning it yields values in sorted order from 
         * lowest value to highest. It does this by traversing to the leftmost
         * node first, then working its way back up the tree, visiting right nodes
         * along the way.
         * 
         * This function cannot be an arrow function because arrow functions
         * cannot be generators.
         */
        function *traverse(node) {

            // special case: there is no node
            if (node) {

                //traverse the left subtree
                if (node.left !== null) {
                    yield* traverse(node.left);
                }

                // emit the value
                yield node.value;

                //traverse the right subtree
                if (node.right !== null) {
                    yield* traverse(node.right);
                }
            }
        }

        yield* traverse(this[root]);
    }
    
    /**
     * Converts the tree into a string representation.
     * @returns {String} A string representation of the tree.
     */
    toString(){
        return [...this].toString();
    }
}

exports.BinarySearchTree = BinarySearchTree;