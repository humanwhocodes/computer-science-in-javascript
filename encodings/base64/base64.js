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
 * Accepts an array of bits and pads with zeros to the left up to a certain
 * length.
 * @param {Array} bits An array of bits (strings either "0" or "1").
 * @param {int} length The length that the array of bits should be.
 * @return {Array} The array of bits.
 */
function padLeft(bits, length){
    while (bits.length < length){
        bits.unshift("0");
    }        
    return bits;
}

/**
 * Accepts an array of bits and pads with zeros to the right up to a certain
 * length.
 * @param {Array} bits An array of bits (strings either "0" or "1").
 * @param {int} length The length that the array of bits should be.
 * @return {Array} The array of bits.
 */
function padRight(bits, length){
    while (bits.length < length){
        bits.push("0");
    }        
    return bits;        
}
 
 
/**
 * Base64-encodes a string of text.
 * @param {String} text The text to encode.
 * @return {String} The base64-encoded string.
 */
function base64Encode(text){

    //local variables
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        part, index,
        i=0, j=0,
        padding="",
        quantaCount,
        bits = [],
        result = [];
        
    //verify that there are no characters out of range
    if (/([^\u0000-\u00ff])/.test(text)){
        throw new Error("Can't base64 encode non-ASCII characters.");
    }
    
    //create an array of binary digits representing the text
    while(i < text.length){
        part = text.charCodeAt(i).toString(2);
        bits = bits.concat(padLeft(part.split(""), 8));
        i++;
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
                result.push(digits.charAt(index));
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

/**
 * Base64-decodes a string of text.
 * @param {String} text The text to decode.
 * @return {String} The base64-decoded string.
 */
function base64Decode(text){

    //local variables
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        part, code,
        i=0, j=0,
        padCount=0,
        bits = [],
        result = [];
        
    //first check for any unexpected input
    if(!(/^[a-z0-9\+\/\s]+\={0,2}$/i.test(text))){
        throw new Error("Not a base64-encode string.");
    }
    
    //remove any whitespace
    text = text.replace(/\s/g, "");
    
    //determine if there's any padding
    while(text.charAt(text.length-1) == "="){
    
        //increment pad count
        padCount += 2;
        
        //remove last character and try again
        text = text.substr(0, text.length-1);
    }    
    
    //create an array of binary digits representing the text
    while (i < text.length){
        part = digits.indexOf(text.charAt(i)).toString(2);
        bits = bits.concat(padLeft(part.split(""), 6));
        i++;
    }

    //remove padding
    bits = bits.slice(0, bits.length - padCount);

    //transform what remains back into characters
    while(bits.length){
        part = bits.splice(0, 8).join("");
        result.push(String.fromCharCode(parseInt(part, 2)));
    }
    
    //return a string
    return result.join("");

}