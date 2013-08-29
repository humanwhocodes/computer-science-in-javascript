/* Created by SMAHI Zakaria <zakaria08esi@gmail.com>

in August 29th, 2013 at 02:02 GMT
test if a number is prime or not

*/

function prime(n) {
isPrime = new Boolean(true);
for(j=2;j<n;j++)
   {
     if(n%j==0) isPrime=false; 
   }
return isPrime;
}

