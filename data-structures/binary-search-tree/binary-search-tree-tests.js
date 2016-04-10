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


//-------------------------------------------------------------------------
// Test Case for contains()
//-------------------------------------------------------------------------

describe('BinarySearchTree Test Case for contains()', function () {
    describe('Tree', function () {
        var tree = new BinarySearchTree();
        tree.add(5);

        it('should contain 5', function () {
            expect(tree.contains(5)).to.equal(true);
        });

        it('should NOT contain 10', function () {
            expect(tree.contains(10)).to.equal(false);
        });
    })
});


//-------------------------------------------------------------------------
// Test Case for removing values
//-------------------------------------------------------------------------
    
describe(' Test Case for removing values', function () {
    var tree = new BinarySearchTree();
    beforeEach(function () {
        tree = new BinarySearchTree();
        tree.add(5);
        tree.add(10);
        tree.add(6);
    });
    
    describe('testRemoveFirstItem', function () {
        tree.remove(5);

        it('Should only have two items left.', function () {
            expect(tree.size()).to.equal(2)
        });

        it('Should now have 10 as root value.', function () {
            expect(tree._root.value).to.equal(10)
        });

        it('Should NOT contain 5', function () {
            expect(tree.contains(5)).to.equal(false);
        });
    });

    describe('testRemoveFirstItemToo', function () {
        tree.remove(10);
        tree.remove(5);

        it('Should only have one item left.', function () {
            expect(tree.size()).to.equal(1)
        });

        it('Should now have 6 as root value', function () {
            expect(tree._root.value).to.equal(6)
        });

        it('Should NOT contain 5', function () {
            expect(tree.contains(5)).to.equal(false)
        });

        it('Should NOT contain 10', function () {
            expect(tree.contains(10)).to.equal(false)
        });
    });

    describe('testRemoveMiddleItem', function () {
        tree.remove(10);

        it('Should only have two items left.', function () {
            expect(tree.size()).to.equal(2);
        });

        it('Should NOT contain 10', function () {
            expect(tree.contains(10)).to.equal(false);
        });
    });

    describe('testRemoveLastItem', function () {
        tree.remove(6);

        it('should only have two items left.', function () {
            expect(tree.size()).to.equal(2)
        });

        it('Should NOT contain 6', function () {
            expect(tree.conatins(6)).to.equal(false);
        });
    });

    describe('testRemoveLastAll', function () {
        tree.remove(6);
        tree.remove(5);
        tree.remove(10);

        it('Should have NO item left.', function () {
            expect(tree.size()).to.equal(0);
        });

        it('Should NOT contain 6', function () {
            expect(tree.contains(6)).to.equal(false);
        });

        it('Should NOT contain 5', function () {
            expect(tree.contains(5)).to.equal(false);
        });

        it('Should NOT contain 10', function () {
            expect(tree.contains(10)).to.equal(false);
        });
    });

});