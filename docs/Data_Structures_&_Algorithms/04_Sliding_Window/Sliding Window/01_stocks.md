---
title: "🟢 Buy and Sell Stock"
external_links:
    NeetCode: https://neetcode.io/problems/buy-and-sell-crypto
---
!!! note ""

    You are given an integer array `prices` where `prices[i]` is the price of NeetCoin on the `ith` day.

    You may choose a single day to buy one NeetCoin and choose a different day in the future to sell it.

    Return the maximum profit you can achieve. You may choose to not make any transactions, in which case the profit would be 0.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    | `[10,1,5,6,7,1]` | `6` | Buy `prices[1]` and sell `prices[4]`, profit = 7 - 1 = 6 |
    | `[10,8,7,5,2]` | `0` | No profitable transactions can be made, thus the max profit is 0 |

    ### Constraints
    - `1 <= prices.length <= 100`
    - `0 <= prices[i] <= 100`

## Analysis

Classic problem. The main intuition here is that we don't need to check every possible combination explicitely. What we want to do instead is to keep the lowest price we encountered (when we will buy) in this way we can maximize the profit once by selling when price is higher.

In this way we do not encounter issues when maximizing the sell price, like common cases of max price is before min price (not a valid transaction).

We iterate the prices and always store the lowest. We also calculate the _current_ profit and store the maximim one. The tricky part here might be the initialization, but we can just set `lowestPrice` to the first element of the array. The first iteration of the loop will just calculate the profit, which will of course be 0.

## Solution

=== "Python"

        :::python
        class Solution:
            def maxProfit(self, prices: List[int]) -> int:
                maxProfit = 0
                lowestPrice = prices[0]

                for p in prices:
                    lowestPrice = min(lowestPrice, p)
                    maxProfit = max(maxProfit, p - lowestPrice)

                return maxProfit
=== "Java"

        :::java
        class Solution {
            public int maxProfit(int[] prices) {
                int maxProfit = 0;
                int lowestPrice = prices[0];

                for (int p : prices) {
                    lowestPrice = Math.min(lowestPrice, p);
                    maxProfit = Math.max(maxProfit, p - lowestPrice);
                }

                return maxProfit;
            }
        }

## Complexity

- **Time**: $O(n)$ _as we iterate the array once_
- **Space**: $O(1)$ _as we do not store anything_

!!! note ""
    where $n$ is the length of the input array `prices`.
