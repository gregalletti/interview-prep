---
title: "🟠 Combination Sum"
external_links:
    NeetCode: https://neetcode.io/problems/combination-target-sum
---
!!! note ""
    You are given an array of distinct integers `nums` and a target integer `target`. Your task is to return a list of all unique combinations of `nums` where the chosen numbers sum to `target`.
    
    <span/>

    The same number may be chosen from nums an unlimited number of times. Two combinations are the same if the frequency of each of the chosen numbers is the same, otherwise they are different.
    
    You may return the combinations in any order and the order of the numbers in each combination can be in any order.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints
    - All elements of nums are distinct.
    - 1 <= nums.length <= 20
    - 2 <= nums[i] <= 30
    - 2 <= target <= 30

## Analysis

We can consider this as the textbook example of backtracking. As we just learned in the [Overview](./00_intro.md), we should immediately think about a decision tree: we have a target to reach and an initial state, and at each node of the tree we make a decision *"do we include this element in the combination?"*

Each decision creates a different branch, and at some point we'll either reach the target state or conclude that the path is a dead end.

We need to have a precise vision of the decision tree, in particular let's try to clearly define the 3 key elements:

1. Choice: **which element of `nums` do we include?**
2. Constraint: **is the partial result less than `target`?**
3. Goal: **is the partial result equal to `target`?**

*Don't ask me why, but I started implementing this iteratively.* We'll analyze this solution and then move to the recursive one (you can see both solutions below in Python, Java solution will only be recursive).

The main concept doesn't change (explore all combinations follow the path until invalid or target is reached), except for the fact that backtracking is normally implemented recursively because of its nature: follow one path at a time, not all of them at the same time.

Before we start, a quick point on the initial state `(result, combination, startIndex)` which we set to `(0, [], 0)`: the current result is `0`, the current chosen combination is empty `[]`, and the starting index is `0` as well. But what's exactly `startIndex` and why do we need it? 

Instead of allowing all possible combinations (for example take `nums = [2,5,6,9]`, include `2` and then `5` - another combination includes `5` and then `2`), we can make sure to never generate the same combination in different orders. And we can do so by allowing only future choices from that point onward (if we chose `5`, then we can only choose `5` again, `6` or `9` - we can't go back to `2`). At the same time we're not losing that specific combination, it will just be handled by the previous choice including the `2` (include `2`, then we are free to choose the others).

That's exactly the reason why the `for i in range(startIndex, len(nums)):` loop is like this - it was initially implemented as `for n in nums:` but this was allowing repetitions. This is faster by design as it saves loops iterations, but it also eliminates the need of removing duplicates at the end.

The rest of the algorithm is quite straightforward, just iterate on the choices (which we modify during the iteration, small hack) and explore all the possibilities by checking the Contraint and Goal - if neither is reached, just add the current combination in `choices` and continue iterating.

*Why the recursive version then?* As mentioned, using recursion follows the basic principle of backtracking, but also solves one subtle problem of the iterative approach: all possible `choices` are stored and cost extra space. If we use recursion, we explore one path at a time, either reach the target or prune the branch, and only then explore the next path.

This prevents the extra memory to grow too much by using the recursion stack for **one specific decision branch**, not all of them.

The recursive solution follows the same basic concept of course, but has some small important changes. We start from the same initial state and has the same main checks, except for the additional check on `i >= len(nums)`: this is needed since `i` is no more controlled by a `for` loop, but can grow indefinitely.

The recursive calls have a simple meaning: they represent the choice to either we the current element from `nums` (1st call) or not (2nd call). In the former case we of course have to update the current result and combination, while we keep them as the are in the latter case.

## Solution

=== "Python (iterative)"

        :::python
        class Solution:
            def combinationSum(self, nums: List[int], target: int) -> List[List[int]]:
                choices = [(0, [], 0)]
                ans = []

                for candidate in choices:
                    current, combination, startIndex = candidate
                    for i in range(startIndex, len(nums)):
                        result = current + nums[i]

                        if result > target:
                            continue
                        elif result == target:
                            ans.append(combination + [nums[i]])
                        else:
                            choices.append((result, combination + [nums[i]], i))
                return ans

=== "Python (recursive)"

        :::python
        class Solution:
            def combinationSum(self, nums: List[int], target: int) -> List[List[int]]:
                ans = []

                def backtrack(current: int, combination: List[int], i: int) -> None:
                    if i >= len(nums) or current > target:
                        return
                    if current == target:
                        ans.append(combination.copy())
                        return

                    combination.append(nums[i])
                    backtrack(current + nums[i], combination, i)
                    combination.pop()
                    backtrack(current, combination, i + 1)

                backtrack(0, [], 0)
                return ans

=== "Java"

        :::java
        class Solution {

            List<List<Integer>> ans;
            int t;

            public List<List<Integer>> combinationSum(int[] nums, int target) {
                ans = new ArrayList<>();
                t = target;
                backtrack(nums, 0, new ArrayList<>(), 0);
                return ans;    
            }

            private void backtrack(int[] nums, int current, List<Integer> combination, int i) {
                if (i >= nums.length || current > t) {
                    return;
                } 
                if (current == t) {
                    ans.add(new ArrayList<>(combination));
                    return;
                }

                combination.add(nums[i]);
                backtrack(nums, current + nums[i], combination, i);
                combination.remove(combination.size() - 1);
                backtrack(nums, current, combination, i + 1);
            }
        }

## Complexity

Not today.

- **Time**: $O()$ _as we  _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways

- If you observe the recursive approach, the `choose → explore → un-choose` patter is very clear - but we need to be careful when modifying objects. 
- In Pyhon `combination.append(nums[i])` chooses, then we call backtracking (explore), and after that `combination.pop()` un-chooses. For the second backtracking call, we don't need any of this since the choice is *don't include*.
- In Java we do the exact same. Just remember that we don't have a handy pop method but we remove the element by the index, so `combination.remove(combination.size() - 1);`
- Both of the above instructions have a side effect, which is the fact that they actually modify the `combination` object. This means that `ans` might be affected, since if it's a valid combination we're appending to it. We can make sure no side effect gets triggered **by appending a copy of the combination**: `ans.append(combination.copy())` in Python and `ans.add(new ArrayList<>(combination));` in Java.
- In theory, this can be avoided in Python by passing `combination + [nums[i]]` instead because this is **creating a copy** of the original `combination` list. Still works, but does not show the backtracking logic as explicit as the other approach.
