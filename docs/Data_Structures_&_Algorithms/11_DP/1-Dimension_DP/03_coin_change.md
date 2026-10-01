---
title: "🟠 Coin Change"
external_links:
    NeetCode: https://neetcode.io/problems/coin-change
---
!!! note ""
    You are given an integer array `coins` representing coins of different denominations (e.g. 1 dollar, 5 dollars, etc) and an integer `amount` representing a target amount of money.

    <span/>

    Return the fewest number of coins that you need to make up the exact target amount. If it is impossible to make up the amount, return `-1`.

    You may assume that you have an unlimited number of each coin.

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
            def coinChange(self, coins: List[int], amount: int) -> int:
                '''
                think of the problem as: how can I reach this specific amount?
                take one coin, compute amount - coin. then the problem is the same, how can I reach this?
                and so on.
                let's take coins = [1,5,10], amount = 12

                do I know how to get to 12? not yet, now choose
                try the coins in order if less than 12, so 1, do I know how to get to 12 - 1 = 11? not yet, choose again
                same reasoning, take 1, do I know how to get to 10? no
                take 1, we're now at 9. and so on

                so let's run it again:
                do I know how to get to 12? not yet, now choose (recursive), this is step 1:
                - take 1: newAmount = 11
                - take 5: newAmount = 7
                - take 10: newAmount = 2

                since we do dfs we go down the first branch all the way, and eventually reach 0 in this case:
                at the very last step, we are at newAmount = 1. we take coin 1 and reach 0:
                this means that we now know that we can reach amount 1 with 1 coin, so cache this, 1: 1

                now we return back to the previous call, where we were at amount = 2:
                - take 1: we already know that we can reach 1 with 1 coin, so 1 + 1 = 2
                - take 5: not possible
                - take 10: not possible

                so cache 2: 2 and return 2

                important: how do we know that the value we put in the cache is actually the minimum? because we only cache an amount after we have tried every possible coin for that amount.
                
                for example, when solving 7:
                - take 1 -> solve 6 completely 
                - take 5 -> solve 2 completely
                - take 10 -> not possible
                only after all of these possibilities have been checked do we have the minimum value for 7, so we can safely do: cache[7] = minSteps
                this also means that when we later see 7 again and find it in the cache, we know it has already been completely solved, so we can safely return the cached minimum without checking the other coins again.
                '''

                cache = {}

                def dfs(amount):
                    if amount == 0:
                        return 0

                    if amount in cache:
                        return cache[amount]

                    minSteps = float("infinity")
                    for coin in coins:
                        if (amount - coin) >= 0:
                            candidate = 1 + dfs(amount - coin) # how many steps if I take the current coin?
                            if candidate < minSteps:
                                minSteps = candidate

                    cache[amount] = minSteps
                    return minSteps

                ans = dfs(amount)
                return ans if ans != float("infinity") else -1

=== "Java"

        :::java

## Complexity

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways
