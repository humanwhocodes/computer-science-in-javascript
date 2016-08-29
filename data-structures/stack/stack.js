/**
 *  Stack implementation in JavaScript
 *  Copyright (c) 2016 Ariyan Khan
 */

var Stack = function () {};

(function () {
    var thisHolder = [];
    var valPointerHolder = [];

    Stack.prototype.push = function (elem) {
        var index = thisHolder.indexOf(this);
        if (index == -1) {
            thisHolder.push(this);
            valPointerHolder.push([]);
            index = thisHolder.length - 1;
        }
        return valPointerHolder[index].push(elem);
    };
    Stack.prototype.pop = function () {
        var index = thisHolder.indexOf(this);
        if (index == -1) {
            thisHolder.push(this);
            valPointerHolder.push([]);
            index = thisHolder.length - 1;
        }
        return valPointerHolder[index].pop();
    };
    Object.defineProperty(Stack.prototype, "size", {
        set : undefined,
        get : function () {
            var index = thisHolder.indexOf(this);
            if (index == -1) {
                thisHolder.push(this);
                valPointerHolder.push([]);
                index = thisHolder.length - 1;
            }
            return valPointerHolder[index].length;
        }
    });

})();
