# [Group Anagrams](https://neetcode.io/problems/anagram-groups/question?list=neetcode150)

## Statement
>Given an array of strings strs, group all anagrams together into sublists. You may return the output in any order.
>
>An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.
>
>Example 1:
>
>Input: strs = ["act","pots","tops","cat","stop","hat"]
>
>Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]
>Example 2:
>
>Input: strs = ["x"]
>
>Output: [["x"]]
>Example 3:
>
>Input: strs = [""]
>
>Output: [[""]]
>Constraints:
>
>1 <= strs.length <= 1000.
>0 <= strs[i].length <= 100
>strs[i] is made up of lowercase English letters.

## Analysis
Most intuitive solution is to iterate through the strings and check if isAnagram. This would need O(n) for the loop, to be multiplied by the complexity of executing the isAnagram. This is way too much.

We can instead work on the smallest constraint we're given, which is the English letters count (26). Let's try to build a hashmap based on this.

If two words are anagrams, they share the same frequency count (as we did for the previous problem). This means we can **skip the comparison** (-1 to the frequency), but just use the frequency map as key/index. _We don't compare, we group._

<span style="color:#4ec9b0">[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] act</span>

<span style="color:#ce9178">[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0] pots</span>

<span style="color:#ce9178">[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0] tops</span>

<span style="color:#4ec9b0">[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] cat</span>

<span style="color:#ce9178">[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0] stop</span>

[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] hat

## Solution
=== "Python"

    ```python
    class Solution:
        def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
            ans = {}
            for s in strs:
                freq = [0] * 26
                for c in s:
                    freq[ord(c) - ord('a')] += 1
                index = tuple(freq)
                if index not in ans:
                    ans[index] = [s]
                else:
                    ans[index].append(s)
            return list(ans.values())
    ```

=== "Java"

    ```java
    class Solution {
        public List<List<String>> groupAnagrams(String[] strs) {
            Map<String, List<String>> ans = new HashMap<>();
            for (String s : strs) {
                int[] freq = new int[26];
                for (char c : s.toCharArray()) {
                    freq[c - 'a']++;
                }
                
                String index = Arrays.toString(freq);
                
                if (ans.containsKey(index)) {
                    ans.get(index).add(s);
                } else {
                    ans.put(index, new ArrayList<>(Arrays.asList(s)));
                }
            }
            
            return new ArrayList<>(ans.values());
        }
    }
    ```

## Complexity
$O(n * m)$ time complexity as we iterate once through the strings (len n) and for each string we iterate through its characters (len m)

$O(1)$ space complexity as we are storing at most all the English characters in the hashmap, hence 26

## TODO
- Optimize Java solution using computeIfAbsent() instead of putIfAbsent() + get()
- Update complexity analysis to reflect accurate O(n * k log k) where n = number of strings, k = average string length
- Add Analysis section explaining the grouping strategy
