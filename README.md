### String compression backend. 
The backend has been implemented using Node.js 

Libraries and Plugins used:
* Express Js

The api endpoint is 
* https://ttt-compress.herokuapp.com/encode?input=aaabbbc (to encode the string)
* https://ttt-compress.herokuapp.com/decode?input=a3b3c (to decode the string)

Logic: 
* The Run length encoding algorithm has been used for the lossless compression of the string. 
* In this algorithm, a continous sequence of same characters is replaced by the character and its frequency. 
* For example, the string aaaaabbbccdd is encoded as a5b3c2d2. 
* To optimize this algorithm further, in cases when the the frequency of a particular character is 1, only the character is taken and not the count. 
* For example, the string aaaaabcc is encoded as a5bc2 and not a5b1c2. 

Reason for selecting this algorithm over LZW: 
* Although LZW is a better algorithm for lossless string compression, I used Run Length encoding because in LZW we are required to send the table of characters that we mapped our indexes to. 
* For example, using LZW algorithm the string ababbabcababba would be encoded as 124523461. This is shorter than what we would have got, if we used Run length encoding. 
* However, when we have to decode this encoded string, we require a table which indicates which index represents which character(1 represents a, 2 represents b and so on, in this case.). 
* We require the table because efeffefgefeffe will also we encoded as 124523461. Hence we require the table to understand the mapping of indexes to the characters. 
* Since, sending the table isn't feasible in this use case, Run length encoding was preffered. 

For the encode API, the output will be in this format: 

![Image for input = aaabbbc](https://dl.dropbox.com/s/4y9ezpdt2sfjtof/pic1.JPG?dl=0)


For the decode API, the output will be in this format: 

![Image for input = a3b3c](https://dl.dropbox.com/s/kqcx11g3q7kt6iq/pic2.JPG?dl=0)

The following test cases were considered: 
* Input has all characters with each segment having freq > 2

* Input has atleast one character with segment having freq = 1







