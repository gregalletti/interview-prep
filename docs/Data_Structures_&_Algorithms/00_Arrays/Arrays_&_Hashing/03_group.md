---
title: "🟠 Group Anagrams"
external_links:
    NeetCode: https://neetcode.io/problems/anagram-groups
---
!!! note ""
    Given an array of strings `strs`, group all anagrams together into sublists. You may return the output in any order.

    An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

    ### Examples

    | Example | Input | Output |
    | --- | --- | --- |
    | 1 | `["act","pots","tops","cat","stop","hat"]` | `[["hat"],["act", "cat"],["stop", "pots", "tops"]]` |
    | 2 | `["x"]` | `[["x"]]` |
    | 3 | `[""]` | `[[""]]` |

    ### Constraints

    - `1 <= strs.length <= 1000`
    - `0 <= strs[i].length <= 100`
    - `strs[i]` is made up of lowercase English letters

## Analysis

Most intuitive solution is to iterate through the strings and check if isAnagram. This would need O(n) for the loop, to be multiplied by the complexity of executing the isAnagram. This is way too much.

We can instead work on the smallest constraint we're given, which is the English letters count (26). Let's try to build a hashmap based on this.

If two words are anagrams, they share the same frequency count (as we did for the previous problem). This means we can **skip the comparison** and use the frequency vector as the grouping key.

For example:

| Word | Frequency vector |
| --- | --- |
| <span style="color:#4ec9b0">act</span> | <span style="color:#4ec9b0">[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]</span> |
| <span style="color:#ce9178">pots</span> | <span style="color:#ce9178">[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]</span> |
| <span style="color:#ce9178">tops</span> | <span style="color:#ce9178">[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]</span> |
| <span style="color:#4ec9b0">cat</span> | <span style="color:#4ec9b0">[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]</span> |
| <span style="color:#ce9178">stop</span> | <span style="color:#ce9178">[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]</span> |
| hat | [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] |

Words with the same vector are anagrams of each other. For each string we compute character frequencies, and directly append the strings to the result hashmap using the frequency array as key. We need to be careful when doing that as the key of an hashmap must be hashable, of course. In Python we can do that by converting it in a string with `key = str(freq)`. We could also achieve the same by converting it in a tuple, but let's be consistent with the Java solution.

This is more or less the same concept we apply for the Java solution with `String key = Arrays.toString(freq);`, evem if Java does not enforce it so strictly.

## Solution

=== "Python"

        :::python
        class Solution:
            def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
                ans = {}
                for s in strs:
                    freq = [0] * 26
                    for c in s:
                        freq[ord(c) - ord('a')] += 1
                    key = str(freq)
                    if key not in ans:
                        ans[key] = [s]
                    else:
                        ans[key].append(s)
                return list(ans.values())

=== "Java"

        :::java
        class Solution {
            public List<List<String>> groupAnagrams(String[] strs) {
                Map<String, List<String>> ans = new HashMap<>();
                for (String s : strs) {
                    int[] freq = new int[26];
                    for (char c : s.toCharArray()) {
                        freq[c - 'a']++;
                    }
                    
                    String key = Arrays.toString(freq);
                    
                    ans.putIfAbsent(key, new ArrayList<>());
                    ans.get(key).add(s);
                }
                
                return new ArrayList<>(ans.values());
            }
        }

### Complexity

- **Time**: $O(n * m)$ _as we iterate once through the strings $n$ and for each string we iterate through its characters ($m$ in the worst case)_
- **Space**: $O(n * m)$ _as we are storing at most all the English characters in the hashmap (26 so $O(1)$), times the number of strings $n$. Auxiliary space is therefore $O(n)$. For total space, we have to also include what we store in the output (all the input strings), so $O(n * k)$. Sum those two and we get the total space (still $O(n * k)$)_

!!! note ""
    where $n$ is the number of strings and $m$ is the length of the longest string.
