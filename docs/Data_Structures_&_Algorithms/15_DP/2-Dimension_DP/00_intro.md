---
title: Overview
summary: 2D dynamic programming patterns over pairs of indices
---
2D DP extends the same idea as 1D DP (cache subproblem results instead of recomputing them) to states that need two indices instead of one. That happens whenever a problem compares two sequences (two strings, two arrays), tracks one sequence against two boundaries (a substring's start and end), or tracks a choice alongside a shrinking resource (an item index plus remaining capacity).

The state is `dp[i][j]`, and the recurrence almost always moves by shrinking one or both indices toward a base case - two prefixes growing together, two boundaries converging inward, or an item/capacity pair decreasing.

## Core Concepts

- A 2D state can't be described by a single index - it needs a pair, and what that pair *means* depends on the problem
- **Two sequences:** `dp[i][j]` = "considering the first `i` elements of A and the first `j` elements of B"
- **One sequence, two boundaries:** `dp[i][j]` = "the answer for the substring/subarray from index `i` to `j`"
- **Item + capacity:** `dp[i][j]` = "the best outcome considering the first `i` items with capacity `j` remaining" - the classic knapsack shape
- Space is usually $O(n \times m)$ for the full table, but most 2D DPs only need the current and previous row, dropping to $O(m)$

## Core Patterns

### 1. Two Sequences (Longest Common Subsequence)

Use when comparing two strings or arrays element by element.

    :::python
    def longest_common_subsequence(a, b):
        n, m = len(a), len(b)
        dp = [[0] * (m + 1) for _ in range(n + 1)]
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if a[i - 1] == b[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[n][m]

### 2. One Sequence, Two Boundaries (Palindromic Substrings)

Use when the state is a property of *one* substring or subarray, so the two indices are its boundaries rather than positions in two different sequences.

    :::python
    def build_palindrome_table(s):
        n = len(s)
        dp = [[False] * n for _ in range(n)]

        for length in range(1, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                if length == 1:
                    dp[i][j] = True
                elif length == 2:
                    dp[i][j] = s[i] == s[j]
                else:
                    dp[i][j] = s[i] == s[j] and dp[i + 1][j - 1]

        return dp

`dp[i][j]` answers "is `s[i..j]` a palindrome?" The recurrence shrinks both boundaries inward, which is why the loop has to go by increasing length - the smaller, already-shrunk substring has to be ready before it's needed.

### 3. Item + Capacity (0/1 Knapsack)

Use when choosing a subset of items under a capacity constraint, each item included or excluded once.

    :::python
    def knapsack(weights, values, capacity):
        n = len(weights)
        dp = [[0] * (capacity + 1) for _ in range(n + 1)]
        for i in range(1, n + 1):
            for cap in range(capacity + 1):
                dp[i][cap] = dp[i - 1][cap]  # skip item i - 1
                if weights[i - 1] <= cap:
                    dp[i][cap] = max(dp[i][cap], dp[i - 1][cap - weights[i - 1]] + values[i - 1])
        return dp[n][capacity]

## Common Methods and Notes

### Python

- A 2D table is `dp = [[0] * (m + 1) for _ in range(n + 1)]` - never `[[0] * (m + 1)] * (n + 1)`, that repeats the *same* inner list by reference, so every row mutates together
- `functools.lru_cache` still works for top-down 2D DP - pass both indices as arguments, e.g. `@lru_cache(maxsize=None)` on `def solve(i, j): ...`
- Rolling two rows (`prev_row`, `curr_row`) instead of the full table drops space from $O(n \times m)$ to $O(m)$ when `dp[i]` only needs `dp[i - 1]`

### Java

- `int[][] dp = new int[n + 1][m + 1];` - Java always allocates distinct rows, so there's no aliasing bug equivalent to the Python one above
- `Integer[][]` (boxed) for a top-down memo table so "not computed" can be `null`; a primitive `int[][]` needs a sentinel instead
- Same rolling-row trick applies: two `int[]` arrays instead of a full `int[n][m]`

## Quick Tips

- **Comparing two strings/arrays (subsequence, edit distance, interleaving):** `dp[i][j]` = first `i` of one, first `j` of the other.
- **A property of a single substring/subarray between two boundaries:** `dp[i][j]` = the two boundaries, processed by increasing length so the inner piece is always ready.
- **Choosing items under a constraint (weight, budget, count):** `dp[i][j]` = item index plus remaining capacity - that's knapsack.
- **`dp[i]` only depends on `dp[i - 1]`:** roll two rows instead of keeping the whole table.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Two-sequence DP (LCS, edit distance) | $O(n \times m)$ | $O(n \times m)$ | One cell per pair of prefixes |
| One-sequence, two-boundary DP (palindrome table) | $O(n^2)$ | $O(n^2)$ | One cell per substring |
| Item + capacity DP (0/1 knapsack) | $O(n \times W)$ | $O(n \times W)$ | `W` = capacity; pseudo-polynomial, not polynomial in the input size alone |
| Space-optimized (rolling rows) | same time | $O(m)$ or $O(W)$ | Only when each row depends on just the previous one |
