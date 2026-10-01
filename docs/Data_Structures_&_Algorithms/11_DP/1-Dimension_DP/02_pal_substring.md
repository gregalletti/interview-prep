---
title: "🟠 Palindromic Substrings "
external_links:
    NeetCode: https://neetcode.io/problems/palindromic-substrings
---
!!! note ""
    Given a string `s`, return the number of substrings within `s` that are palindromes.

    <span/>

    A palindrome is a string that reads the same forward and backward.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

Every single character is trivially a palindrome. The brute-force takes every substring and checks if it's a palindrome, but costs $O(n^2)$ to derive substrings, each checked in $O(n)$, for $O(n^3)$ overall. The question is what can be reused from smaller substrings to avoid redoing that work.

Split a string into two halves and ask: is each half a palindrome, and are the halves equal?
 
- `"a" + "b"`: both palindromes, `a != b` → false. Correct.
- `"a" + "a"`: both palindromes, `a == a` → true. Correct.
- `"aba" + "aba"`: both palindromes, equal → true. Correct.
- `"aba" + "cd"`: `cd` is not a palindrome → false. Correct.

But this is wrong, it breaks:
 
- `"ab" + "ba"`: neither half is a palindrome, and they're not equal - but `"abba"` **is** a palindrome.

The halves don't need to be equal, they need to be reverses of each other - and "both are palindromes" doesn't capture that. Fixing it this way means tracking three outcomes per pair (equal, reversed, neither) instead of one. Wrong direction.
 
Let's now try growing one character at a time instead, reusing the previous substring's answer:
 
- `a`: true
- `ab = a + b`: `a != b` → false
- `abc = ab + c`: `a != c` → false
- ...
- `cd = c + d`: `c != d` → false
- `cdc = cd + c`: `cd` is not a palindrome, `c == c` → true (right answer, wrong reasoning)
- `cdcc = cdc + c`: `cdc` is a palindrome, `c == c` → true - but `cdcc` is **not** a palindrome.

The previous substring plus one new character doesn't tell you anything about whether the *whole* thing is symmetric. This approach is reusing the wrong substring.
  
Let's analyze on a higher leve, and define this: a string is a palindrome when:
 
- the first and last characters match, **and**
- everything between them is a palindrome

Checked against the same examples:
 
- `cdc`: first/last (`c`, `c`) match, inner `d` is a palindrome → `cdc` is a palindrome.
- `cdcc`: first/last (`c`, `c`) match, inner `dc` is **not** a palindrome (`d != c`) → `cdcc` is not a palindrome.

That's correct now because it's checking the right pair - the characters actually at the ends, against the substring actually between them.

But there's still one problem: for this to be optimal we need to have `dc` computed already. how do we make sure of that? In this case it won't be, since `dc` substring would be analyzed later.
  
We can process substrings in order of increasing length. Every substring of length `L` only depends on a substring of length `L - 2`, so by the time length `L` is reached, everything it needs is already filled in.

I kept the thought raw thought process in the below code because why not.

## Solution

=== "Python"

        :::python
        class Solution:
            def countSubstrings(self, s: str) -> int:
                '''
                abcdc -> a,b,c,d,c,cdc
                we know every single char is a palindromic substring

                bruteforce is to take every possible substring and check isPalindrome n^2 for substring, for each then n to check = n^3

                question is what can we reuse? we know we have a starting point: each single char

                let's take "ab", what can we say about this?
                a + b : a is palindrome, b is palindrome, a != b -> false
                a + a : a is palindrome, b is palindrome, a == b -> true

                aba + aba : aba is palindrome, b is palindrome, aba == aba -> true
                aba + bab : aba is palindrome, bab is palindrome aba != bab -> false

                aba + cd : aba is palindrome, cd is not -> false

                BUT: 
                ab + ba : ab is not, ba is not, ab != ba -> BUT IT'S TRUE, mhhhhh

                abcde + edbca : same

                so they're different, but one is the reversed of the other
                -> if they're completely different, we are sure the combination is not pal
                -> if they're equal and palindrome, we are sure the combination is pal
                -> if they're different but reversed, we are sure the combination is pal

                how do we check all substrings? let's try normal way

                a, ab, abc, abcd, abcdc
                and the others...

                a : true
                ab = a + b = a != b: false
                abc = ab + c : a != c : false
                ...
                cd = c + d : c != d : false
                cdc = cd + c : false + true and c == c 
                cdcc = cdc + c : true + true and c == c BUT it's false

                doesn't work. we're looking at the wrong substrings and the previous val do not give us the answer.

                for a string to be pal we need:
                    - first and last char to match
                    - the remaining to be pal
                    - example 1: abcd + a: a == a, bcd is false -> false
                    - example 2: abcb + a: a == a, bcb is true -> true

                so let's redo:
                a : true
                ab : a != b -> false
                abc: a != c -> false
                ...
                cd : c != d -> false
                cdc : c == c, d is true -> true
                cdcc : c == c, dc is false -> false

                but another problem, for this to be optimal we need to have "dc" computed already. how do we make sure of that?
                in this case it won't be, since dc substring would be analyzed later

                if we analyze substrings of len 1, then 2, then 3, etc we know we have computed all the ones we need

                n^2 to go through all substrings and then if we do O(1) check for each we're good

                '''

                ans = 0
                n = len(s)
                dp = [[False] * n for _ in range(n)]

                for l in range(1, len(s) + 1):
                    for i in range(len(s) - l + 1):
                        j = i + l - 1
                        if l == 1:
                            dp[i][j] = True
                            ans += 1
                        elif s[i] == s[j] and (l == 2 or dp[i+1][j-1]):
                            dp[i][j] = True
                            ans += 1
                return ans


=== "Java"

        :::java

## Complexity

- **Time**: $O(n^2)$ _as we analyze substrings with two nested loops $O(n)$ each, and inside we check if palindrome in $O(1)$_
- **Space**: $O(n^2)$ _as we store a dp matrix of $n \cdot m$_

!!! note ""
    where $n$ is the length of the input string `s`

## Key Takeaways
