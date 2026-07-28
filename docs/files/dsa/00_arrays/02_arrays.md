---
hide:
  - toc
---
# [Is Anagram](https://neetcode.io/problems/is-anagram/solution)

!!! note ""
    Given two strings `s` and `t`, return `true` if the two strings are anagrams of each other, otherwise return `false`.

    An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

    ### Examples

    | Example | s | t | Output |
    | --- | --- | --- | --- |
    | 1 | `"racecar"` | `"carrace"` | `true` |
    | 2 | `"jar"` | `"jam"` | `false` |

    ### Constraints

    - s and t consist of lowercase English letters

## Analysis

## Solution
=== "Python"

    ```python
    class Solution:
        def isAnagram(self, s: str, t: str) -> bool:
            if len(s) != len(t):
                return False
            freq = {}
            for c in s:
                if c not in freq:
                    freq[c] = 1
                else:
                    freq[c] += 1
            for c in t:
                if c not in freq:
                    return False
                else:
                    if freq[c] == 0:
                        return False
                    freq[c] -= 1
            return True
    ```

=== "Java"

    ```java
    class Solution {
        public boolean isAnagram(String s, String t) {
            if (s.length() != t.length())
                return false;
            Map<Character, Integer> freq = new HashMap<>();
            for (int i = 0; i < s.length(); i++) {
                if (!freq.containsKey(s.charAt(i))) {
                    freq.put(s.charAt(i), 1);
                } else {
                    freq.put(s.charAt(i), freq.get(s.charAt(i)) + 1);
                }
            }
            for (int i = 0; i < t.length(); i++) {
                if (!freq.containsKey(t.charAt(i))) {
                    return false;
                } else {
                    if (freq.get(t.charAt(i)) == 0)
                        return false;
                    freq.put(t.charAt(i), freq.get(t.charAt(i)) - 1);
                }
            }
            return true;
        }
    }
    ```

### Complexity
- Time Complexity: $O(n + m)$ _as we iterate once through the 2 strings_
- Space Complexity: $O(1)$ _as we are storing at most all the English characters in the hashmap, hence 26_

!!! info ""
    where $n$ and $m$ are the lengths of the input strings

## TODO
- Optimize Python solution using `Counter` from collections instead of manual dictionary
- Optimize Java solution using `getOrDefault()` and `merge()` instead of manual if checks
- Add Analysis section explaining the frequency counting approach
- Consider edge cases: empty strings, single character strings
