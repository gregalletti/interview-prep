---
title: "🟠 Islands and Treasure"
external_links:
    NeetCode: https://neetcode.io/problems/islands-and-treasure
---
!!! note ""
    You are given a $m×n$ 2D `grid` initialized with these three possible values:

    - `-1`: A water cell that can not be traversed.
    - `0`: A treasure chest.
    - `INF`: A land cell that can be traversed. We use the integer `2^31 - 1 = 2147483647` to represent `INF`.
    
    <span/>

    Fill each land cell with the distance to its nearest treasure chest. If a land cell cannot reach a treasure chest then the value should remain INF.

    Assume the grid can only be traversed up, down, left, or right.

    Modify the `grid` in-place.

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
            def islandsAndTreasure(self, grid: List[List[int]]) -> None:
                ROWS, COLS = len(grid), len(grid[0])
                directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

                q = deque()

                # add all treasure cells as starting points
                for r in range(ROWS):
                    for c in range(COLS):
                        if grid[r][c] == 0:
                            q.append((r, c))

                # multi-source BFS
                while q:
                    r, c = q.popleft()

                    for dr, dc in directions:
                        newR, newC = r + dr, c + dc

                        if (newR < 0 or newR >= ROWS or
                            newC < 0 or newC >= COLS or
                            grid[newR][newC] != 2147483647):
                            continue

                        grid[newR][newC] = grid[r][c] + 1
                        q.append((newR, newC))

=== "Java"

        :::java

## Complexity

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways
