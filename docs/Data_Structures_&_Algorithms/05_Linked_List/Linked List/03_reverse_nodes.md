---
title: "🔴 Reverse K-Group Nodes"
external_links:
    NeetCode: https://neetcode.io/problems/reverse-nodes-in-k-group
---
!!! note ""
    You are given the head of a singly linked list `head` and a positive integer `k`.

    You must reverse the first `k` nodes in the linked list, and then reverse the next `k` nodes, and so on. If there are fewer than `k` nodes left, leave the nodes as they are.

    Return the modified list after reversing the nodes in each group of `k`.

    You are only allowed to modify the nodes' `next` pointers, not the values of the nodes.

    ### Examples

    | Input | Output |
    | --- | --- |
    | `head = [1,2,3,4,5,6]`, `k = 3` <br/><br/> ![alt text](03_reverse_nodes_1.png) | `[3,2,1,6,5,4]` |
    | `head = [1,2,3,4,5]`, `k = 3` <br/><br/> ![alt text](03_reverse_nodes_2.png) | `[3,2,1,4,5]` |

    ### Constraints
    - The length of the linked list is `n`
    - `1 <= k <= n <= 5000`
    - `0 <= Node.val <= 100`

## Analysis

Before we dive into the implementation, let's focus on what we are actually supposed to do and how the indices should change.

## Solution

=== "Python"

        :::python

=== "Java"

        :::java

## Complexity

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 
