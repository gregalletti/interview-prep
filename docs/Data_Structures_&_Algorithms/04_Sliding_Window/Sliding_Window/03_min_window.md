---
title: "🔴 Min Window Substring"
external_links:
    NeetCode: https://neetcode.io/problems/minimum-window-with-characters
---
!!! note ""
    Given two strings `s` and `t`, return the shortest substring of `s` such that every character in `t`, including duplicates, is present in the substring. If such a substring does not exist, return an empty string "".

    You may assume that the correct output is always unique.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    | `s = "OUZODYXAZV"`, `t = "XYZ"` | `"YXAZ"` | "YXAZ" is the shortest substring that includes "X", "Y", and "Z" from string t |
    | `s = "xyz"`, `t = "xyz"` | `"xyz"` | The two strings are identical |

    ### Constraints
    - `1 <= s.length <= 100,000`
    - `1 <= t.length <= 100,000`
    - `s` and `t` consist of uppercase and lowercase English letters

## Analysis

### Base Algorithm

Let's first work on an algorithm and see if this holds: we can start from `L = R = 0` and check if `s[L:R+1]` is valid. If not, expand the window by moving `R` to the right.

We'll eventually find a valid substring (save its value if it's shorter), and now we can start shrinking the window by moving `L` to the right as well. This is because we only know that the current window substring contains all needed characters, but they might be all at the rightmost side.

Keep shrinking until the window is not valid anymore. This means we excluded some needed characters, and we need to include them again by expanding to the right as before. Keep repeating the process until we reach the end of the string `s`.

In this way we also include edge cases where there's no valid substring (no match and therefore no value saved) or the entire `s` is the substring (save its value at the last iteration).

We know that we'll have to compare frequencies, so let's think about complexity here: iterating through the string `t` is $O(m)$ time and storing the frequencies is $O(k)$ space. Good, we're on track.

This means that we need to iterate through string `s` at most once ($O(n)$ time) and that the "valid" check must be done in constant time.

> Actually, here's a more detailed time complexity of the worst case (substring is at the very end): let's take s="ABCDEFGXY" and t="XY": let's define $n$ as `len(s)`, we go from `L = 0, R = 0` to `L = 0, R = n - 1` and the substring is now valid, this means we performed $n$ checks. Then we shrink up until `L = R - 2, R = n - 1`, so we performed other $n - 2$ checks. At the end, this means we have a total of approximately $2 * n$ iterations, which we can rewrite as $O(2n)$ = $O(n)$.

### Check if the substring is valid

I was initially thinking about keeping one single hashmap for frequencies, adding 1 when iterating through `t` and subtracting 1 when iterating through `s` and checking if all the letters in `t` have frequency equal to 0, but when we shrink some entries might become 0 regardless. In that case, we would need to iterate through `t` again to check if we should care about those -> this is not constant time.

Let's go back to 2 separate hashmaps `freq_t` and `freq_s`. Every time we increase the window size and update `freq_s`, we can check if the character we just updated is present in `t` as well ($O(1)$). If yes, we can check if the frequency is the same ($O(1)$). But again, *how do we know when we have all the characters* without iterating on `t` again?

Every time we have a perfect match (as above), we can increase a counter `found`, representing how many `t` characters are represented in `s`. When `found == required`, we know the entire window substring is valid.

We just need to be careful when shrinking the window, we can't just update `freq_s` but we also need to check if the window is still valid by updating `found`. If the removed character is present in `t` and its frequency in `s` is now not enough, we decrease `found` by 1.

You can visualize an execution below:

    :::
    s: OUZODYXAZV, t: XYZ
    w: O
    w: OU
    w: OUZ
    w: OUZO
    w: OUZOD
    w: OUZODY
    w: OUZODYX
    matching, shrink
    w: UZODYX
    matching, shrink
    w: ZODYX
    matching, shrink
    w: ODYX
    w: ODYXA
    w: ODYXAZ
    matching, shrink
    w: DYXAZ
    matching, shrink
    w: YXAZ
    matching, shrink
    w: XAZ
    w: XAZV

You can see in the first Python solution below two comments containing ERRORS:

- `ERROR #1`: I initially set `required = len(t)` without thinking. I then realized that we only need to set the unique characters here `len(freq_t)`, since the check on the frequency is already done later
- `ERROR #2`: when shrinking the window I initially used `if freq_t[char] != freq_s[char]`. This is wrong since it might be that the current window contained **even more chars than what we need**, but it's still valid. We only need to reduce `found` when we have not enough chars in the window, hence `freq_s[char] < freq_t[char]`

## Solution

=== "Python"

        :::python
        class Solution:
            def minWindow(self, s: str, t: str) -> str:
                freq_s, freq_t = {}, {}
                ans = ("", float("infinity"))

                for char in t:
                    if char in freq_t:
                        freq_t[char] += 1
                    else:
                        freq_t[char] = 1
                
                # ERROR #1: found, required = 0, len(t)
                found, required = 0, len(freq_t)
                left = 0

                for right in range(len(s)):
                    # expand the window
                    char = s[right]
                    if char in freq_s:
                        freq_s[char] += 1
                    else:
                        freq_s[char] = 1
                    
                    if char in freq_t:
                        if freq_s[char] == freq_t[char]:
                            found += 1
                    
                    while found == required:
                        # match, check answer
                        if (right - left + 1) < ans[1]:
                            # new answer, save it
                            ans = (s[left:right+1], right - left + 1)
                        # now start shrinking the window
                        char = s[left]
                        freq_s[char] -= 1
                        if char in freq_t:
                            # ERROR #2: if freq_t[char] != freq_s[char]:
                            if freq_s[char] < freq_t[char]:
                                found -= 1
                        left += 1

                return ans[0]

=== "Python (improved)"

        :::python
        class Solution:
            def minWindow(self, s: str, t: str) -> str:
                freq_s, freq_t = {}, {}
                ans = ("", float("infinity"))

                for char in t:
                    freq_t[char] = freq_t.get(char, 0) + 1
                
                found, required = 0, len(freq_t)
                left = 0

                for right in range(len(s)):
                    # expand the window
                    char = s[right]
                    freq_s[char] = freq_s.get(char, 0) + 1
                    
                    if char in freq_t and freq_s[char] == freq_t[char]:
                            found += 1
                    
                    while found == required:
                        # match, check answer
                        if (right - left + 1) < ans[1]:
                            # new answer, save it
                            ans = (s[left:right+1], right - left + 1)
                        # now start shrinking the window
                        char = s[left]
                        freq_s[char] -= 1
                        if char in freq_t and freq_s[char] < freq_t[char]:
                                found -= 1
                        left += 1

                return ans[0]


=== "Java"

        :::java
        class Solution {
            public String minWindow(String s, String t) {
                Map<Character, Integer> freq_s = new HashMap<>();
                Map<Character, Integer> freq_t = new HashMap<>();
                Pair<String, Integer> ans = new Pair<>("", Integer.MAX_VALUE);

                for (char c : t.toCharArray()) {
                    freq_t.put(c, freq_t.getOrDefault(c, 0) + 1);
                }

                int found = 0, required = freq_t.size();
                int left = 0;

                for (int right = 0; right < s.length(); right++) {
                    char c = s.charAt(right);
                    freq_s.put(c, freq_s.getOrDefault(c, 0) + 1);

                    if (freq_t.containsKey(c) && freq_s.get(c).equals(freq_t.get(c))) {
                        found++;
                    }

                    while (found == required) {
                        // check match
                        if (right - left + 1 < ans.getValue()) {
                            ans = new Pair<>(s.substring(left, right + 1), right - left + 1);
                        }
                        // shrink
                        c = s.charAt(left);
                        freq_s.put(c, freq_s.get(c) - 1);
                        if (freq_t.containsKey(c) && freq_s.get(c) < freq_t.get(c)) {
                            found--;
                        }
                        left++;
                    }
                }
                return ans.getKey();
            }
        }

## Complexity

- **Time**: $O(n + m)$ _as we iterate through `t` and then through `s`_
- **Space**: $O(k)$ _as we store hashmaps of the frequencies `s` and `t` characters_

!!! note ""
    where $n$ is the length of the first string `s`, $m$ is the length of the second string `t` and $k$ is the number of unique characters in `s` and `t`.

## Key Takeaways

- `javafx.util.Pair` instatiated object are immutable, that's why we create a `new Pair` instead of setting new values (no setters)
- `freq_s.get(c) == freq_t.get(c)` does not work and we must use `freq_s.get(c).equals(freq_t.get(c))` instead. This is because `==` compares object references, not values (use `.equals()` for value comparisons)
- _Why does it work with small values though?_ This is because the (JVM is caching)[https://wiki.owasp.org/index.php/Java_gotchas#Immutable_Objects_.2F_Wrapper_Class_Caching] 256 Integer values. Hence the comparison with `==` only works for numbers between -128 and 127

## Improvements

- Compacted the frequency calculation of both `freq_t` and `freq_s` by using `freq.get(char, 0) + 1` instead of explicit existence check
- Merged nested `if`s when the `else` branch is not needed