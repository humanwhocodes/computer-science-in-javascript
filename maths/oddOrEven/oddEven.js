/* Created by SMAHI Zakaria <zakaria08esi@gmail.com>

in August 29th, 2013 at 00:30 GMT
test if a number is odd or even 

*/


function even(number){
number=parseInt(number);
return ((number &amp; 1)=='0')?true:false;
}

