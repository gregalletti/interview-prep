---
title: "🔴 Find Median From Data Stream"
external_links:
    NeetCode: https://neetcode.io/problems/find-median-in-a-data-stream
---
!!! note ""
    The (median)[https://en.wikipedia.org/wiki/Median] is the middle value in a sorted list of integers. For lists of even length, there is no middle value, so the median is the (mean)[https://en.wikipedia.org/wiki/Average] of the two middle values.

    <span/>

    For example:
    
    - For `arr = [1,2,3]`, the median is `2`.
    - For `arr = [1,2]`, the median is `(1 + 2) / 2 = 1.5`
    
    Implement the `MedianFinder` class:

    - `MedianFinder()` initializes the `MedianFinder` object.
    - `void addNum(int num)` adds the integer `num` from the data stream to the data structure.
    - `double findMedian()` returns the median of all elements so far.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

Sorting or keeping a fully sorted structure on every insertion is never going to be optimal here - that's $O(n \log n)$ or $O(n)$ per call, and the problem is basically begging for something better since we only ever need the *middle*, not the full order.

A heap is clearly the direction, but a single heap doesn't get us there - we need two, split around the middle.

Take a **max-heap** for the left half and a **min-heap** for the right half. The naming trap here is similar to the min-heap one: we're not storing the max and min elements, but we're saying:

- use a max-heap for the left side: the root contains the largest from left half, all its children will be smaller
- use a min-heap for the right side: the root contains the smallest from right half, all children will be larger

**When we insert**, we check the number against the top of `rightSide`. If the new number is bigger than the smallest element already on the upper side, it has to go right. Otherwise it's safe on the left. 

Then an important point: we need to **rebalance**: we're just moving the top element across when one side outgrows the other by more than one, which can only ever happen by exactly one element since we only ever insert one at a time.

That size constraint (never more than 1 apart) is the most important point. It guarantees the median is always sitting at the root of one or both heaps, so `findMedian` is $O(1)$: no scanning, no popping, just look at the top(s).

Worth noting: this two-heap trick is really just a running, balanced version of the top-k partitioning idea - instead of one bounded heap keeping the k largest, we have two unbounded-but-balanced heaps keeping everything sorted on each side of the median line. Python's `sortedcontainers.SortedList` would get you $O(\log n)$ insertion and $O(1)$ median lookup with far less code, but it hides the exact mechanism an interviewer wants to see you reason through - so for interview purposes, the two-heap version is the one to actually practice.

## Solution

=== "Python"

        :::python
        class MedianFinder:

            def __init__(self):
                self.leftSide = [] # max-heap, root contains the largest from left half
                self.rightSide = [] # min-heap, root contains the smallest from left half

            def addNum(self, num: int) -> None:
                if self.rightSide and num > self.rightSide[0]:
                    heapq.heappush(self.rightSide, num)
                else:
                    heapq.heappush(self.leftSide, -num)
                # initially, the above will only populate the left side since we never have self.rightSide

                # need to balance it out
                if len(self.leftSide) > len(self.rightSide) + 1:
                    popped = heapq.heappop(self.leftSide) # we pop the largest and move it to the right half
                    heapq.heappush(self.rightSide, -popped)

                # and need to balance it out again
                if len(self.rightSide) > len(self.leftSide) + 1:
                    popped = heapq.heappop(self.rightSide) # we pop the smallest and move it to the left half
                    heapq.heappush(self.leftSide, -popped)

            def findMedian(self) -> float:
                if len(self.leftSide) > len(self.rightSide):
                    return -self.leftSide[0]
                
                if len(self.rightSide) > len(self.leftSide):
                    return self.rightSide[0]

                return (-self.leftSide[0] + self.rightSide[0]) / 2
                
                
=== "Java"

        :::java

## Complexity

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways
