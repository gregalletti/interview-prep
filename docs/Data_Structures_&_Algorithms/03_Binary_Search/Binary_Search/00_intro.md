---
title: Overview
summary: Binary search patterns and boundary handling
---
Binary search is the standard way to search efficiently in sorted data. The main idea is to repeatedly cut the search space in half until the target is found or ruled out.

The pattern is simple, but interviews often test your ability to handle boundary conditions carefully. A slight mistake in the loop condition or the midpoint update can cause off-by-one bugs.

## Core Pattern

```python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

## Common Interview Questions

- Search in Rotated Sorted Array
- Find First and Last Position of Element in Sorted Array
- Peak Index in a Mountain Array
- Capacity To Ship Packages Within D Days
- Koko Eating Bananas
- Search Insert Position

## Common Variants

### 1. Leftmost or Rightmost Bound

Use binary search when the problem asks for the first or last index that satisfies a condition.

### 2. Search in a Rotated Array

The array is not fully sorted, but each half is sorted. The standard solution still uses binary search with careful comparisons.

### 3. Monotonic Predicate

Many interview problems reduce to “find the smallest value where a condition becomes true.” That is a classic binary search pattern.

## Common Methods and Notes

### Python

- Use `left` and `right` indices directly
- `mid = left + (right - left) // 2` avoids overflow-like issues in other languages
- `bisect_left` and `bisect_right` are handy for quick lookups on sorted lists

### Java

- Use `int left = 0; int right = nums.length - 1;`
- Keep `mid` as `left + (right - left) / 2`
- `Arrays.binarySearch` is fine for simple searches, but custom boundary logic is often needed for interview problems

## Quick Tips

- Always define the loop invariant clearly: the answer remains inside the current range.
- If you are searching for a first/last valid index, the loop condition and update logic matter a lot.
- If the problem has a monotonic condition, binary search is often the intended approach.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Binary search on a sorted array | $O(\log n)$ | $O(1)$ | Halves the search space each step |
| Compare middle element | $O(1)$ | $O(1)$ | Constant-time check |
| Search for first/last valid index | $O(\log n)$ | $O(1)$ | Usually one modified binary search or two searches |
| Check a monotonic condition | $O(1)$ per step | $O(1)$ | The search loop is what dominates |
