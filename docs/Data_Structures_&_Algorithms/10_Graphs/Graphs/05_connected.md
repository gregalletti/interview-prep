---
title: "🟠 Count Connected Components"
external_links:
    NeetCode: https://neetcode.io/problems/count-connected-components
---
!!! note ""

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

TODO: Union Find

## Solution

=== "Python"

        :::python
        class Solution:
            def countComponents(self, n: int, edges: List[List[int]]) -> int:
                graph = defaultdict(list)

                for n1, n2 in edges:
                    graph[n1].append(n2)
                    graph[n2].append(n1)

                '''
                [[0,1],[1,2],[3,4]]

                0: [1]
                1: [0, 2]
                2: [1]
                3: [4]
                4: [3]
                '''

                def dfs(node: int) -> None:
                    for neighbor in graph[node]:
                        if neighbor not in visited:
                            visited.add(neighbor)
                            dfs(neighbor)

                visited = set()
                ans = 0

                for node in range(n):
                    if node not in visited:
                        visited.add(node)
                        dfs(node)
                        ans += 1
                return ans

=== "Java"

        :::java

## Complexity

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways
