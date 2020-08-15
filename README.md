### String compression backend. 
The backend has been implemented using Node.js 

Libraries and Plugins used:
* Express Js

The api endpoint is 
* https://ttt-compress.herokuapp.com/encode?input=aaabbbc (to encode the string)
* https://ttt-compress.herokuapp.com/decode?input=a3b3c (tp decode the string)

Logic: 
* The Run length encoding algorithm has been used for the loseless compression of the string. 
* In this algorithm, a continous sequence of same characters is replaced by the character and its frequency. 
* For example, the string aaaaabbbccdd is encoded as a5b3c2d2. 
* To optimize this algorithm further, in cases when the the frequency of a particular character is 1, only the character is taken and not the count. 
* For example, the string aaaaabcc is encoded as a5bc2 and not a5b1c2. 

Reason for selecting this algorithm: 


For the encode API, the output will be in this format: 

![Image for input = aaabbbc](https://dl.dropbox.com/s/4y9ezpdt2sfjtof/pic1.JPG?dl=0)


For the decode API, the output will be in this format: 

![Image for input = a3b3c](https://dl.dropbox.com/s/kqcx11g3q7kt6iq/pic2.JPG?dl=0)



