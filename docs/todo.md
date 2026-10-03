---
title: ⏳ The Plan
summary: Prioritizing the effort
---

## Preparatiom

### Tier 1: write from scratch, fluently

- Binary search, including lower/upper bound variants and binary search on the answer
- BFS and DFS (recursive and iterative) on graphs and grids, plus connected components and cycle detection
- Topological sort, both Kahn's (BFS) and DFS-based
- Union-Find with path compression and union by rank
- Dijkstra with a heap
- Two pointers and sliding window, including the "at most k distinct" family
- Heap patterns: top-k, merge k sorted lists, running median with two heaps
- Tree work: all traversals, BST insert/search/validate, lowest common ancestor, level order
- DP classics: 1D/2D tables, knapsack, LIS, LCS, edit distance, coin change, and top-down memoization as a fallback when you can't see the table
- Backtracking: subsets, permutations, combinations, with pruning
- Merge sort and partition (the quicksort step), since follow-ups love "derive merge sort, then distribute it"
- Structure patterns: prefix sums, monotonic stack/deque, trie, interval merging and sweep line, hash map counting
Also be able to design an LRU cache (hash map plus doubly linked list), since it's a perennial favorite.

### Tier 2: know how and when, implement with some effort

- Quickselect (kth element in O(n) expected)
- Bellman-Ford (negative edges, k-edge-limited paths) and 0-1 BFS
- Kruskal for a minimum spanning tree (easy once you have Union-Find) and Prim
- Bipartite check via BFS coloring
- Floyd-Warshall (all-pairs shortest paths, small graphs)
- Rabin-Karp / rolling hash and the idea behind KMP
- Fenwick tree and segment tree: know what range-query problem they solve and their complexity. L3 rarely requires coding them.
- Bit manipulation tricks: XOR for the single element, n & (n-1), bitmask subsets

### Tier 3: just know they exist

Tarjan/Kosaraju strongly connected components, A*, max-flow (Ford-Fulkerson), Manacher, Z-algorithm, suffix arrays, Aho-Corasick, convex hull, Hungarian algorithm. If one comes up, you should be able to say what problem it solves, even without the implementation.

## 1. Hashing, sorting, two pointers, sliding window
 
| Solved | In diary | Problem | Diff | Pattern signal |
|---|---|---|---|---|
| ✅ | ✅ | [Two Sum](https://neetcode.io/problems/two-integer-sum) | Easy | Hash map of seen values |
| ☐ | ☐ | [Group Anagrams](https://neetcode.io/problems/anagram-groups) | Medium | Group by canonical key |
| ☐ | ☐ | [Top K Frequent Elements](https://neetcode.io/problems/top-k-elements-in-list) | Medium | Count, then heap or bucket |
| ☐ | ☐ | [Longest Consecutive Sequence](https://neetcode.io/problems/longest-consecutive-sequence) | Medium | Set, start only at sequence heads |
| ☐ | ☐ | [Product of Array Except Self](https://neetcode.io/problems/products-of-array-discluding-self) | Medium | Prefix and suffix products |
| ☐ | ☐ | [3Sum](https://neetcode.io/problems/three-integer-sum) | Medium | **Sort** + two pointers |
| ☐ | ☐ | [Container With Most Water](https://neetcode.io/problems/max-water-container) | Medium | Two pointers, move the shorter side |
| ☐ | ☐ | [Best Time to Buy and Sell Stock](https://neetcode.io/problems/buy-and-sell-crypto) | Easy | Running minimum |
| ☐ | ☐ | [Longest Substring Without Repeating Characters](https://neetcode.io/problems/longest-substring-without-duplicates) | Medium | Sliding window + set/map |
| ☐ | ☐ | [Longest Repeating Character Replacement](https://neetcode.io/problems/longest-repeating-substring-with-replacement) | Medium | Window valid if size minus max count $\le k$ |
| ☐ | ☐ | [Minimum Window Substring](https://neetcode.io/problems/minimum-window-with-characters) | Hard | Sliding window with counts (do last) |
| ☐ | ☐ | [Valid Parentheses](https://neetcode.io/problems/validate-parentheses) | Easy | Stack |
| ☐ | ☐ | [Daily Temperatures](https://neetcode.io/problems/daily-temperatures) | Medium | Monotonic stack |
 
## 2. Intervals (sorting unlocks)
 
| Solved | In diary | Problem | Diff | Pattern signal |
|---|---|---|---|---|
| ☐ | ☐ | [Merge Intervals](https://neetcode.io/problems/merge-intervals) | Medium | **Sort** by start, then neighbor check |
| ☐ | ☐ | [Insert Interval](https://neetcode.io/problems/insert-new-interval) | Medium | Three phases: before, overlapping, after |
| ☐ | ☐ | [Non-overlapping Intervals](https://neetcode.io/problems/non-overlapping-intervals) | Medium | **Sort** by end, greedy |
| ☐ | ☐ | [Meeting Rooms II](https://neetcode.io/problems/meeting-schedule-ii) | Medium | **Sort** + min-heap or sweep line |
 
## 3. Binary search
 
| Solved | In diary | Problem | Diff | Pattern signal |
|---|---|---|---|---|
| ☐ | ☐ | [Binary Search](https://neetcode.io/problems/binary-search) | Easy | Get the bounds and loop invariant right |
| ☐ | ☐ | [Search in Rotated Sorted Array](https://neetcode.io/problems/find-target-in-rotated-sorted-array) | Medium | One half is always sorted |
| ☐ | ☐ | [Find Minimum in Rotated Sorted Array](https://neetcode.io/problems/find-minimum-in-rotated-sorted-array) | Medium | Compare mid with the right end |
| ☐ | ☐ | [Koko Eating Bananas](https://neetcode.io/problems/eating-bananas) | Medium | Binary search on the answer |
| ☐ | ☐ | [Time Based Key-Value Store](https://neetcode.io/problems/time-based-key-value-store) | Medium | Map to sorted list + binary search |
 
## 4. Graphs: BFS/DFS (highest yield)
 
| Solved | In diary | Problem | Diff | Pattern signal |
|---|---|---|---|---|
| ☐ | ☐ | [Number of Islands](https://neetcode.io/problems/count-number-of-islands) | Medium | Grid DFS/BFS, connected components |
| ☐ | ☐ | [Max Area of Island](https://neetcode.io/problems/max-area-of-island) | Medium | Same, return the size |
| ☐ | ☐ | [Clone Graph](https://neetcode.io/problems/clone-graph) | Medium | DFS/BFS with old-to-new map |
| ☐ | ☐ | [Rotting Oranges](https://neetcode.io/problems/rotting-fruit) | Medium | Multi-source BFS by levels |
| ☐ | ☐ | [Pacific Atlantic Water Flow](https://neetcode.io/problems/pacific-atlantic-water-flow) | Medium | Search backwards from the borders |
| ☐ | ☐ | [Surrounded Regions](https://neetcode.io/problems/surrounded-regions) | Medium | Mark border-connected cells first |
| ☐ | ☐ | [Course Schedule](https://neetcode.io/problems/course-schedule) | Medium | Cycle detection / Kahn's algorithm |
| ☐ | ☐ | [Course Schedule II](https://neetcode.io/problems/course-schedule-ii) | Medium | Topological order |
| ☐ | ☐ | [Number of Connected Components in an Undirected Graph](https://neetcode.io/problems/count-connected-components) | Medium | Union-Find or DFS |
| ☐ | ☐ | [Redundant Connection](https://neetcode.io/problems/redundant-connection) | Medium | Union-Find, cycle edge |
| ☐ | ☐ | [Word Ladder](https://neetcode.io/problems/word-ladder) | Hard | BFS on an implicit graph |
| ☐ | ☐ | [Network Delay Time](https://neetcode.io/problems/network-delay-time) | Medium | Dijkstra with a heap |
 
## 5. Heaps and design
 
| Solved | In diary | Problem | Diff | Pattern signal |
|---|---|---|---|---|
| ☐ | ☐ | [Kth Largest Element in an Array](https://neetcode.io/problems/kth-largest-element-in-an-array) | Medium | Size-k heap or quickselect |
| ☐ | ☐ | [K Closest Points to Origin](https://neetcode.io/problems/k-closest-points-to-origin) | Medium | Size-k max-heap |
| ☐ | ☐ | [Merge k Sorted Lists](https://neetcode.io/problems/merge-k-sorted-linked-lists) | Hard | Min-heap of list heads |
| ☐ | ☐ | [Find Median from Data Stream](https://neetcode.io/problems/find-median-in-a-data-stream) | Hard | Two heaps |
| ☐ | ☐ | [LRU Cache](https://neetcode.io/problems/lru-cache) | Medium | Hash map + doubly linked list |
 
## 6. Trees
 
| Solved | In diary | Problem | Diff | Pattern signal |
|---|---|---|---|---|
| ☐ | ☐ | [Maximum Depth of Binary Tree](https://neetcode.io/problems/depth-of-binary-tree) | Easy | Recursion |
| ☐ | ☐ | [Binary Tree Level Order Traversal](https://neetcode.io/problems/level-order-traversal-of-binary-tree) | Medium | BFS by level |
| ☐ | ☐ | [Lowest Common Ancestor of a Binary Search Tree](https://neetcode.io/problems/lowest-common-ancestor-in-binary-search-tree) | Medium | Use the BST ordering |
| ☐ | ☐ | [Validate Binary Search Tree](https://neetcode.io/problems/valid-binary-search-tree) | Medium | Carry min/max bounds |
| ☐ | ☐ | [Kth Smallest Element in a BST](https://neetcode.io/problems/kth-smallest-integer-in-bst) | Medium | In-order traversal |
 
## 7. Backtracking and DP
 
| Solved | In diary | Problem | Diff | Pattern signal |
|---|---|---|---|---|
| ☐ | ☐ | [Subsets](https://neetcode.io/problems/subsets) | Medium | Include/exclude recursion |
| ☐ | ☐ | [Permutations](https://neetcode.io/problems/permutations) | Medium | Used-set backtracking |
| ☐ | ☐ | [Combination Sum](https://neetcode.io/problems/combination-target-sum) | Medium | Backtracking with a start index |
| ☐ | ☐ | [Word Search](https://neetcode.io/problems/search-for-word) | Medium | Grid DFS + backtracking |
| ☐ | ☐ | [Climbing Stairs](https://neetcode.io/problems/climbing-stairs) | Easy | 1D DP warm-up |
| ☐ | ☐ | [House Robber](https://neetcode.io/problems/house-robber) | Medium | Take/skip DP |
| ☐ | ☐ | [Coin Change](https://neetcode.io/problems/coin-change) | Medium | Unbounded knapsack |
| ☐ | ☐ | [Longest Increasing Subsequence](https://neetcode.io/problems/longest-increasing-subsequence) | Medium | DP, then the binary search version |
| ☐ | ☐ | [Longest Common Subsequence](https://neetcode.io/problems/longest-common-subsequence) | Medium | 2D DP |
| ☐ | ☐ | [Word Break](https://neetcode.io/problems/word-break) | Medium | Prefix DP |
| ☐ | ☐ | [Edit Distance](https://neetcode.io/problems/edit-distance) | Medium | 2D DP |
| ☐ | ☐ | [Unique Paths](https://neetcode.io/problems/count-paths) | Medium | Grid DP |
 
## 8. Stretch (only if time allows)
 
| Solved | In diary | Problem | Diff | Pattern signal |
|---|---|---|---|---|
| ☐ | ☐ | [Implement Trie](https://neetcode.io/problems/implement-prefix-tree) | Medium | Prefix tree |
| ☐ | ☐ | [Task Scheduler](https://neetcode.io/problems/task-scheduling) | Medium | Greedy / heap |
| ☐ | ☐ | [Cheapest Flights Within K Stops](https://neetcode.io/problems/cheapest-flight-path) | Medium | Bellman-Ford |
| ☐ | ☐ | [Decode Ways](https://neetcode.io/problems/decode-ways) | Medium | 1D DP |
| ☐ | ☐ | [Partition Equal Subset Sum](https://neetcode.io/problems/partition-equal-subset-sum) | Medium | 0/1 knapsack |
 
## Bonus: the mock problem
 
| Solved | In diary | Problem | Diff | Pattern signal |
|---|---|---|---|---|
| ☐ | ☐ | [Alert Using Same Key-Card Three or More Times in a One Hour Period](https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/) | Medium | Group, **sort**, check $ts[i+k-1] - ts[i]$ |
