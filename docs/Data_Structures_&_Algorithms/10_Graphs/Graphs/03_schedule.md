---
title: "🟠 Course Schedule"
external_links:
    NeetCode: https://neetcode.io/problems/course-schedule
---
!!! note ""
    You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`.

    <span/>

    The pair `[0, 1]`, indicates that must take course `1` before taking course `0`.


    There are a total of `numCourses` courses you are required to take, labeled from `0` to `numCourses - 1`.


    Return `true` if it is possible to finish all courses, otherwise return `false`.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

## Solution

=== "Python"

        :::python
        class Solution:
            def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
                # create a graph course -> [prereq1, prereq2, ...]
                graph = {}
                for course, prereq in prerequisites:
                    graph.setdefault(course, []).append(prereq)

                def follow(course: int) -> bool:
                    # cycle detected, impossible to complete
                    if course in schedule:
                        return False

                    # course has no prereq, so it can be followed
                    if course not in graph or graph[course] == []:
                        return True

                    # add current course
                    schedule.add(course)
                    # follow each prereq
                    for prereq in graph.get(course, []):
                        if not follow(prereq):
                            return False

                    # we're at the end and we know this course can be followed, no need to check it again if it appears later
                    schedule.remove(course)
                    graph[course] = []
                    return True
                
                # keep track of the courses to detect cycles
                schedule = set()

                for c in graph:
                    if not follow(c):
                        return False
                return True

=== "Python (using set)"

        :::python
        class Solution:
            def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
                # create a graph course -> [prereq1, prereq2, ...]
                graph = {}
                for course, prereq in prerequisites:
                    graph.setdefault(course, []).append(prereq)

                def follow(course: int) -> bool:
                    # cycle detected, impossible to complete
                    if course in cycle:
                        return False

                    # course has no prereq, so it can be followed
                    if course not in graph or course in schedule:
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
                    return True
                
                # keep track of the courses to detect cycles
                cycle, schedule = set(), set()

                for c in graph:
                    if not follow(c):
                        return False
                return True

=== "Java"

        :::java

## Complexity

- **Time**: $O(V + E)$ _as we explore each course and its prerequisites only once_
- **Space**: $O(V + E)$ _as we store the courses and the prerequisites in the dictionary_

!!! note ""
    where $V$ is the number of courses and $E$ is the number of prerequisites

## Key Takeaways
