---
title: Overview
summary: Linked list patterns and pointer manipulation
---
A linked list is a sequence of nodes where each node points to the next. Unlike an array, there's no contiguous memory and no random access - you can only reach a node by walking from the head (or, for a doubly linked list, from either end).

Most linked list problems are really pointer-manipulation problems: rewiring `next` references correctly, without losing track of a node before you've followed its link. That's where nearly every bug in this topic comes from.

## Core Concepts

- A node holds a value and a reference to the next node (and, for a doubly linked list, the previous one)
- No random access - reaching index `i` takes $O(i)$, unlike an array's $O(1)$
- Insertion/deletion at a known node is $O(1)$ - no shifting, unlike an array
- **Singly linked list:** `next` only, one direction. **Doubly linked list:** `next` and `prev`, enables $O(1)$ removal given just the node
- A dummy/sentinel node removes special-casing the head

## Core Patterns

All examples below use a standard singly linked node:

    :::python
    class ListNode:
        def __init__(self, val=0, next=None):
            self.val = val
            self.next = next

### 1. Dummy Head / Sentinel Node

Use when the head itself might be removed, or when building a new list from scratch.

    :::python
    def remove_elements(head, val):
        dummy = ListNode(0, head)
        prev, curr = dummy, head
        while curr:
            if curr.val == val:
                prev.next = curr.next
            else:
                prev = curr
            curr = curr.next
        return dummy.next

### 2. Reversal (Iterative)

Track three pointers - previous, current, next - so the forward link isn't lost before it's overwritten.

    :::python
    def reverse_list(head):
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev

### 3. Fast and Slow Pointers (Cycle Detection)

The fast pointer moves two steps for every one of the slow pointer's; if there's a cycle, they eventually land on the same node.

    :::python
    def has_cycle(head):
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False

## Common Methods and Notes

### Python

- Define a node with `class ListNode: def __init__(self, val=0, next=None): ...`
- Use a dummy node (`dummy = ListNode(0, head)`) to avoid special-casing the head
- No built-in linked list type exposes node-level pointers - `collections.deque` is doubly linked internally, but you never see its nodes directly

### Java

- `next` is the only pointer on a singly linked node: `public ListNode next;`
- Use a dummy/sentinel node the same way: `ListNode dummy = new ListNode(0, head);`
- `java.util.LinkedList` implements `Deque`/`List` but, like Python's `deque`, exposes no node-level pointer manipulation - interview problems always define their own `ListNode`

## Quick Tips

- **Head might be removed or change:** use a dummy node.
- **Need to detect a cycle or find the middle:** fast and slow pointers.
- **Reversing all or part of a list:** track three pointers and don't overwrite a `next` link before you've saved it.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Access by index | $O(n)$ | $O(1)$ | No random access, must walk from head |
| Insert/delete at a known node | $O(1)$ | $O(1)$ | No shifting, unlike an array |
| Search by value | $O(n)$ | $O(1)$ | Linear scan |
| Reverse the list | $O(n)$ | $O(1)$ | One pass, pointers only |
| Cycle detection (Floyd's) | $O(n)$ | $O(1)$ | Fast pointer catches slow pointer if a cycle exists |