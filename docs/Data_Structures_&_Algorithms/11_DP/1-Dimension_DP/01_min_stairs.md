---
title: "🟢 Min Cost Climbing Stairs"
external_links:
    NeetCode: https://neetcode.io/problems/min-cost-climbing-stairs
---
!!! note ""
    You are given an array of integers `cost` where `cost[i]` is the cost of taking a step from the `ith` floor of a staircase. After paying the cost, you can step to either the `(i + 1)th` floor or the `(i + 2)th` floor.

    <span/>

    You may choose to start at the index `0` or the index `1` floor.

    Return the minimum cost to reach the top of the staircase, i.e. just past the last index in `cost`.

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
            def minCostClimbingStairs(self, cost: List[int]) -> int:
                '''
                [1,2,3]

                dp=[0 0 . . .] cost to get at position i -> get at position 0 or 1 for free
                i = 0 1 2 . .
                
                dp[0] = dp[1] = 0 by definition

                how can I get to position 2? from 0 with 2 steps (at cost input), or from 1 with one step

                dp[2] = dp[1] + cost[1] OR dp[0] + cost[0]
                dp[2] = 0 + 1 OR 0 + 2 => 1

                need one extra value for the dp to work, since we want to get past the last index

                dp[3] = dp[2] + cost[2] OR dp[1] + cost[1]
                dp[3] = 1 + 3 OR 0 + 2 => 2

                we are trying to minimize, so
                dp[2] = min(dp[1] + cost[1], dp[0] + cost[0])
                generalize
                dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])

                '''

                n = len(cost)

                dp = [0] * (n + 1)

                for i in range(2, len(dp)):
                    dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
                
                return dp[-1]

=== "Java"

        :::java

## Complexity

- **Time**: $O(n)$ _as we iterate through the array once_
- **Space**: $O(n)$ _as we store an array with length $n + 1$_

!!! note ""
    where $n$ is the length of the input array `cost`

## Key Takeaways
