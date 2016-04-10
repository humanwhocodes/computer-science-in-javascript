module.exports =  function(){
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
    /*var tree = new BinarySearchTree();
    beforeEach(function () {
        tree = new BinarySearchTree();
        tree.add(5);
        tree.add(10);
        tree.add(6);
    });*/

    describe('testRemoveFirstItem', function () {
        var tree = new BinarySearchTree();
        tree.add(5);
        tree.add(10);
        tree.add(6);

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
        var tree = new BinarySearchTree();
        tree.add(5);
        tree.add(10);
        tree.add(6);

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
        var tree = new BinarySearchTree();
        tree.add(5);
        tree.add(10);
        tree.add(6);

        tree.remove(10);

        it('Should only have two items left.', function () {
            expect(tree.size()).to.equal(2);
        });

        it('Should NOT contain 10', function () {
            expect(tree.contains(10)).to.equal(false);
        });
    });

    describe('testRemoveLastItem', function () {
        var tree = new BinarySearchTree();
        tree.add(5);
        tree.add(10);
        tree.add(6);

        tree.remove(6);

        it('should only have two items left.', function () {
            expect(tree.size()).to.equal(2)
        });

        it('Should NOT contain 6', function () {
            expect(tree.contains(6)).to.equal(false);
        });
    });

    describe('testRemoveLastAll', function () {
        var tree = new BinarySearchTree();
        tree.add(5);
        tree.add(10);
        tree.add(6);

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


//-------------------------------------------------------------------------
// Test Case for converting to an array
//-------------------------------------------------------------------------

describe('Test Case for converting to an array', function () {
    describe('testToArrayForEmptyList:', function () {
        var tree = new BinarySearchTree();
        var value = tree.toArray();

        it('Should be an array.', function () {
            expect(value).to.be.an('array');
        });

        it('Should be empty.', function () {
            expect(value.length).to.equal(0);
        });
    });

    describe('testToArrayForOneItemList:', function () {
        var tree = new BinarySearchTree();

        tree.add(5);
        var value = tree.toArray();

        it('Should be an array.', function () {
            expect(value).to.be.an('array');
        });

        it('Should have 1 item.', function () {
            expect(value.length).to.equal(1);
        });

        it('Should have 5 as the only item.', function () {
            expect(value[0]).to.equal(5);
        });
    });

    describe('testToArrayForTwoItemList:', function () {
        var tree = new BinarySearchTree();

        tree.add(5);
        tree.add(10);
        var value = tree.toArray();

        it('Should be an array.', function () {
            expect(value).to.be.an('array');
        });

        it('Should have 2 items.', function () {
            expect(value.length).to.equal(2);
        });

        it('Should have 5 as the first item.', function () {
            expect(value[0]).to.equal(5);
        });

        it('Should have 10 as the second item.', function () {
            expect(value[1]).to.equal(10);
        });
    });

    describe('testToArrayForMultipleItems:', function () {
        var tree = new BinarySearchTree();

        tree.add(55);
        tree.add(10);
        tree.add(29);
        tree.add(40);
        tree.add(10);
        tree.add(5);
        tree.add(16);
        tree.add(25);

        var value = tree.toArray();

        it('Should be an array.', function () {
            expect(value).to.be.an('array');
        });

        it('Should have 7 items.', function () {
            expect(value.length).to.equal(7);
        });

        value.forEach(function (node) {
            it('Should contain ' + node, function () {
                expect(node).to.be.oneOf(value);
            });
        });
    });
});

}