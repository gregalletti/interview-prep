---
title: "🟢 Contains Duplicate"
external_links:
    NeetCode: https://neetcode.io/problems/duplicate-integer
---
!!! note ""
    Given an integer array `nums`, return `true` if any value appears more than once in the array, otherwise return `false`.

    ### Examples

    | Input | Output |
    | --- | --- |
    | `[1, 2, 3, 3]` | `true` |
    | `[1, 2, 3, 4]` | `false` |

## Analysis

## Solution

=== "Python"

        :::python
        class Solution:
            def hasDuplicate(self, nums: List[int]) -> bool:
                unique = set(nums)
                return len(unique) != len(nums)

=== "Java"

        :::java
        class Solution {
            public boolean hasDuplicate(int[] nums) {
                Set<Integer> unique = new HashSet<>();
                Arrays.stream(nums).forEach(unique::add);
                return unique.size() != nums.length;
            }
        }

### Complexity

- **Time**: $O(n)$ _as the built-in functions need to iterate through the array_
- **Space**: $O(n)$ _as we are storing a copy of the initial array_

!!! note ""
    where $n$ is the length of the input array

## TODO

- Add Analysis section with explanation of the approach
- Optimize Python solution using more Pythonic approach
