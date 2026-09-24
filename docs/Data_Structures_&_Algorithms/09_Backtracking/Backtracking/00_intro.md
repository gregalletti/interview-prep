---
title: Overview
summary: 
---
**Backtracking** is a general algorithmic technique for exploring the space of candidate solutions by building them **incrementally**, one choice at a time, and **abandoning ("backtracking" from) a partial candidate as soon as it can't possibly lead to a valid solution**. It is essentially a **depth-first search over a decision tree**, with pruning:

    choose → explore → un-choose

## Core Concepts

At each node of the tree, you pick one option, recurse into the resulting state, and - once that branch is exhausted - undo the choice before trying the next option. This is what distinguishes it from plain brute force: instead of generating every full candidate and checking it at the end, backtracking checks partial candidates and cuts a branch the moment it becomes infeasible ("prune early").

    Subsets of [1, 2, 3]                (choose / skip 1 → choose / skip 2 → ...)

                            []
                    /                  \
                [1]                   []
                /     \               /    \
            [1,2]     [1]          [2]      []
            /   \      /  \        /  \     /  \
    [1,2,3] [1,2] [1,3] [1]  [2,3] [2] [3]  []

## Key Points

Backtracking **is** exhaustive search - it explores (a pruned subset of) the entire search space, so it's exponential in the worst case. Pruning reduces the *practical* cost, not the worst-case complexity class.

The three ingredients of every backtracking solution:

1. **Choice**: what are the options at this step?
2. **Constraint**: is the partial candidate still valid? (prune here)
3. **Goal**: when is a candidate complete?

**State must be undone.** Whatever you mutate to make a choice (add to a list, mark a cell visited, place a queen) must be reverted after recursing, so sibling branches start from a clean state. This is the step people forget.

Backtracking vs. related techniques:

- **Brute force:** generates every complete candidate, then filters. Backtracking prunes mid-way, so it's brute force *plus early termination*.
- **DFS on a graph:** backtracking is DFS on an implicit tree of decisions, not on a given graph structure.
- **Dynamic programming:** applies when subproblems overlap and can be cached; backtracking is for problems without that overlap (or where the state space is too large/irregular to memoize), typically producing *all* solutions or searching a constraint space.
- **Greedy:** commits to a choice permanently; backtracking commits *tentatively* and can undo it.

**Pruning is what makes backtracking usable.** Order choices to fail fast (try the most constrained option first), and check constraints as early as possible rather than only at the leaves.

Typical outputs: all valid solutions, one solution (stop at first success), the count of solutions, or the optimal one under some objective.

### Typical Use Cases

| Use case | What's being decided at each step |
|---|---|
| Permutations / combinations / subsets | Which unused element to place next |
| N-Queens | Which column to place a queen in for the current row |
| Sudoku solver | Which digit to place in the next empty cell |
| Word search / maze / path finding | Which adjacent cell to move to next |
| Combination Sum / partition problems | Include or skip the next candidate number |
| Graph coloring | Which color to assign to the next vertex |
| Generate parentheses / valid expressions | Whether to place `(`, `)`, or another token next |

## Common Implementation

- **Path-building** (permutations, N-Queens, subsets): the recursion carries an index/position and a running partial solution; the base case is "index reached the end" or "board fully filled".
- **Include/exclude** (subsets, combination sum, partition): at each element, branch into "take it" and "don't take it".

### Standard Pruning Techniques

- **Constraint propagation:** check validity as soon as a partial choice is made (e.g., column/diagonal clashes in N-Queens), not only when the candidate is complete.
- **Sort first:** in sum/combination problems, sorting lets you `break` out of a loop early once the remaining candidates can only overshoot.
- **Bounding:** compare the best achievable outcome from the current partial state against the best known solution so far, and prune if it can't win (used in optimization variants, related to branch-and-bound).
- **Deduplication:** when input contains duplicates, skip a candidate if it's identical to the previous sibling already tried at this depth, to avoid producing duplicate solutions.
- **Memoization on top of backtracking:** if the same state recurs across branches, caching results turns exponential search into polynomial (this is where backtracking and DP intersect).
