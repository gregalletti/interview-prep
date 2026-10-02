---
title: "🟠 Network Delay Time"
external_links:
    NeetCode: https://neetcode.io/problems/network-delay-time
---
!!! note ""
    You are given a network of `n` directed nodes, labeled from `1` to `n`. You are also given `times`, a list of directed edges where `times[i] = (ui, vi, ti)`.

    - `ui` is the source node (an integer from `1` to `n`)
    - `vi` is the target node (an integer from `1` to `n`)
    - `ti` is the time it takes for a signal to travel from the source to the target node (an integer greater than or equal to `0`).
    
    You are also given an integer `k`, representing the node that we will send a signal from.
    
    Return the minimum time it takes for all of the `n` nodes to receive the signal. If it is impossible for all the nodes to receive the signal, return `-1` instead.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

Not mandatory, but it's a perfect problem to finally learn Dijkstra's algorithm.

We know we can apply Dijkstra since all prerequisites are met:

- we have non-negative weights
- we have a source node

The implementation is almost identical to the textbook one, except:

- we have to build the adjacency list ourselves initially (`graph`)
- we have node values starting from 1, so we need to handle this properly in `dist`
- we care about **reaching every node with the shortest path**, so we check if each node is reachable or not (`ans == float("inf")`) before returning.

## Solution

=== "Python"

        :::python
        class Solution:
            def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
                graph = defaultdict(list)
                for source, destination, weight in times:
                    graph[source].append((destination, weight))

                # watch out, dist array is 0-indexed but the input is not
                # use n+1 and disregard index 0
                dist = [float("inf") for _ in range(n+1)]
                dist[k] = 0

                pq = [(0, k)]

                while pq:
                    currentWeight, current = heapq.heappop(pq)
                    
                    if currentWeight > dist[current]:
                        continue
                    for destination, weight in graph[current]:
                        newWeight = currentWeight + weight
                        if newWeight < dist[destination]:
                            dist[destination] = newWeight
                            heapq.heappush(pq, (newWeight, destination))
                ans = max(dist[1:])
                return -1 if ans == float("inf") else ans 
                        
=== "Java"

        :::java

## Complexity

- **Time**: $O(E \log V)$ _as we _
- **Space**: $O(V + E)$ _as we _

!!! note ""
    where $V$ is the number of vertices and $E$ is the number of edges

## Key Takeaways
