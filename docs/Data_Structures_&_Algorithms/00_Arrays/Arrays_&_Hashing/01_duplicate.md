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

Quite an easy one: the idea is tha we can just count the number of unique elements and compare it to the length of the original array. If they differ (unique < original) it means we have duplicates.

Compact versions just show the same logic with two different flavours.

## Solution

=== "Python"

        :::python
        class Solution:
            def hasDuplicate(self, nums: List[int]) -> bool:
                unique = set(nums)
                return len(unique) != len(nums)

=== "Python (compact)"

        :::python
        class Solution:
            def hasDuplicate(self, nums: List[int]) -> bool:
                return len(set(nums)) != len(nums)

=== "Java"

        :::java
        class Solution {
            public boolean hasDuplicate(int[] nums) {
                Set<Integer> unique = new HashSet<>();
                Arrays.stream(nums).forEach(unique::add);
                return unique.size() != nums.length;
            }
        }

=== "Java (compact)"

        :::java
        class Solution {
            public boolean hasDuplicate(int[] nums) {
                return Arrays.stream(nums).distinct().count() != nums.length;
            }
        }

### Complexity

- **Time**: $O(n)$ _as the built-in functions need to iterate through the array_
- **Space**: $O(n)$ _as we are storing a copy of the initial array_

!!! note ""
    where $n$ is the length of the input array
