/*
Plan for (1):
1. iterate through passed in string.
2. for every 's', increment a counter by 1.
3. return the counter's value.

Notes: Not sure whether this is case sensitive. Normally, I would ask, but for the sake of time, I think it would be okay to just write both.

*/

function howMany(str, target) {
  var counter = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === target) {
      counter += 1;
    }
  }

  return counter;
}

// howMany('text', 't') => 2


/*
Plan for (2):
1. Create a checkPalindrome helper function that takes in a string and returns true or false based on whether the string is a palindrome.
2. Iterate from all numbers from 1 to less than 100,000,000 and if the number is a palindrome in base 10 and base 2, then add it to a tracking total.

Notes: I would ask if I can assume no floats and negative numbers normally.
*/

// Uses extra space, but more readable. I would use a for-loop if space was an issue.
function checkPalindrome(str) {
 return str === str.split('').reverse().join('');
}

function sumPalindromes(upper) {
  var sum = 0;
  for (var i = 1; i < upper; i++) {
    if (checkPalindrome(i.toString(2)) && checkPalindrome(i.toString())) {
      sum += i;
    }
  }
  return sum;
}

// sumPalindromes(100,000,000)


/*
Plan for (3):
1. Create helper functions that checks if a number has exactly 2 prime factors.
2. Iterate from 2 to less than 100,000 and check if any of those numbers are the composites we are looking for
3. If they are, increment the counter.
4. return our counter value.
*/

function isPrime(num) {
  var stop = Math.sqrt(num);
  if (num < 2) {
    return false;
  }
  
  for (var i = 2; i <= stop; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function findPrimeFactors(num) {
  var primeFactors = [];
  var factor = 2;
  while (num > 1 && factor <= num) {
    if (isPrime(factor) && num % factor === 0) {
      primeFactors.push(factor);
      num = num / factor;
      factor = 2;
      
    } else {
      factor += 1;
    }
  }
  return primeFactors;
}
// need to fix bug in the above function.


function twoPrimeFactors(num) {
  return findPrimeFactors(num).length === 2;
}

function findComposites(upper) {
  var counter = 0;
  for (var i = 2; i < upper; i++) {
    if (twoPrimeFactors(i)) {
      counter += 1;
    }
  }
  return counter;
}



