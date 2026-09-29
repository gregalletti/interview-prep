---
title: Overview
summary: Graph traversal and shortest path patterns
---
A **graph** is a set of nodes connected by edges - more general than a tree, since it can have cycles, multiple paths between two nodes, and no single root. Anything with a many-to-many relationship (a social network, a road map, a dependency chain) is naturally a graph.

The core difficulty is usually not the traversal itself, it's tracking what's already been visited (to avoid infinite loops on a cycle) and picking the right traversal for what the problem actually asks - shortest path, connectivity, or an ordering that respects dependencies.

## Core Concepts

- A graph is nodes (vertices) plus edges between them; unlike a tree, a node can have multiple parents and cycles are allowed
- **Directed vs undirected:** edges point one way, or both
- **Weighted vs unweighted:** edges may carry a cost, or just represent a connection
- **Representation:** adjacency list (map of node → neighbors, compact for sparse graphs) vs adjacency matrix ($O(1)$ edge lookup, but $O(V^2)$ space)
- A tree is just a connected, acyclic graph - everything that applies to trees is a special case of this

## Core Patterns

### 1. DFS (Depth-First Search)

Use for connectivity, path existence, or exploring every reachable node. Track `visited` explicitly - a graph can have cycles, a tree can't.

    :::python
    def dfs(graph, start):
        visited = set()
        result = []

        def visit(node):
            if node in visited:
                return
            visited.add(node)
            result.append(node)
            for neighbor in graph[node]:
                visit(neighbor)

        visit(start)
        return result

### 2. BFS (Breadth-First Search)

Use for shortest path in an unweighted graph - BFS explores in order of distance from the start, so the first time you reach a node is via a shortest path.

    :::python
    from collections import deque

    def bfs(graph, start):
        visited = {start}
        queue = deque([start])
        order = []
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return order

### 3. Topological Sort

Use for ordering nodes so every edge points forward - build dependency graphs, course schedules. Only valid on a DAG; if the result is shorter than the node count, there's a cycle.

    :::python
    from collections import deque

    def topological_sort(num_nodes, graph):
        in_degree = [0] * num_nodes
        for node in graph:
            for neighbor in graph[node]:
                in_degree[neighbor] += 1

        queue = deque([n for n in range(num_nodes) if in_degree[n] == 0])
        order = []
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in graph[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        return order if len(order) == num_nodes else []  # shorter result means a cycle

### 4. Dijkstra (Shortest Path, Weighted)

Use for shortest path when edge weights are non-negative. A min-heap always expands the closest unvisited node next; stale heap entries are just skipped.

    :::python
    import heapq

    def dijkstra(graph, start):
        dist = {start: 0}
        heap = [(0, start)]
        while heap:
            d, node = heapq.heappop(heap)
            if d > dist.get(node, float('inf')):
                continue
            for neighbor, weight in graph[node]:
                nd = d + weight
                if nd < dist.get(neighbor, float('inf')):
                    dist[neighbor] = nd
                    heapq.heappush(heap, (nd, neighbor))
        return dist

## Common Methods and Notes

### Python

- Represent a graph as `graph = defaultdict(list)` (adjacency list), or a plain `dict[int, list[int]]`
- Always track `visited` explicitly - an unhandled cycle means infinite recursion or an infinite loop
- `heapq` for Dijkstra/Prim; `collections.deque` for BFS

### Java

- Adjacency list: `Map<Integer, List<Integer>> graph = new HashMap<>();` or `List<Integer>[] graph = new List[n];`
- `boolean[] visited` (or a `Set<Integer>`) to track visited nodes
- `PriorityQueue<int[]>` for Dijkstra; `Queue<Integer> queue = new LinkedList<>();` for BFS

## Quick Tips

- **Shortest path, unweighted:** BFS.
- **Shortest path, weighted, non-negative:** Dijkstra.
- **Ordering with dependencies (build systems, course prerequisites):** topological sort - no valid order means a cycle.
- **Just need connectivity, or "does a path exist":** DFS is usually simplest.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| DFS / BFS traversal | $O(V + E)$ | $O(V)$ | Visits every vertex and edge once |
| Adjacency list vs matrix space | $O(V + E)$ vs $O(V^2)$ | - | List wins for sparse graphs, matrix wins for dense ones with frequent edge lookups |
| Topological sort | $O(V + E)$ | $O(V)$ | Kahn's algorithm, BFS-based |
| Dijkstra (binary heap) | $O((V + E) \log V)$ | $O(V)$ | Heap holds up to $E$ entries in the worst case |