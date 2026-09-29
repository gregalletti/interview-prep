---
title: "🟠 Number of Islands"
external_links:
    NeetCode: https://neetcode.io/problems/count-number-of-islands
---
!!! note ""
    Given a 2D grid `grid` where `'1'` represents land and `'0'` represents water, count and return the number of islands.
    
    <span/>

    An island is formed by connecting adjacent lands horizontally or vertically and is surrounded by water. You may assume water is surrounding the grid (i.e., all the edges are water).

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

TODO

## Solution

=== "Python"

        :::python
        class Solution:
            def numIslands(self, grid: List[List[str]]) -> int:
                ans = 0
                def dfs(r: int, c: int):
                    if r < 0 or r > len(grid) - 1:
                        return
                    if c < 0 or c > len(grid[0]) - 1:
                        return
                    if grid[r][c] == "0":
                        return

                    grid[r][c] = "0"
                    dfs(r + 1, c)
                    dfs(r - 1, c)
                    dfs(r, c + 1)
                    dfs(r, c - 1)            

                for row in range(len(grid)):
                    for col in range(len(grid[0])):
                        if grid[row][col] == "1":
                            dfs(row, col)
                            ans += 1
                return ans

=== "Java"

        :::java

## Complexity

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways
