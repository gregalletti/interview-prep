---
title: "🟠 Cheapest Flight Path"
external_links:
    NeetCode: https://neetcode.io/problems/cheapest-flight-path
---
!!! note ""
    There are `n` airports, labeled from `0` to `n - 1`, which are connected by some flights. You are given an array `flights` where `flights[i] = [from_i, to_i, price_i]` represents a one-way flight from airport `from_i` to airport `to_i` with cost `price_i`. You may assume there are no duplicate flights and no flights from an airport to itself.

    <span/>

    You are also given three integers `src`, `dst`, and `k` where:

    - `src` is the starting airport
    - `dst` is the destination airport
    - `src != dst`
    - `k` is the maximum number of stops you can make (not including `src` and `dst`)

    Return the cheapest price from `src` to `dst` with at most `k` stops, or return `-1` if it is impossible.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

## Solution

=== "Python (Bellman-Ford)"

        :::python
        class Solution:
            def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
                '''
                think about the prereq:
                - all edges have non-negative weight
                - we have a source node (and also a destination)
                - we want to get the shortest path

                this already points to Dijkstra, but let's consider other possibilities
                it's not really true, since Dijkstra does not really care about the number of stops - just about the shortest path

                one option is to modify Dijkstra so that we ignore longer paths, but let's go with the other solution

                we know another algorithm that finds shortest paths starting from a source node, and conveniently also explores each path length at a time: Bellman-Ford
                remember, this works on edges and therefore we can use the input directly
                '''

                dist = [float("inf") for _ in range(n)]
                dist[src] = 0

                for stops in range(k + 1):
                    newDist = dist.copy()
                    for from_i, to_i, price_i in flights:
                        if dist[from_i] != float("inf") and dist[from_i] + price_i < newDist[to_i]:
                            newDist[to_i] = dist[from_i] + price_i
                    dist = newDist
                return dist[dst] if dist[dst] != float("inf") else -1

=== "Python (SPFA)"

        :::python
        class Solution:
            def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
                '''
                just trying to improve the Bellman-Ford solution, we can use a queue to only explore updated nodes
                this is called SPFA (Shortest Path Faster Algorithm)
                '''

                graph = defaultdict(list)
                for from_i, to_i, price_i in flights:
                    graph[from_i].append((to_i, price_i))

                dist = [float("inf") for _ in range(n)]
                dist[src] = 0

                queue = deque([(0, src, 0)]) # price, node, stops

                while queue:
                    price, node, stops = queue.popleft()
                    if stops > k:
                        continue
                    for destination, weight in graph[node]:
                        if price + weight < dist[destination]:
                            dist[destination] = price + weight
                            queue.append((dist[destination], destination, stops + 1))

                return dist[dst] if dist[dst] != float("inf") else -1

=== "Java"

        :::java

## Complexity

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways
