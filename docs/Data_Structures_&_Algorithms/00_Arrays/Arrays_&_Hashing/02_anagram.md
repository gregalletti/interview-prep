---
title: "🟢 Is Anagram"
external_links:
    NeetCode: https://neetcode.io/problems/is-anagram
---
!!! note ""
    Given two strings `s` and `t`, return `true` if the two strings are anagrams of each other, otherwise return `false`.

    An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

    ### Examples

    | s | t | Output |
    | --- | --- | --- |
    | `"racecar"` | `"carrace"` | `true` |
    | `"jar"` | `"jam"` | `false` |

    ### Constraints

    - `s` and `t` consist of lowercase English letters

## Analysis

Quick and easy, again based on frequencies.

My idea is slightly different from the official solution which uses 2 different hashmaps. We can simply use one single hashmap, count the frequencies of characters in the first string, and the subtract the ones from the second string. If there's a mismatch or frequency count is already 0, we immediately return False.

The time complexity is the same, but my solution fails earlier in some cases (without iterating the whole second string). Probably negligible, but still worth to mention.

## Solution

=== "Python"

        :::python
        class Solution:
            def isAnagram(self, s: str, t: str) -> bool:
                if len(s) != len(t):
                    return False
                freq = {}
                for c in s:
                    freq[c] = freq.get(c, 0) + 1
                for c in t:
                    if c not in freq:
                        return False
                    else:
                        if freq[c] == 0:
                            return False
                        freq[c] -= 1
                return True

=== "Java"

        :::java
        class Solution {
            public boolean isAnagram(String s, String t) {
                if (s.length() != t.length())
                    return false;
                Map<Character, Integer> freq = new HashMap<>();
                for (int i = 0; i < s.length(); i++) {
                    freq.put(s.charAt(i), freq.getOrDefault(s.charAt(i), 0) + 1);
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

### Complexity

- **Time**: $O(n + m)$ _as we iterate once through the 2 strings_
- **Space**: $O(1)$ _as we are storing at most all the English characters in the hashmap, hence 26_

!!! note ""
    where $n$ and $m$ are the lengths of the two input strings
