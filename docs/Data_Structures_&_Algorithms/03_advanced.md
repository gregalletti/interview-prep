---
title: Advanced Concepts
summary: More nieche concepts worth to know the gist of them
---
Awareness only, one sentence, no implementation.

## Algorithmic
- A* — Dijkstra plus a heuristic to bias search toward a known goal.
- NP-completeness recognition — know Traveling Salesman, 0/1 Knapsack, Subset Sum, Graph Coloring by shape, so you expect exponential/DP-over-subsets rather than hunting for a polynomial solution that doesn't exist.
- Aho-Corasick — trie + KMP failure links, for matching many patterns at once.

## Data structures
- Segment Tree — range query + range update in $O(\log n)$.
- Fenwick Tree / BIT — simpler cousin of segment tree, prefix-sum queries with point updates.
- Suffix Array/Tree — indexing structure for many substring queries on one string.
- Skip List — probabilistic alternative to a balanced BST.
- Bloom Filter — probabilistic set membership.

## Systems-adjacent
- Consistent hashing — how distributed caches/load balancers minimize rehashing on node changes.
- MapReduce — the general split/map/shuffle/reduce model (Google-originated, good to know cold here specifically).
