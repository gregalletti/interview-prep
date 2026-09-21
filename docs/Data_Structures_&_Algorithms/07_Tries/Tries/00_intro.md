---
title: Overview
summary: Prefix tree and operations
---
A **trie** (also *prefix tree* or *digital tree*) is a rooted tree that stores a set of strings so that each node represents a **prefix** shared by all keys below it. Edges are labeled with a symbol (usually a character); the path from the root to a node spells out that node's prefix. A flag on a node marks whether the prefix is also a **complete key** (ends the word).

```
Keys: "car", "card", "care", "cat", "dog"

root
├── c
│   └── a
│       ├── r*        ("car")
│       │   ├── d*    ("card")
│       │   └── e*    ("care")
│       └── t*        ("cat")
└── d
    └── o
        └── g*        ("dog")

* = end-of-word flag set
```

## Key Concepts

- **Lookup cost depends on key length `L`, not on the number of keys `N`.**
- Common prefixes are stored once, which saves space when keys overlap heavily.
- Natively supports **prefix queries** (autocomplete, "starts with", prefix counting) — something hash maps cannot do.
- A DFS visiting children in sorted order yields keys in **lexicographic order**.
- No hashing and no collisions; behavior is deterministic (no rehash spikes).
- The root represents the empty string. Any node can carry extra data (a count, a value, a "best suggestion" pointer).
- **Weakness:** memory. Each node carries a child container, so a trie is often far larger than a hash set of the same keys, and pointer-chasing is cache-unfriendly.
- If you only need exact-match lookups, a hash map is simpler and usually faster in practice.

### Typical Use Cases

| Use case | Why a trie fits |
|---|---|
| Autocomplete / typeahead | Walk to the prefix node, enumerate the subtree |
| Spell checking, dictionary lookup | Fast membership and prefix pruning |
| Word games (Boggle, Scrabble solvers) | Prune the search as soon as a prefix has no continuation |
| IP routing (longest-prefix match) | Bitwise trie over address bits |
| Prefix counting / "most frequent word with prefix" | Store counters on nodes |
| Bitwise problems (max XOR pair) | Binary trie over the bits of the numbers |

### Common Variants

- **Compressed trie / radix tree / Patricia trie** — collapses single-child chains into one edge labeled with a substring. Far fewer nodes.
- **Ternary search tree** — each node has three links (<, =, >); much more memory-efficient than array-based tries.
- **Double-array trie / HAT-trie** — compact, cache-friendly, used in production tokenizers and dictionaries.
- **DAWG (minimal acyclic automaton)** — also merges shared *suffixes*; static dictionaries only.
- **Suffix trie / suffix tree** — indexes all suffixes of one string (substring search).

## Common Implementation

Each node holds:

1. a **children map** (symbol → child node)
2. an **`isEnd` flag** (optionally a count or value).

Choice of child container:

| Container | Time per step | Memory | Best for |
|---|---|---|---|
| Fixed array (`[26]` for `a–z`) | $O(1)$ | $O(σ)$ per node, even if empty | Small, fixed alphabet; speed-critical |
| Hash map | $O(1)$ average | Only existing children (+ map overhead) | Large or unknown alphabet (Unicode) — the default choice |
| Sorted map (`TreeMap`, sorted list) | $O(\log σ)$ | Only existing children | Need ordered children without sorting at query time |

### Operations

- **Insert:** walk the key, creating missing nodes; set `isEnd` on the last node.
- **Search:** walk the key; succeed only if the path exists **and** `isEnd` is set.
- **Starts-with:** walk the prefix; succeed if the path exists.
- **Delete:** walk the key, clear `isEnd`, then prune upward while a node has no children and is not an end node.
- **Enumerate by prefix:** walk to the prefix node, then DFS the subtree collecting keys.

## Complexity

Let `L` = key length, `N` = number of keys, `M` = total characters over all keys, `σ` = alphabet size, `K` = number of nodes in the subtree being enumerated.

| Operation | Time | Notes |
|---|---|---|
| Insert | $O(L)$ | $O(L)$ with array children; $O(L)$ average with hash-map children |
| Search | $O(L)$ | |
| Starts-with | $O(L)$ | |
| Delete | $O(L)$ | Includes pruning |
| Enumerate all keys with a prefix | $O(L + K)$ | Add $O(K \log σ)$ if children must be sorted at query time |
| Space | $O(σ · M)$ worst case (array children) | $O(M)$ nodes with map children; ≤ M + 1 nodes total |

Comparison for `N` string keys of length up to `L`:

| Structure | Exact lookup | Prefix query | Ordered iteration |
|---|---|---|---|
| Trie | $O(L)$ | $O(L + K)$ | Yes |
| Hash map | $O(L)$ avg | $O(N · L)$ scan | No |
| Sorted array / balanced BST | $O(L\log N)$ | $O(L\log N + results)$ | Yes |
