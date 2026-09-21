---
title: Named Algorithms
summary: Most famous must-know algorithms
---
Implement once, know complexity, know the trigger.

## Graph algorithms
- BFS / DFS — foundational traversal, everything else builds on this.
- Dijkstra's algorithm — single-source shortest path, non-negative weights, $O((V+E) \log V)$ with a heap. Trigger: weighted shortest path.
- Bellman-Ford — shortest path tolerating negative weights, $O(VE)$. Trigger: negative edges explicitly allowed.
- Floyd-Warshall — all-pairs shortest path, $O(V³)$. Trigger: small graph, need distances between every pair.
- Prim's algorithm — minimum spanning tree, greedy + priority queue. Trigger: MST, "connect all nodes at minimum cost."
- Kruskal's algorithm — MST via sorted edges + Union-Find. Trigger: same MST family as Prim's, different approach.
- Topological Sort — ordering under dependency constraints. Trigger: "course prerequisites," build order, dependency resolution.
- Union-Find (Disjoint Set Union) — connectivity/cycle detection. Trigger: "are these connected," dynamic connectivity, underlies Kruskal's.

## String algorithms
- KMP (Knuth-Morris-Pratt) — $O(n+m)$ substring search. Trigger: beat brute-force string matching, implement strStr() properly.
- Z-function — pattern occurrence / string periodicity in $O(n)$. Trigger: find all occurrences of a pattern, period detection.
- Rabin-Karp — rolling-hash substring search. Trigger: alternative to KMP, duplicate-substring detection.
- Manacher's algorithm — longest palindromic substring in $O(n)$. Trigger: palindrome problems where $O(n²)$ is explicitly too slow.

## Math / number theory
- Sieve of Eratosthenes — generate primes up to N in $O(n\log \log n)$. Trigger: many primality checks needed.
- Binary (fast) exponentiation — modular power in $O(\log n)$. Trigger: "mod 10^9+7," large power computations.
- Euclidean algorithm (GCD/LCM) — baseline number theory, often a sub-step in bigger problems.

## Search technique
- Binary search on the answer — searching the answer space, not the array. Trigger: "minimize the maximum" / "find smallest X such that condition holds."

## Classic design-and-implement questions
- LRU Cache — hashmap + doubly linked list.
- LFU Cache — same family, one tier up in difficulty.
