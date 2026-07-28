---
hide:
  - toc
---
# [Valid Parentheses](https://neetcode.io/problems/valid-parentheses)

!!! note ""
    You are given a string `s` consisting of the following characters: `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`.

    The input string `s` is valid if and only if:

    - Every open bracket is closed by the same type of close bracket.
    - Open brackets are closed in the correct order.
    - Every close bracket has a corresponding open bracket of the same type.
    Return true if `s` is a valid string, and false otherwise.

    ### Examples

    | Example | Input | Output | Explanation |
    | --- | --- | --- | --- |
    | 1 | `"[]"` | `true` | The brackets are closed in the correct order. |
    | 2 | `"([{}])"` | `true` | The brackets are closed in the correct order. |
    | 3 | `"[(])"` | `false` | The brackets are not closed in the correct order. |  

    ### Constraints
    - `1 <= s.length <= 1000`

## Analysis
Not much to say here, it's the classic textbook stack problem. We can use a stack to keep track of the opening brackets, and when we encounter a closing bracket, we check if it matches the last opening bracket in the stack. If it does, we pop the opening bracket from the stack; if it doesn't, we return false. At the end, if the stack is empty, it means all brackets were matched correctly, and we return true.

## Solution
=== "Python"

    ```python
    class Solution:
        def isValid(self, s: str) -> bool:
            pars = {
                '(': ')',
                '[': ']',
                '{': '}',
            }

            stack = []
            for c in s:
                if c in pars:
                    stack.append(c)
                else:
                    if not stack:
                        return False
                    opened = stack.pop()
                    if pars[opened] != c:
                        return False
            return True if not stack else False
    ```

=== "Java"

    ```java
    class Solution {
        public boolean isValid(String s) {
            Map<Character, Character> pars = new HashMap<>();
            pars.put('(', ')');
            pars.put('[', ']');
            pars.put('{', '}');

            Stack<Character> stack = new Stack<>();

            for (char c: s.toCharArray()) {
                if (pars.containsKey(c)) {
                    stack.push(c);
                } else {
                    if (stack.isEmpty()) {
                        return false;
                    }
                    char opened = stack.pop();
                    if (pars.get(opened) != c) {
                        return false;
                    }
                }
            }
            return stack.isEmpty();
        }
    }
    ```

### Complexity
- Time Complexity: $O(n)$ _as we iterate through the string once_
- Space Complexity: $O(n)$ _as we store opening brackets in the stack (in the worst case, all characters are opening brackets)_

!!! info ""
    where $n$ is the length of the input string