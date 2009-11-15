/*
 * Base 64 implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas. All rights reserved.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
/**
 * Base64-encodes a string of text.
 * @param {String} text The text to encode
 * @return {String} The base64-encoded string.
 */
function base64Encode(text){

    //helper function to left-pad an array with zeros
    function padLeft(bits, length){
        while (bits.length < length){
            bits.unshift("0");
        }        
        return bits;
    }
    
    //helper function to right-pad an array with zeros
    function padRight(bits, length){
        while (bits.length < length){
            bits.push("0");
        }        
        return bits;        
    }

    //local variables
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        part, index,
        i=0, j=0,
        padding="",
        quantaCount,
        bits = [],
        result = [];
    
    //create an array of binary digits representing the text
    for (; i < text.length; i++){
        part = text.charCodeAt(i).toString(2);
        bits = bits.concat(padLeft(part.split(""), 8));
    }

    //figure out how many 24-bit quanta are in the array
    quantaCount = Math.floor(bits.length / 24);
   
    //encode all bits
    encodeBits: while(true){
    
        //must encode one complete quanta at a time
        for(i=0; i < quantaCount; i++){
            for (j=0; j < 4; j++){
                part = bits.splice(0, 6).join("");
                index = parseInt(part,2);
                result.push(digits[index]);
            }
        }
                
        //take care of any extra bits
        switch(bits.length){
            case 8:
                padRight(bits, 12);
                padding = "==";
                continue encodeBits;
            case 16:
                padRight(bits, 18);
                padding = "=";
                continue encodeBits;
            default:
                break encodeBits;
        }
    }
    
    //add any padding to the result
    result.push(padding);
    
    //return a string
    return result.join("");

}