/* factorial(n)
by Zakaria SMAHI <zakaria08esi@gmail.com>

created on august 29th,2013 at 01:44 gmt 
calculate the factorial of a number

*/


 function Factorial(n) {
       return n > 1?n * Factorial(n-1):1;
    }
