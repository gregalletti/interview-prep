---
title: Overview
summary: 1D dynamic programming patterns and space optimization
---
Dynamic programming solves a problem by breaking it into subproblems and reusing the answers to ones already solved, instead of recomputing them from scratch. It only helps when a problem has overlapping subproblems - if every subproblem is unique, there's nothing to reuse, and DP degenerates into plain recursion.

"1D" means the state describing a subproblem fits in a single index - usually a position in an array or a length so far. Once a problem needs a second dimension (two strings, or an item plus a remaining capacity), it moves into 2D DP territory.

## Core Concepts

- DP breaks a problem into overlapping subproblems and caches their results - that reuse is what separates it from plain recursion or backtracking
- **Two ingredients required:** optimal substructure (the optimal solution is built from optimal solutions to subproblems) and overlapping subproblems (the same subproblem recurs, so caching pays off)
- **Top-down (memoization):** write the natural recursion, cache results by input
- **Bottom-up (tabulation):** build a table from the base cases upward, no recursion/call-stack risk

## Core Patterns

### 1. Top-down (Memoization)

Write the recursive definition first, then cache it - a plain `dict` keyed by the input is enough.

    :::python
    def fib(n, memo=None):
        if memo is None:
            memo = {}
        if n in memo:
            return memo[n]
        if n <= 1:
            return n
        memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
        return memo[n]

### 2. Bottom-up (Tabulation)

Build `dp[i]` from smaller indices upward, in a loop instead of recursion.

    :::python
    def rob(nums):
        if not nums:
            return 0
        dp = [0] * len(nums)
        dp[0] = nums[0]
        for i in range(1, len(nums)):
            prev2 = dp[i - 2] if i >= 2 else 0
            dp[i] = max(dp[i - 1], prev2 + nums[i])
        return dp[-1]

### 3. Space-Optimized (Rolling Variables)

When `dp[i]` only depends on the last one or two states, drop the array entirely and keep just those values.

    :::python
    def rob_optimized(nums):
        prev, curr = 0, 0
        for num in nums:
            prev, curr = curr, max(curr, prev + num)
        return curr

## Common Methods and Notes

### Python

- `functools.lru_cache` turns a plain recursive function into a memoized one with one decorator - `@lru_cache(maxsize=None)`
- A plain `dict`, or a list sized to the input, works fine as a manual memo/table
- Watch Python's recursion limit (~1000 by default) on deep top-down recursion - bottom-up avoids it entirely

### Java

- No built-in memoization decorator - use a `HashMap<Integer, Integer>`, or an `int[]` initialized to a sentinel like `-1`, as the cache
- Bottom-up with a plain `int[]` is usually preferred in Java - avoids both cache lookup overhead and recursion depth limits
- `Integer[]` (boxed) if the cache needs to distinguish "not computed" (`null`) from a valid `0`; a primitive `int[]` needs a sentinel value instead

## Quick Tips

- **"Maximum/minimum/count the ways to..." with choices at each step:** think DP before brute-force recursion.
- **Recursion is timing out:** check for repeated subproblems - that's the signal to memoize.
- **`dp[i]` only depends on the last one or two states:** collapse the array to a couple of variables and drop the space to $O(1)$.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Top-down with memoization | $O(n)$ | $O(n)$ | Each state computed once, cached; plus $O(n)$ recursion stack |
| Bottom-up tabulation | $O(n)$ | $O(n)$ | One pass filling the table |
| Space-optimized bottom-up | $O(n)$ | $O(1)$ | Only when `dp[i]` depends on a fixed number of previous states |
| Naive recursion without memoization | $O(2^n)$ | $O(n)$ | Recomputes overlapping subproblems - what DP is meant to avoid |