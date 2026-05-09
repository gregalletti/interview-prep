# [Contains Duplicate](https://neetcode.io/problems/duplicate-integer)

## Statement
>Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.
>
>Example 1:
>
>`Input: nums = [1, 2, 3, 3]`
>
>`Output: true`
>
>Example 2:
>
>`Input: nums = [1, 2, 3, 4]`
>
>`Output: false`

## Analysis

## Solution
=== "Python"

    ```python
    class Solution:
        def hasDuplicate(self, nums: List[int]) -> bool:
            unique = set(nums)
            return len(unique) != len(nums)
    ```

=== "Java"

    ```java
    class Solution {
        public boolean hasDuplicate(int[] nums) {
            Set<Integer> unique = new HashSet<>();
            Arrays.stream(nums).forEach(unique::add);
            return unique.size() != nums.length;
        }
    }
    ```

## Complexity
$O(n)$ time complexity as the built-in functions need to iterate through the array

$O(n)$ space complexity as we are storing a copy of the initial array

## TODO
- Add Analysis section with explanation of the approach
- Optimize Python solution using more Pythonic approach
