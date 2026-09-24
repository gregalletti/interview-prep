---
title: "🟠 Combination Sum II"
external_links:
    NeetCode: https://neetcode.io/problems/combination-target-sum-ii
---
!!! note ""
    You are given an array of integers `candidates`, which may contain duplicates, and a target integer `target`. Your task is to return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`.

    <span/>

    Each element from candidates may be chosen at most once within a combination. The solution set must not contain duplicate combinations.

    You may return the combinations in any order and the order of the numbers in each combination can be in any order.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

Being this a natural follow-up of the previous problem, we know we can reuse most of the code.

However, the small change to the input here has a huge impact on the solution: accepting duplicate values in the input will tear our previous solution apart. Other than that, we must ensure that *each element from candidates may be chosen at most once within a combination*.

The main logic is the same, backtrack and explore all possible choices. But we now have to pay attention to the actual combinations and make sure we are not creating invalid ones, for example:

With the previous code:

    :::python
    combination.add(nums[i]);
    backtrack(nums, current + nums[i], combination, i);
    combination.remove(combination.size() - 1);
    backtrack(nums, current, combination, i + 1);

With `candidates = [2, 2, 3]` we might end up with:

    choose and include the first '2'
    -> backtrack, same index 'i'
    choose and include the first '2' again
    -> backtrack, same index 'i'
    do not include the first '2' now        ==== A = [2, 2] VALID
    -> backtrack with index 'i + 1'
    choose and include the second '2'       ==== B = [2, 2, 2] INVALID
    ...

But why are we saying that combination `A` is valid if we said that we can only choose the same element once? Well yes it's the same element, but the choice is still allowed because we still have one '2' we can add (the next element).

As soon as we add the second one as well and have combination `B`, we now have 3 times '2', which is clearly invalid because* we don't have enough '2's*. So in a way we don't really care about the specific element, rather **how many times we can select that value without exceeding our capacity**.

This immediately brings us towards an hashmap which we can use to count the frequencies of the elements. During our exploration, we can check if we still have capacity for that element or not.

Good, we now solved the number of times we can choose a specific element as part of a combination, but we're still missing one crucial part: **we must make sure that we don't explore the same value multiple times as different choices**.

Consider again `candidates = [2, 2, 3]` and suppose we have already decided not to take the first '2' and we are now looking at the second '2'. From the perspective of the combination, however, nothing has changed. We are still making a decision about the value '2'.

If we treat both '2's as separate decision points, we can end up exploring the same combinations through different paths:

    choose and include the first '2'
    -> backtrack, same 'i'
    do not include the first '2' now
    -> backtrack with index 'i + 1'
    do not include the second '2'
    -> backtrack with index 'i + 1'
    choose and include the '3'              ==== A = [2, 3]


    do not include the first '2'
    -> backtrack with index 'i + 1'
    choose and include the second '2'
    -> backtrack, same 'i'
    do not include the second '2' now
    -> backtrack with index 'i + 1'
    choose and include the '3'              ==== B = [2, 3]

Duplicate input values lead to duplicate combinations, `A = B`, but we don't want them. That's why we should perform backtracking on the unique values from candidates, basically the same scenario of the previous problem.

## Solution

=== "Python"

        :::python
        class Solution:
            def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
                ans = []
                freq = {}
                unique = []

                for num in candidates:
                    if num not in freq:
                        unique.append(num)
                        freq[num] = 0
                    freq[num] += 1

                def backtrack(current: int, combination: List[int], i: int) -> None:
                    if i >= len(unique) or current > target:
                        return
                    if current == target:
                        ans.append(combination.copy())
                        return

                    if freq[unique[i]] > 0:
                        freq[unique[i]] -= 1
                        combination.append(unique[i]);
                        backtrack(current + unique[i], combination, i)
                        freq[unique[i]] += 1
                        combination.pop()

                    backtrack(current, combination, i + 1)

                backtrack(0, [], 0)
                return ans

=== "Java"

        :::java
        class Solution {
            
            List<List<Integer>> ans;
            Map<Integer, Integer> freq;
            int t;
            
            public List<List<Integer>> combinationSum2(int[] candidates, int target) {
                ans = new ArrayList<>();
                freq = new HashMap<>();
                t = target;

                List<Integer> unique = new ArrayList<>();
                for (int num : candidates) {
                    if (!freq.containsKey(num)) {
                        unique.add(num);
                        freq.put(num, 0);
                    }
                    freq.put(num, freq.get(num) + 1);
                }

                backtrack(unique, 0, new ArrayList<>(), 0);
                return ans;    
            }

            private void backtrack(List<Integer> unique, int current, List<Integer> combination, int i) {
                if (i >= unique.size() || current > t) {
                    return;
                } 
                if (current == t) {
                    ans.add(new ArrayList<>(combination));
                    return;
                }

                int currElement = unique.get(i);

                if (freq.get(currElement) > 0) {       
                    freq.put(currElement, freq.get(currElement) - 1);
                    combination.add(currElement);
                    backtrack(unique, current + currElement, combination, i);
                    freq.put(currElement, freq.get(currElement) + 1);
                    combination.remove(combination.size() - 1);
                }
                backtrack(unique, current, combination, i + 1);
            }
        }

## Complexity

Not today.

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways

- Since we created `unique` as `ArrayList`, I had to update the previous code to use the proper methods (such as `unique.get(i);` instead of `unique[i]`). This reminded me of how much those 2 objects differ: see the detailed analysis in the specific section in [Cheatsheet](../../00_cheatsheet.md).
