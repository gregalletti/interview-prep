---
title: Overview
summary: 
---
A bit too generic.

For now, just refer to both [Advanced Concepts](../../03_advanced.md) and [Named Algorithms](../../03_algorithms.md) .

## Shortest Path

### Quick Triggers

First ask: *what kind of weights?*

- **Non-negative weights** → Dijkstra
- **Negative weights** → Bellman-Ford / SPFA

Then:

- **Need predictable worst-case performance** → Bellman-Ford
- **Want queue-based optimization and can tolerate bad worst cases** → SPFA

### Implementation Trigger

Think about **what the algorithm processes**:

| Algorithm        | Think                                    | Natural input  |
| ---------------- | ---------------------------------------- | -------------- |
| **Dijkstra**     | "Give me neighbors of this node"         | Adjacency list |
| **Bellman-Ford** | "Give me every edge"                     | Edge list      |
| **SPFA**         | "Give me neighbors of this updated node" | Adjacency list |

### One-liner to Memorize

- **Dijkstra** = cheapest node first → heap + adjacency list
- **Bellman-Ford** = repeatedly scan edges → edge list
- **SPFA** = updated nodes first → queue + adjacency list
