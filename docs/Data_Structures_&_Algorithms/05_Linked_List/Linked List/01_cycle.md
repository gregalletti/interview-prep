---
title: "🟢 Linked List Cycle"
external_links:
    NeetCode: https://neetcode.io/problems/linked-list-cycle-detection
---
!!! note ""
    Given the beginning of a linked list `head`, return `true` if there is a cycle in the linked list. Otherwise, return `false`.

    There is a cycle in a linked list if at least one node in the list can be visited again by following the `next` pointer.

    Internally, `index` determines the index of the beginning of the cycle, if it exists. The tail node of the list will set it's `next` pointer to the `index-th` node. If `index = -1`, then the tail node points to null and no cycle exists.

    > Note: index is not given to you as a parameter.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    | ![alt text](01_cycle_1.png) `head = [1,2,3,4]`, `index = 1` | `true` | There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed) |
    | ![alt text](01_cycle_2.png) `head = [1,2]`, `index = -1` | `false` | There is no cycle in the linked list |

    ### Constraints
    - `0 <= Length of the list <= 1000`
    - `-1000 <= Node.val <= 1000`
    - `index` is `-1` or a valid index in the linked list.

## Analysis

## Solution

=== "Python"

        :::python

=== "Java"

        :::java

## Complexity

- Time Complexity: $O()$ time complexity _as we _
- Space Complexity: $O()$ space complexity _as we _

!!! note ""
    where $n$ is 
