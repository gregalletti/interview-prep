---
title: Overview
summary: Sliding window patterns for subarrays and substrings
---
**Sliding window** is a technique for problems that ask about a contiguous subarray or substring — a maximum sum, a shortest length, a set of distinct characters — inside a larger sequence. Instead of re-scanning each candidate range from scratch, it **maintains a running window and only adjusts what changed at the edges**, turning an $O(n^2)$ or $O(n \cdot k)$ brute-force scan into $O(n)$.

The window is usually defined by two indices, `left` and `right`. Some problems fix the window's width upfront; others let it grow and shrink based on a condition, which is where most of the tricky logic lives.

## Core Concepts

- A window is a contiguous range `[left, right]` that slides across the array or string
- **Fixed-size window:** the width never changes — both pointers move together, one element in, one element out
- **Variable-size window:** `right` expands to grow the window, `left` contracts to shrink it once a constraint breaks
- Whatever the window's "cost" is (sum, count, distinct elements) should update incrementally — recomputing it from scratch every step is exactly what a sliding window is meant to avoid

## Core Patterns

### 1. Fixed-Size Window

Use when the window size is given directly, e.g. "subarray of length k."

    :::python
    def max_sum_fixed_window(nums, k):
        window_sum = sum(nums[:k])
        best = window_sum
        for i in range(k, len(nums)):
            window_sum += nums[i] - nums[i - k]
            best = max(best, window_sum)
        return best

### 2. Variable-Size Window (Shrinkable)

Use when the window grows until a constraint breaks, then shrinks from the left until it's valid again.

    :::python
    def min_subarray_len(nums, target):
        left = 0
        total = 0
        best = float('inf')
        for right in range(len(nums)):
            total += nums[right]
            while total >= target:
                best = min(best, right - left + 1)
                total -= nums[left]
                left += 1
        return best if best != float('inf') else 0

### 3. Window with a Frequency Map

Use when the constraint depends on counts of elements inside the window, e.g. distinct characters or anagram matching.

    :::python
    def longest_unique_substring(s):
        left = 0
        seen = {}
        best = 0
        for right, ch in enumerate(s):
            if ch in seen and seen[ch] >= left:
                left = seen[ch] + 1
            seen[ch] = right
            best = max(best, right - left + 1)
        return best

## Common Methods and Notes

### Python

- Use `left` and `right` indices; a running total or a `Counter` tracks the window's state
- `collections.Counter` is handy for frequency-based window constraints
- Slicing (`nums[left:right+1]`) is $O(k)$ — avoid it inside the loop, track the window incrementally instead

### Java

- Use `int left = 0;` and expand `right` in a single pass
- A `HashMap<Character, Integer>` or a fixed `int[26]` array works well for frequency-based windows
- Avoid rebuilding substrings inside the loop — track window boundaries and slice only once, at the end

## Quick Tips

- **Fixed window size given:** slide one element at a time, updating the running total instead of resumming.
- **"Shortest/longest subarray or substring" with a constraint:** think variable-size window with a shrink step.
- **Window needs to track counts:** pair it with a hash map or fixed-size array.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Fixed-size window scan | $O(n)$ | $O(1)$ | Each element enters and leaves the window once |
| Variable-size window (expand + shrink) | $O(n)$ | $O(1)$ | Amortized — `left` only moves forward, never resets |
| Window with a frequency map | $O(n)$ | $O(k)$ | `k` = size of the alphabet or distinct-value set |
| Recomputing the window from scratch each step | $O(n \cdot k)$ | $O(1)$ | The brute-force version sliding window replaces |