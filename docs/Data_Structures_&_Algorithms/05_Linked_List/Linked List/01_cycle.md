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

To be fair, I already solved this problem in the past. Let's just state the naive solution, which would consist on following the linked list, storing the "seen" nodes and return false as soon as we have a match, true if not.

Of course this has extra space complexity, so we need to think about a better solution. Two pointers come in handy now, so we can use the slow/fast pointer approach (commonly used to detect cycles). We follow the linked list with two pointers, one moving one step at a time and one moving two steps at a time.

> Just found out this algorithm is called _Floyd's cycle finding algorithm_ or _Hare-Tortoise algorithm_

## Solution

=== "Python"

        :::python
        # Definition for singly-linked list.
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val
        #         self.next = next

        class Solution:
            def hasCycle(self, head: Optional[ListNode]) -> bool:
                slow, fast = head, head

                while fast and fast.next:
                    slow = slow.next
                    fast = fast.next.next
                    if slow == fast:
                        return True
                return False

=== "Java"

        :::java
        /**
        * Definition for singly-linked list.
        * public class ListNode {
        *     int val;
        *     ListNode next;
        *     ListNode() {}
        *     ListNode(int val) { this.val = val; }
        *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
        * }
        */

        class Solution {
            public boolean hasCycle(ListNode head) {
                ListNode slow = head;
                ListNode fast = head;

                while (fast != null && fast.next != null) {
                    slow = slow.next;
                    fast = fast.next.next;
                    if (slow == fast) {
                        return true;
                    }
                }
                return false;
            }
        }

## Complexity

- Time Complexity: $O(n)$ time complexity _as we only iterate until the end of the list or until a loop is found. In the worst case the cycle has the same length of the entire list. Easy way to think about it is 2 cars in the same circuit (entire list), one moving twice as fast -> the fast car will lap the slow car in 1 single lap_
- Space Complexity: $O(1)$ space complexity _as we don't store anything_

!!! note ""
    where $n$ is the length of the linked list.

## Key Takeaways

- `==` is a reference comparison, i.e. both objects refer to the same object
- `.equals()` evaluates to the comparison of _values_ in the objects
- Always remember the `.equals()` meaninig: if no parent classes have provided an override, then it defaults to the method from the ultimate parent class, `Object`. Per the Object API this is the same as `==`
- In this problem we are good with both, but using `==` is more coherent and explicit
