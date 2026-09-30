---
title: "🟠 Course Schedule II"
external_links:
    NeetCode: https://neetcode.io/problems/course-schedule-ii
---
!!! note ""
    You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`.

    <span/>

    For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.
    
    There are a total of `numCourses` courses you are required to take, labeled from `0` to `numCourses - 1`.
    
    Return a valid ordering of courses you can take to finish all courses. If there are many valid answers, return any of them. If it's not possible to finish all courses, return an empty array.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

TODO: Topological sort

## Solution

=== "Python"

        :::python
        class Solution:
            def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
                # create a graph course -> [prereq1, prereq2, ...]
                graph = {}
                for course, prereq in prerequisites:
                    graph.setdefault(course, []).append(prereq)

                def follow(course: int) -> bool:
                    # cycle detected, impossible to complete
                    if course in cycle:
                        return False

                    # course has been analyzed already
                    if course in schedule:
                        return True

                    # add current course
                    cycle.add(course)
                    # follow each prereq
                    for prereq in graph.get(course, []):
                        if not follow(prereq):
                            return False

                    # we're at the end and we know this course can be followed, no need to check it again if it appears later
                    cycle.remove(course)
                    schedule.add(course)
                    # add it to the completed ones
                    ans.append(course)
                    return True
                
                # keep track of the courses to detect cycles
                schedule, cycle = set(), set()
                ans = []

                for c in range(numCourses):
                    if not follow(c):
                        return []
                return ans

=== "Java"

        :::java

## Complexity

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways
