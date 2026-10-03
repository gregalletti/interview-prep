---
title: "🟠 Unique Paths"
external_links:
    NeetCode: https://neetcode.io/problems/count-paths
---
!!! note ""

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

## Solution

=== "Python"

        :::python
        class Solution:
            def uniquePaths(self, m: int, n: int) -> int:
                '''
                clarly DP, but let's define what we should memoize
                we know we have a m x n grid and we always want to go from top-left to bottom-right and we can only move right or down

                the most intuitive solution will use a similar grid, but what shall each cell of that dp grid represent?
                first guess: each dp cell represents the number of unique ways to get to target. why this? think about what we know so far:
                what can we say about bottom-right? we can store 1, there's only one path, the cell itself
                
                now I need to think, from which cells can I get to target? it's either from up or left: let's position ourselves in both and derive the logic

                - up: I can either go down or right (not really)
                - left: I can either go down (not really) or right

                ----------
                |  |  |  |
                ----------
                |  |  | 1| x
                ----------        
                |  | 1| 1|
                ----------
                    x


                ----------
                |  |  |  |
                ----------
                |  | 2| 1| -> I can go right (1 unique path) or down (1 unique path), so 2 in total
                ----------        
                |  | 1| 1|
                ----------

                for each cell, we ask this: "If I'm standing here, how many ways can I eventually reach the target?"

                here, we naturally went to bottom-up DP - just be careful with grid size and for loops
                '''

                dp = [[0] * (n) for _ in range(m)]
                dp[m - 1][n - 1] = 1
                
                for r in range(m - 1, -1, -1):
                    for c in range(n - 1, -1, -1):
                        if r + 1 == m and c + 1 == n:
                            dp[r][c] = 1
                            continue

                        if r + 1 == m:
                            down = 0
                        else:
                            down = dp[r + 1][c]

                        if c + 1 == n:
                            right = 0
                        else:
                            right = dp[r][c + 1]
                        dp[r][c] = down + right

                return dp[0][0]

=== "Python (with padding)"

        :::python
        class Solution:
            def uniquePaths(self, m: int, n: int) -> int:
                '''
                here, we naturally went to bottom-up DP - just be careful with grid size and for loops
                to simplify the boundary checks, we can use a m+1 x n+1 grid with padding with 0s
                '''

                dp = [[0] * (n + 1) for _ in range(m + 1)]
                dp[m - 1][n - 1] = 1
                
                for r in range(m - 1, -1, -1):
                    for c in range(n - 1, -1, -1):
                        dp[r][c] += dp[r + 1][c] + dp[r][c + 1]

                return dp[0][0]

=== "Python (optimized)"

        :::python
        class Solution:
            def uniquePaths(self, m: int, n: int) -> int:
                '''
                optimize now

                notice how, for each cell we visit, we only need 2 values (the one below and the one to the right)
                we knew this already, but can we use this to save some space?

                imagine:

                ----------
                |  | X| 2| X -> I don't need the whole grid, just the 2 values marked here
                ----------
                |  | 4|  |
                ----------        
                |  |  | 1|
                ----------

                and think about how we visit the grid:

                ----------
                |  | X|<<|
                ->>>>>>>^-
                |^<|<<|<<|
                ->>>>>>>^-        
                |^<|<<| 1|
                ----------

                when can I "forget" about a value in the grid? after I processed the one to the left (done immediately after) AND the one above (done in the next row)

                this means I have to keep one value in the dp for the "duration" of one row - it's not representing the row itself (this can be confusing)

                ----------
                |  |  |  |
                ----------
                |  |  | X|
                ->>>>>>>^-        
                |^<|<<| 1|
                ----------

                r = 2, c = 2 -> base case -> dp = [0, 0, 1] 
                r = 2, c = 1 -> look at dp[c] (the one below) and dp[c+1] (the one to the right) -> dp = [0, 1, 1]
                r = 2, c = 0 -> look at dp[c] (the one below) and dp[c+1] (the one to the right) -> dp = [1, 1, 1]
                
                r = 1, c = 2 -> look at dp[c] (the one below) and dp[c+1] (the one to the right, out) -> dp = [1, 1, 1] -> I can now safely overwrite

                '''

                dp = [0] * (n + 1)
                dp[n - 1] = 1
                
                for r in range(m - 1, -1, -1):
                    for c in range(n - 1, -1, -1):
                        dp[c] = dp[c] + dp[c + 1]

                return dp[0]

=== "Java"

        :::java

## Complexity

- **Time**: $O(m \times n)$ _as we iterate through each cell and compute the number of paths in $O(1)$ with DP_
- **Space**: $O(m \times n)$ _as we are storing the DP grid_

!!! note ""
    where $m$ and $n$ are the inputs

## Key Takeaways
