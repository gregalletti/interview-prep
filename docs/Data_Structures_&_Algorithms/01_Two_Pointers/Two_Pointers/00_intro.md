---
title: Overview
summary: Two pointers and fast-slow patterns
---
Two pointers are one of the most useful patterns in interviews because they often turn a brute-force $O(n^2)$ solution into a clean $O(n)$ solution. They work especially well on sorted arrays, strings, and linked lists.

The core idea is simple: keep two indices and move them in a controlled way. In many problems, that means comparing both ends of the array, scanning with a write pointer, or using a fast pointer to skip ahead.

## Core Patterns

### 1. Converging Pointers

Use two pointers from opposite ends when the array is sorted or when you want to compare extremes.

```python
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return [left, right]
        if total < target:
            left += 1
        else:
            right -= 1
    return []
```

### 2. Fast and Slow Pointers

Use a fast pointer to move ahead quickly and a slow pointer to track the current position. This is common for linked lists and in-place array problems.

```python
def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

### 3. Write Pointer + Read Pointer

This pattern is perfect for removing duplicates or partitioning data without extra space.

```python
def remove_duplicates(nums):
    write = 0
    for read in range(len(nums)):
        if read == 0 or nums[read] != nums[write]:
            nums[write] = nums[read]
            write += 1
    return write
```

## Common Interview Questions

- Valid Palindrome
- Two Sum II
- Three Sum
- Container With Most Water
- Remove Duplicates from Sorted Array
- Merge Two Sorted Arrays

## Common Methods and Implementation Notes

### Python

- Use `left` and `right` indices directly
- Prefer `while left < right` when shrinking a search space
- Use `len(arr)` and index access for quick comparisons

### Java

- Start with `int left = 0; int right = nums.length - 1;`
- Use `while (left < right)` for standard two-pointer loops
- Arrays are often modified in place, so avoid creating extra arrays unless required

## Quick Tips

- If the array is sorted, two pointers is often the first thing to try.
- If the problem asks for “in-place” or “constant extra space”, two pointers is a strong signal.
- For linked lists, fast-slow pointers are usually the right pattern.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Initialize two pointers | $O(1)$ | $O(1)$ | Usually just two indices |
| Move pointers through an array | $O(n)$ | $O(1)$ | One linear pass |
| Compare from both ends | $O(1)$ per step | $O(1)$ | Used in palindrome checks |
| In-place write with a second pointer | $O(n)$ | $O(1)$ | Common for deduplication |
| Fast/slow pointer traversal | $O(n)$ | $O(1)$ | Typical for linked lists |
