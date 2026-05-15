# [Valid Palindrome](https://neetcode.io/problems/is-palindrome/question?list=neetcode150)

## Statement

!!! note ""
    Given a string `s`, return `true` if it is a palindrome, otherwise return `false`.

    A palindrome reads the same forward and backward. This check is case-insensitive and ignores all non-alphanumeric characters.

    Note: alphanumeric characters consist of letters (`A-Z`, `a-z`) and numbers (`0-9`).

    ### Examples

    | Example | Input | Output | Explanation |
    | --- | --- | --- | --- |
    | 1 | `s = "Was it a car or a cat I saw?"` | `true` | After filtering to `wasitacaroracatisaw`, the string is a palindrome. |
    | 2 | `s = "tab a cat"` | `false` | After filtering to `tabacat`, the string is not a palindrome. |

    ### Constraints

    - `1 <= s.length <= 1000`
    - `s` consists only of printable ASCII characters.

## Analysis
I didn't even think about the naive solution this time, but worth mentioning. It would consist in cleaning the original string and then creating an extra (reversed) string and comparing them. However, this would come with extra space.

This is a simple example of two pointers and it's difficult not to think about this pattern immediately. It's clear we have to check if the start of the string is the same as the end, and so on. 

Just use one start/left pointer and one end/right pointer and move them accordingly. If chars are not alphanumeric we skip them _but we need to make sure to check if left and right pointers are still, respectively, left and right_.

## Solution
=== "Python"

    ```python
    class Solution:
        def isPalindrome(self, s: str) -> bool:
            left, right = 0, len(s) - 1

            while left < right:
                while left < right and not s[left].isalnum():
                    left += 1
                while left < right and not s[right].isalnum():
                    right -= 1

                if s[left].lower() != s[right].lower():
                    return False

                left += 1
                right -= 1

            return True
    ```

=== "Java"

    ```java
    class Solution {
        private boolean isAlphanumeric(Character c) {
            return (c >= 'A' && c <= 'Z' ||
                    c >= 'a' && c <= 'z' ||
                    c >= '0' && c <= '9');
        }

        public boolean isPalindrome(String s) {
            int left = 0;
            int right = s.length() - 1;

            while (left < right) {
                while (left < right && !isAlphanumeric(s.charAt(left))) {
                    left++;
                }
                while (right > left && !isAlphanumeric(s.charAt(right))) {
                    right--;
                }
                if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                    return false;
                }
                left++;
                right--;
                
            }
            return true;
        }
    }
    ```

### Complexity
$O(n)$ time complexity as we iterate the string once ("half" from left and "half" from right)

$O(1)$ space complexity as we are not storing anything
