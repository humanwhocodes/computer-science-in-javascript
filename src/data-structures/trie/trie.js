
/**
 * @fileoverview Trie implementation in JavaScript
 */

"use strict";

//-----------------------------------------------------------------------------
// Private
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// TrieNode Class
//-----------------------------------------------------------------------------

/**
 * Represents a single node in a Trie.
 * @class TrieNode
 */
class TrieNode {

    /**
     * Creates a new instance of the TrieNode.
     * @param {string} [character=null] A single character to store in this node.
     * @param {boolean} [isWord=false] Indicates if this node terminates a
     *      valid word.
     */
    constructor(character = null, isWord = false) {

        /**
         * A single character that the node represents.
         * @type string
         * @property character
         */
        this.character = character;

        /**
         * Indicates if the node ancestors of this node combine to form
         * a valid word.
         * @type boolean
         * @property isWord
         */
        this.isWord = isWord;

        /**
         * A map of child nodes where the key represents a character and
         * the value is a TrieNode. You could also use the `HashMap` class
         * from this repo but the implementation will be exactly the same.
         * @type Map
         * @property children
         */
        this.children = new Map();
    }

    add(text, index = 0) {

        /*
         * The `isLastCharacter` variable is used to determine if there is any
         * further work to do once this method finishes. It is used both to
         * set the `isWord` flag of any newly created node and to determine
         * whether or not to make a recursive call to continue storing the text.
         */
        const isLastCharacter = (index === text.length - 1);
        
        /**
         * The `character` variable stores the character we are concerned with
         * during the execution of this method.
         */
        const character = text.charAt(index);

        // If there isn't already a node for this character, create one
        if (!this.children.has(character)) {
            this.children.set(character, new TrieNode(character, isLastCharacter));
        }
        
        // Get the node for this character from the map
        let node = this.children.get(character);

        /*
         * If `character` isn't the last character in the string, then
         * recursively call `add()` on the new node to continue. The 
         * second argument is `index + 1` to ensure we are continuing to add
         * characters moving towards the end of the string.
         */
        if (!isLastCharacter) {
            node.add(text, index + 1);
        }
        
    }
}

//-----------------------------------------------------------------------------
// Trie Class
//-----------------------------------------------------------------------------

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const root = Symbol("root");

/**
 * A trie implementation in JavaScript.
 * @class Trie
 */
class Trie {

    /**
     * Creates a new instance of Trie.
     */
    constructor() {

        /**
         * The root node of the Trie. While this uses a `TrieNode`,
         * the node doesn't represent any character (`character` is
         * `null`) because all words are formed off of this node. We could
         * just use a `Map` here, but in the traditional implementation
         * of a trie the root is always another node, so that's what this
         * implementation uses.
         * @property root
         * @type TrieNode
         * @private
         */
        this[root] = new TrieNode();
    }
    
    /**
     * Adds a word to the trie..
     * @param {string} word The word to add into the trie.
     * @returns {void}
     */
    add(word) {
        this[root].add(word.toLowerCase());
    }

    isPrefix(prefix) {
        let found = false;
        let node = this[root];

        for (let i = 0, length = prefix.length; i < length && !found; i++) {
            let character = prefix.charAt(i);
            if (node.children.has(character)) {
                node = node.children.get(character);
            } else {
                break;
            } 
        }

        return found;

    }

    /**
     * Returns the number of values in the heap.
     * @returns {int} The number of values in the heap.
     */
    get size() {
        // return this[array].length;
    }

    /**
     * Determines if the given word exists in the trie.
     * @param {string} word The word to search for.
     * @returns {boolean} True if the word exists in the heap, false if not.
     */
    includes(word) {
    }

    /**
     * Removes all values from the trie.
     * @returns {void}
     */
    clear() {
        this[root] = new TrieNode();
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

        function *traverse(node) {
            for (const [key, value] of node.children) {
                yield key;
                yield* traverse(value);
            }
        }

        yield* traverse(this[root]);

    }
        
    /**
     * Converts the heap into a string representation.
     * @returns {String} A string representation of the heap.
     */
    toString(){
        return [...this].toString();
    }
}

exports.Trie = Trie;