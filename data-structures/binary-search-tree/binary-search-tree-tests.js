var chai = require('chai');
var expect = chai.expect;
var BinarySearchTree = require('./binary-search-tree');


//-------------------------------------------------------------------------
// Test Case for adding
//-------------------------------------------------------------------------
    
    
describe('BinarySearchTree Test Case for adding', function () {
    var tree = new BinarySearchTree();

   //TODO:
   /* beforeEach(function () {
        if(tree){
            tree = new BinarySearchTree();
        }
    });*/

    describe('Case AddSingle:', function () {
        var tree = new BinarySearchTree();
        tree.add(5);

        it('Tree should have one item.', function () {
            expect(tree.size()).to.equal(1);
        });

        it('First item should have value of 5.', function () {
            expect(tree._root.value).to.equal(5);
        });
    });

    describe('Case AddMultiple:', function () {
        var tree = new BinarySearchTree();
        tree.add(5);
        tree.add(10);

        it('Tree should have two items.', function () {
            expect(tree.size()).to.equal(2);
        });

        it('First item should have value of 5.', function () {
            expect(tree._root.value).to.equal(5);
        });
    });

    describe('Case AddDuplicates:', function () {
        var tree = new BinarySearchTree();
        tree.add(5);
        tree.add(5);

        it('Tree should have one item.', function () {
            expect(tree.size()).to.equal(1);
        });

        it('First item should have value of 5.', function () {
            expect(tree._root.value).to.equal(5);
        })
    });
});