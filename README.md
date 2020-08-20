### String compression backend. 
The backend has been implemented using Node.js 

Libraries and Plugins used:
* Express Js

The api endpoint is 
* https://ttt-compress.herokuapp.com/encode?input=helloworld (to encode the string)
* https://ttt-compress.herokuapp.com/decode?input=a0lYPQGSa (to decode the string)

Logic for encoding: 
* Since the input string only consists of lowercase letters. We can assume that each character represents a number between 1 to 26. 0 represents 0. 
* We call this a base27 string. 
* The input string is first converted from base27 to base10(decimal).
* It was observed that the more we increase the radix, the shorter the representation of the same number becomes in that radix. 
* Hence a radix of 53 was chosen [a-zA-Z] represents (1 to 52). 0 represents 0. 
* We convert base10 to base53.
* This is our encoded string. 

Logic for decoding: 
* The input string will be in base53. 
* We convert base53 to base10.  
* Then we convert base10 to base27(our original string is obtained.)

Functions: 
* basex_to_base10 - to convert a string from any base(x) to decimal(base10) given the character set for that number system and x. 
* base10_to_basex - to convert a string from base10 to basex given the character set for that number system and x.

Limitation: 
* Since it deals with big radix like 27 and 53. It will only work for considerably small strings (~length 11)

For the encode API, the output will be in this format: 

![Image for input = helloworld](https://dl.dropbox.com/s/lztm47zrkpc28yb/pic8.JPG?dl=0)

For the decode API, the output will be in this format: 

![Image for input = helloworld](https://dl.dropbox.com/s/10j4d8xzti45ehx/pic9.JPG?dl=0)









