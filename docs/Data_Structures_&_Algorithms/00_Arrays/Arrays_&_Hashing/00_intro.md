---
title: Overview
summary: Arrays and hashing patterns for interviews
---
**Arrays** and **hashing** are among the most common building blocks in coding interviews. They show up in everything from simple lookups to more advanced sliding-window and prefix-sum problems.

An array gives $O(1)$ access by index, while a hash map or set gives near-constant-time membership and lookup. In interviews, **the real skill is knowing when to use** one for speed, when to use the other for frequency tracking, and when a sorted array changes the whole approach.

## Core Concepts

### Arrays

- Contiguous storage with direct index access
- Good for prefix sums, subarrays, and in-place modification
- **Common tradeoff:** fast access but $O(n)$ insert/delete in the middle

### Hashing

- Hash maps and sets provide average $O(1)$ lookup, insert, and delete
- Great for frequency counting, duplicate detection, and index lookup
- Useful when you want to avoid nested loops

## Common Methods and Patterns

### Python

- `len(arr)` for size
- `arr.append(x)` for append
- `arr.pop()` or `arr.remove(x)` for removal
- `set(arr)` for unique values
- `Counter(arr)` for frequencies
- `dict.get(key, 0)` for safe counting

### Java

- `arr.length` for array size
- `list.add(x)` and `list.remove(index)` for dynamic lists
- `HashSet` for uniqueness
- `HashMap` for key-value lookup
- `map.merge(x, 1, Integer::sum)` for frequency counting

## Common Interview Questions

- Two Sum
- Contains Duplicate
- Product of Array Except Self
- Top K Frequent Elements
- Longest Consecutive Sequence
- Group Anagrams

## Interview Patterns

### 1. Frequency Counting

Use a map or `Counter` to count occurrences, then inspect the counts.

    :::python
    from collections import Counter
    freq = Counter(arr)

### 2. Index Lookup

Store value to index so you can answer “did I see this before?” in $O(1)$.

    :::python
    seen = {}
    for i, value in enumerate(arr):
        if value in seen:
            ...
        seen[value] = i

### 3. Set for Existence Checks

If the problem is about duplicates or missing values, a set is often the simplest solution.

    :::python
    seen = set(arr)

### 4. Prefix Sum

When the problem asks about subarray sums, prefix sums are often the key.

    :::python
    prefix = [0]
    for x in arr:
        prefix.append(prefix[-1] + x)

## Quick Tips

- **Unsorted input:** hashing is often the first idea.
- **Sorted input:** consider two pointers or binary search.
- **Repeated counting:** prefer a map over repeated scanning.
- **Java:** use `HashMap`/`HashSet` when you need average-$O(1)$ lookup. **Python:** prefer `dict` and `set`.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Access by index | $O(1)$ | $O(1)$ | Arrays support direct lookup |
| Append to a dynamic array/list | $O(1)$ amortized | $O(1)$ | Resizing may happen occasionally |
| Insert/delete in the middle | $O(n)$ | $O(1)$ | Elements must shift |
| Hash map lookup | $O(1)$ average | $O(1)$ average | Fast for membership and value retrieval |
| Hash set insertion | $O(1)$ average | $O(1)$ average | Good for deduplication |
| Build a frequency map | $O(n)$ | $O(n)$ | One pass over the input |
