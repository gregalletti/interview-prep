---
title: "🟢 Last Stone Weight"
external_links:
    NeetCode: https://neetcode.io/problems/last-stone-weight
---
!!! note ""
    You are given an array of integers `stones` where `stones[i]` represents the weight of the `ith` stone.

    <span/>

    We want to run a simulation on the stones as follows:

    - At each step we choose the **two heaviest stones**, with weight `x` and `y` and smash them togethers
    - If `x == y`, both stones are destroyed
    - If `x < y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.
    
    Continue the simulation until there is no more than one stone remaining.
    
    Return the weight of the last remaining stone or return `0` if none remain.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

The category is a huge hint here, but let's imagine it's not there and get to it autonomously: at each iteration, we are required to extract the top-2 largest elements. **This is our trigger**, every time we have to identify `top-k largest/smallest` we can think about using a heap.

But not blindly, we should think about complexity first, so let's do it. The idea is that, if we have a max heap with the values in it, we can extract the top-2 elements and smash them, resulting in either 1 or 0 remaining stones. We do this for all elements, so between $n$ and $n / 2$ times. By following classic heap time complexity, we can access the top element in $O(\log n)$ time (we do it twice in one iteration) and insert in $O(\log n)$. This results in a total of $O(n\log n)$ **for the actual algorithm**.

However, we're not given a heap directly but a simple unordered array. Conveniently, heapifying an array takes $O(n\log n)$, which keeps the total time complexity as $O(n\log n)$. I'm quite satisfied by that (and NeetCode's complexity requirements confirm it) but this is something to cross check with the interviewer: *the solution I have in mind is $O(n\log n)$ time, shall we go with that and start coding or do you want me to explore other alternatives?*

What about the space complexity? It's simply $O(n)$ since we store $n$ values in the heap.

Good, let's proceed with the coding now which is quite straightforward: transform the array into a max-heap, keep extracting top-2 elements and compare them, re-insert the remaining stone (if any) until we have either 0 or 1 stone left.

We just need to be careful here as the default heap implementation is a min-heap, just insert negative values and handle them properly later on.

## Solution

=== "Python"

        :::python
        class Solution:
            def lastStoneWeight(self, stones: List[int]) -> int:
                stones = [-s for s in stones]
                heapq.heapify(stones)

                while len(stones) > 1:
                    x = -1 * heapq.heappop(stones)
                    y = -1 * heapq.heappop(stones)

                    if x != y:
                        heapq.heappush(stones, y - x)

                return -stones[0] if stones else 0

=== "Java"

        :::java
        class Solution {
            public int lastStoneWeight(int[] stones) {
                PriorityQueue<Integer> heap = new PriorityQueue<>();
                for (int s : stones) {
                    heap.offer(-s);
                }

                while (heap.size() > 1) {
                    int x = -1 * heap.poll();
                    int y = -1 * heap.poll();

                    if (x != y) {
                        heap.offer(y - x);
                    }
                }
                return (heap.size() != 0) ? -heap.peek() : 0;
            }
        }

## Complexity

- **Time**: $O(n\log n)$ _as we create a heap in $O(n\log n)$ and reduce it to 0 or 1 size in $O(n\log n)$_
- **Space**: $O(n)$ _as we store $n$ values in the heap_

!!! note ""
    where $n$ is the number of elements in `stones`

## Key Takeaways
