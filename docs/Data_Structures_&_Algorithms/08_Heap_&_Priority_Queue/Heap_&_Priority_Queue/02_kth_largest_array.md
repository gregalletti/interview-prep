---
title: "🟠 Kth Largest Element in an Array"
external_links:
    NeetCode: https://neetcode.io/problems/kth-largest-element-in-an-array
---
!!! note ""
    Given an unsorted array of integers `nums` and an integer `k`, return the `kth` largest element in the array.

    <span/>

    By `kth` largest element, we mean the kth largest element in the sorted order, not the `kth` distinct element.
    
    **Follow-up:** Can you solve it without sorting?

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    | `nums = [2,3,1,5,4], k = 2` | `4` | `4` is the 2nd largest element in `nums` |
    | `nums = [2,3,1,1,5,5,4], k = 3` | `4` | `4` is the 3rd largest element in `nums` |

    ### Constraints
    - 1 <= k <= nums.length <= 10000
    - -1000 <= nums[i] <= 1000

## Analysis

Well, sorting immediately is almost never the optimal solution, so we'll solve both the base problem and the follow-up right away.

A heap is clearly the solution, but how do we use it? Let's take a min-heap.

The min-heap name can be super tricky as we're trying to find the largest elements, but remember: a min-heap does NOT mean "keep the smallest elements", but rather "the smallest element currently inside the heap is always at the top".

**When we push**, nothing special: we are just inserting elements "in order". **When we pop**, we pop the smallest element. Let's say we insert 10 elements and pop 8 times, we have just removed the 8 smallest elements, and we're left with the 2 largest ones (the same applies on the other way for a max-heap of course).

So we can apply this exact reasoning with `k` instead: we have an array of length `n` -> insert all the elements in the heap -> pop `n - k` elements -> we're left with the `k-th` largest elements -> take the first one as it's the smallest.

This works, but it's still not optimal since we're operating with `n` elements all the time. The core intuition here is to limit the size of the heap at `k`. Everything said above is still valid: we keep pushing elements and as soon as the size exceeds `k` we pop -> remove the smallest -> the largest remains. So it's exactly the same as above, we just pop together with push and not at the end.

Worth to mention that a built-in heapq function exists (`heapq.nlargest(n, iterable)`) and does the same exact thing in the same complexity, but for the sake of interview preparation I think it's better to show the more explicit solution - and it's not even available in all languages (Java has no such method for example).

## Solution

=== "Python"

        :::python
        class Solution:
            def findKthLargest(self, nums: List[int], k: int) -> int:
                heap = []

                for n in nums:
                    heapq.heappush(heap, n)
                    if len(heap) > k:
                        heapq.heappop(heap)

                return heap[0]

=== "Java"

        :::java
        class Solution {
            public int findKthLargest(int[] nums, int k) {
                PriorityQueue<Integer> heap = new PriorityQueue<>();

                for (int n : nums) {
                    heap.offer(n);
                    if (heap.size() > k) {
                        heap.poll();
                    }
                }

                return heap.peek();
            }
        }

## Complexity

- **Time**: $O(n\log k)$ _as we execute $n$ operations of a heap with $k$ elements, so $O(n)$ times $O(\log k)$_
- **Space**: $O(k)$ _as we store at max $k$ elements in the heap_

!!! note ""
    where $n$ is number of elements in `nums`

## Key Takeaways
