---
title: "🟠 Longest Repeating Char Replacement"
external_links:
    NeetCode: https://neetcode.io/problems/longest-repeating-substring-with-replacement
---
!!! note ""
    You are given a string `s` consisting of only uppercase english characters and an integer `k`. You can choose up to `k` characters of the string and replace them with any other uppercase English character.

    After performing at most `k` replacements, return the length of the longest substring which contains only one distinct character.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    | `s = "XYYX"`, `k = 2` | 4 | Either replace the 'X's with 'Y's, or replace the 'Y's with 'X's |
    | `s = "AAABABB"`, `k = 1` | 5 | Replace the first 'B' with one 'A' |

    ### Constraints
    - `1 <= s.length <= 100,000`
    - `0 <= k <= s.size`
    - `s` consists of only uppercase english characters

## Analysis

My thought process here was not exactly linear, but brought me to the optimal solution anyways.

I initially thought about the naive solution of just considering each substring size, count the letters' frequencies and check if the substring can be unified with that specific `k` number of replacements (start from size 2 substrings, then size 3, ...). Core idea about verifying the replacements is this: we need to replace the least frequent characters with the most frequent one. Once we identify the most frequent one, the computation is easy as `size - max_freq <= k`. If that's true it means we have "enough" `k` replacements.

Then I went backwards, thinking: why don't we start from the largest substring since that's what we want to maximize? I thought about starting from the largest substring (the string itself), counting the frequencies, and verifying if the number of needed replacements was enough (less than or equal to `k`).

Promising idea, but the main pitfall was the frequency counting in my opinion: we can't easily reuse the frequencies calculated the step before. _It's not wrong_, just more difficult.

So the new intuition: we can start from the left (`L = 0`), keep counting the chars and increasing the substring size (the window) with `R = L + 1, 2, 3,...`, while also checking if the replacements are enough, let's say until a given size `x`. As soon as we check `x + 1` and replacements are not valid, we know that `x` is still the longest substring so far, and we can move to the right (`L = 1`). Of course now we don't need to reset `R`, since we know that we are searching for a size greater than `x`. We are basically shrinking the window from size `x + 1` (invalid) to `x` (the largest we encountered) and keep going until `R` reaches the end of the string.

When this happens we know that we are finished, because if we ever reach that point, and say we never incremented `L`, it means that we're encountering valid replacements.

### Improved version

By "wrongly" implementing the last solution above, I realized one thing: the solution got accepted, but while writing this page I noticed that I was **always** updating the final result with `ans = size`. No check on the maximum value, even if this is the main goal.

I started trying to explain it, failed, and the good old debugging saved me. I added some logs in my Python solution and noticed an interesting pattern:

    :::
    s="XYZAABAA"
    k=1

    ANALYZING:  X
    valid, new answer:  1
    ANALYZING:  XY
    valid, new answer:  2
    ANALYZING:  XYZ
    not valid - shrinking
    ANALYZING:  YZA
    not valid - shrinking
    ANALYZING:  ZAA
    valid, new answer:  3
    ANALYZING:  ZAAB
    not valid - shrinking
    ANALYZING:  AABA
    valid, new answer:  4
    ANALYZING:  AABAA
    valid, new answer:  5

- `size` is non-decreasing -> when we shrink we immediately move `R` to the right as well
- that's why `ans` is non-decreasing and we don't need the max (`ans = size`)

But trying to validate this brought me to the solution tab and the NeetCode YT video, and I think I can reuse what I've just found and get to the optimal solution:

- we want to minimize `size - max_freq` (because it needs to be `<= k`)
- `size` will only either stay the same or increase, but at the same time it will need to respect `size - max_freq <= k`
- for a larger window to remain valid, its increase in size has to be compensated by enough `max_freq`
- since only increases in `max_freq` can increase `ans` (indirectly), we don't need to care when `max_freq` decreases
- if `max_freq` decreases (but `size` stays the same or increases), the window will not be valid

> We're trying to increase `size`. To keep increasing `size` while remaining valid, `max_freq` must eventually increase as well. Therefore, only increases in `max_freq` can enable a larger valid window, decreases cannot help us find a larger answer.

## Solution

=== "Python"

        :::python
        class Solution:
            def characterReplacement(self, s: str, k: int) -> int:
                n = len(s)
                freq = {}
                left = 0
                ans = 0

                for right in range(n):
                    freq[s[right]] = freq.get(s[right], 0) + 1
                    maxFreq = max(freq.values())

                    size = (right - left) + 1
                    if size - maxFreq <= k:
                        ans = size
                    else:
                        left += 1
                        freq[s[left - 1]] -= 1
                return ans
=== "Java"

        :::java
        class Solution {
            public int characterReplacement(String s, int k) {
                Map<Character, Integer> freq = new HashMap<>();
                int n = s.length();
                int ans = 0;
                int left = 0;

                for (int right = 0; right < n; right++) {
                    freq.put(s.charAt(right), freq.getOrDefault(s.charAt(right), 0) + 1);
                    int maxFreq = Collections.max(freq.values());

                    int size = (right - left) + 1;
                    if (size - maxFreq <= k) {
                        ans = size;
                    } else {
                        left++;
                        freq.put(s.charAt(left - 1), freq.get(s.charAt(left - 1)) - 1);
                    }
                }
                return ans;
            }
        }

### Complexity

- Time Complexity: $O(n * m)$ time complexity _as we iterate through the string once and compute the current max frequency at every iteration_
- Space Complexity: $O(m)$ space complexity _as we store the frequencies_

!!! note ""
    where $n$ is the length of the input string `s` and $m$ is the number of unique chars in `s` (at most 26, can be considered constant).

## Solution - Improved

=== "Python"

        :::python
        class Solution:
            def characterReplacement(self, s: str, k: int) -> int:
                n = len(s)
                freq = {}
                left = 0
                ans = 0
                maxFreq = 0

                for right in range(n):
                    freq[s[right]] = freq.get(s[right], 0) + 1
                    maxFreq = max(maxFreq, freq[s[right]])

                    size = (right - left) + 1
                    if size - maxFreq <= k:
                        ans = size
                    else:
                        left += 1
                        freq[s[left - 1]] -= 1
                return ans
=== "Java"

        :::java
        class Solution {
            public int characterReplacement(String s, int k) {
                Map<Character, Integer> freq = new HashMap<>();
                int n = s.length();
                int ans = 0;
                int left = 0;
                int maxFreq = 0;

                for (int right = 0; right < n; right++) {
                    freq.put(s.charAt(right), freq.getOrDefault(s.charAt(right), 0) + 1);
                    maxFreq = Math.max(maxFreq, freq.get(s.charAt(right)));

                    int size = (right - left) + 1;
                    if (size - maxFreq <= k) {
                        ans = size;
                    } else {
                        left++;
                        freq.put(s.charAt(left - 1), freq.get(s.charAt(left - 1)) - 1);
                    }
                }
                return ans;
            }
        }

### Complexity

- Time Complexity: $O(n)$ time complexity _as we iterate through the string once but we don't compute max frequency_
- Space Complexity: $O(m)$ space complexity _as we store the frequencies_

!!! note ""
    where $n$ is the length of the input string `s` and $m$ is the number of unique chars in `s` (at most 26, can be considered constant).

## Key Takeaways

- `Collections.max()` is conceptually equivalent to Python's `max()` for finding the largest element
