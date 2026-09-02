---
title: "🟢 Binary Search"
external_links:
    NeetCode: https://neetcode.io/problems/binary-search
---
!!! note ""
    You are given an array of distinct integers `nums`, sorted in ascending order, and an integer `target`.

    Implement a function to search for `target` within `nums`. If it exists, then return its index, otherwise, return -1.

    Your solution must run in $O(logn)$ time.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    | `nums = [-1,0,2,4,6,8]`, `target = 4` | `3` | 4 is at index 3 |
    | `nums = [-1,0,2,4,6,8]`, `target = 3` | `-1` | 3 is not in the array |

    ### Constraints
    - `1 <= nums.length <= 10000`
    - `-10000 < nums[i], target < 10000`
    - `All the integers in nums are unique`

## Analysis

Textbook binary search problem. It's just the vanilla binary search algorithm which is mandatory to master. Let's implement it **both iteratively and recursively** just for the sake of practice.

### Iterative

We initialize the `start` and `end` pointers to the first and last index of the array, respectively. We then enter a loop that continues until `start` is less than or equal to `end`. Inside the loop, we calculate the middle index `mid` and compare the value at that index with the target. If they are equal, we found the value and we return `mid`. If the value at `mid` is less than the target, we move the `start` pointer to `mid + 1`. Otherwise, we move the `end` pointer to `mid - 1`. If we exit the loop without finding the target, we return -1.

- We need to be careful with the calculation of `mid` to avoid integer overflow. Instead of using `(start + end) / 2`, we use `start + (end - start) / 2`.

- We also need to be careful with the loop condition. We use `start <= end` instead of `start < end` because we want to include the case where `start` and `end` are equal, which means we are checking the last remaining element.

- And finally, we need to be careful with the updates of `start` and `end`. We use `mid + 1` and `mid - 1` instead of `mid` because we want to exclude the middle element from the next search range.

### Recursive

We can implement the same logic recursively, which is for me even easier to imagine since we can actually think about the array being split into two halves and we can just call the function recursively on the half that contains the target.

But I fell into my own trap here, and I started implementing the recursive function passing the actual splitted array as parameter. This changes the logic as the indexes are no longer the same as the original array, and we would have to keep track of the offset. Instead, we can just pass the `start` and `end` indexes as parameters, and we can calculate the `mid` index as before. This way, we don't have to worry about the offset, and we can just return the index of the target if found.

I was also thinking about avoiding passing the `nums` and `target` as parameters since they are not changing by making them class variables, but this has no benefits since the array is passed by reference and the target is a primitive type, so they are not copied anyway. So we can just pass them as parameters to keep the function pure.

Understanding the complexity here is a bit more tricky (we all know it's $O(\log n)$) but how we calculate it is crucial to understand.

> Short answer: Binary search is $O(\log n)$ because each operation eliminates half of the remaining search space.

_Long answer:_
For each step, we check the middle element of the array. Depending on its value we then only proceed with the left or right half of the array and redo the same operation. This means that we keep dividing the array in half until we get to the base case, which is when the search space is empty (i.e., when `start > end`), ideally the array is reduced to a single element.

In other words, that's what we're doing:

$\dfrac{n}{2}$ -> $\dfrac{n}{4}$ -> $\dfrac{n}{8}$ -> $\dfrac{n}{16}$ -> ... -> $1$, for a defined number of steps $k$.

So we can rewrite this as $\dfrac{n}{2^k} = 1$ and solve for $k$. $n = 2^k$ -> this is the definition of logarithm to base 2, so $k = log₂(n)$. According to Big O notation, we can drop the base of the logarithm, so we can say that the time complexity of binary search is $O(log n)$.

## Solution - Iterative

=== "Python"

        :::python
        class Solution:
            def search(self, nums: List[int], target: int) -> int:
                start, end = 0, len(nums) - 1

                while start <= end:
                    mid = ((end - start) // 2) + start
                    if nums[mid] == target:
                        return mid
                    elif nums[mid] < target:
                        # need to keep searching in the right part
                        start = mid + 1
                    elif nums[mid] > target:
                        # need to keep searching in the left part
                        end = mid - 1

                return -1

=== "Java"

        :::java
        class Solution {
            public int search(int[] nums, int target) {
                int start = 0;
                int end = nums.length - 1;
                int mid;

                while (start <= end) {
                    mid = ((end - start) / 2) + start;

                    if (nums[mid] == target) {
                        return mid;
                    } else if (nums[mid] < target) {
                        // need to keep searching in the right part
                        start = mid + 1;
                    } else if (nums[mid] > target) {
                        // need to keep searching in the left part
                        end = mid - 1;
                    }
                }

                return -1;
            }
        }

### Complexity

- **Time**: $O(log n)$ _as we keep dividing the search space in half_
- **Space**: $O(1)$ _as we don't store any additional data_

!!! note ""
    where $n$ is the length of the input array `nums`.

## Solution - Recursive

=== "Python"

        :::python
        class Solution:
            def search(self, nums: List[int], target: int) -> int:
                return self.binarySearch(0, len(nums) - 1, nums, target)

            def binarySearch(self, start: int, end: int, nums: List[int], target: int) -> int:
                if start > end:
                    return -1
                mid = ((end - start) // 2) + start

                if nums[mid] == target:
                    return mid
                
                return self.binarySearch(start, mid - 1, nums, target) if nums[mid] > target else self.binarySearch(mid + 1, end, nums, target)

=== "Java"

        :::java
        class Solution {
            public int search(int[] nums, int target) {
                return binarySearch(0, nums.length - 1, nums, target);
            }

            private int binarySearch(int start, int end, int[] nums, int target) {
                if (start > end) {
                    return -1;
                }

                int mid = ((end - start) / 2) + start;

                if (nums[mid] == target) {
                    return mid;
                }

                return (nums[mid] > target)
                        ? binarySearch(start, mid - 1, nums, target)
                        : binarySearch(mid + 1, end, nums, target);
            }
        }

### Complexity

- **Time**: $O(log n)$ _as we keep dividing the search space in half_
- **Space**: $O(log n)$ _as we don't store additional data, but we need to count the recursive stack memory used (one call per level)_

!!! note ""
    where $n$ is the length of the input array `nums`.

## Key Takeaways

- Always pay attention to the possible integer overflow when calculating the middle index. Use `start + (end - start) / 2` instead of `(start + end) / 2`. This is especially important in languages like Java where integer overflow can occur (max integer value is $2^31 - 1$). In Python, integers can grow arbitrarily large, so this is less of a concern.
