---
title: "🔴 Median of Two Arrays"
external_links:
    NeetCode: https://neetcode.io/problems/median-of-two-sorted-arrays
---
!!! note ""
    You are given two integer arrays `nums1` and `nums2` of size `m` and `n` respectively, where each is sorted in ascending order. Return the [median](https://en.wikipedia.org/wiki/Median) value among all elements of the two arrays.

    Your solution should run in $O(log(m+n))$ time.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    | `nums1 = [1,2], nums2 = [3]` | `2.0` | The merged array is [1,2,3], so the median is 2 |
    | `nums1 = [1,3], nums2 = [2,4]` | `2.5` | The merged array is [1,2,3,4], so the median is (2+3)/2 = 2.5 |

    ### Constraints
    - `nums1.length == m`
    - `nums2.length == n`
    - `0 <= m <= 1000`
    - `0 <= n <= 1000`
    - `1 <= m + n <= 2000`
    - `-10^6 <= nums1[i], nums2[i] <= 10^6`

## Analysis

I initially started with a sort of merge sort approach without merging, where I would calculate the total number of elements, pick half of it from the first array and half from the second array. Then compare the last element of the first partition with the first element outside the second partition, and vice versa, to see if we have the correct partition. If not, we would move the partition in one of the arrays and repeat the process. This approach basically a two pointer approach, but of course it's linear time complexity, which is not optimal. In the worst case we will have $O(min(m, n))$ time complexity as we are traversing the smallest array.

See the following example:

```text
A = [10, 20, 30]

B = [1, 2, 3, 4, 5, 6, 7, 8, 9]

Total = 3 + 9 = 12
```

Take half of 12 = 6, I initially take half from A and half from B, so P1 = 3 and P2 = 3.

```text
A = [10, 20, 30 | ]
             P1 = 3

B = [1, 2, 3 | 4, 5, 6, 7, 8, 9]
             P2 = 3

A[P1 - 1] = 30
B[P2]     = 4

30 > 4 -> partition is invalid, move P1 to the left, so P1 = 2 and P2 = 4.

A = [10, 20 | 30]
             P1 = 2

B = [1, 2, 3, 4 | 5, 6, 7, 8, 9]
                 P2 = 4
```

and continue until we get to P1 = 0 and P2 = 6, which is the correct partition.

In this case we traversed the entire array A (actually half of it, but doesn't really matter) which is $O(min(m, n))$ time complexity. Not bad but not even optimal, still it was a good exercise to understand the problem and the partitioning logic.

We now have all the elements to implement a proper solution.

The key intuition here to use binary search is that instead of moving the indices one by one, we can move them in a binary search fashion. We can start with the middle of the first array and calculate the corresponding index in the second array. Then we can check if the partition is valid or not (with the same method as before), and if not, we can move the index in the first array to the left or right half with binary search. This way we can reduce the search space by half each time instead of moving one by one, which gives us $O(log(min(m, n)))$ time complexity.

```text
A = [10 | 20, 30 ]
     P1 = 1

B = [1, 2, 3, 4, 5, 6 | 7, 8, 9]
                   P2 = 6 - 1 = 5

A[P1 - 1] = 10
B[P2]     = 6
```

10 > 6 -> partition is invalid, perform binary search on the left side of A

```text

A = [10, 20 | 30]
             P1 = 2

B = [1, 2, 3, 4 | 5, 6, 7, 8, 9]
                 P2 = 4

A[P1 - 1] = 20
B[P2]     = 5
```


20 > 5 -> partition is invalid, move P1 to the left

Perform binary search on the left side of A
```text

A = [10 | 20, 30]
     P1 = 1

B = [1, 2, 3, 4, 5 | 6, 7, 8, 9]
                 P2 = 5

A[P1 - 1] = 10
B[P2]     = 6

10 <= 6 -> left side is valid

Now check the other side:

B[P2 - 1] = 5
A[P1]     = 20

5 <= 20 -> right side is also valid

Therefore, we found the correct partition:

A = [10 | 20, 30]
B = [1, 2, 3, 4, 5 | 6, 7, 8, 9]

P1 = 1
P2 = 5
```

## Solution

=== "Python"

        :::python

=== "Java"

        :::java

## Complexity

- Time Complexity: $O()$ time complexity _as we _
- Space Complexity: $O()$ space complexity _as we _

!!! note ""
    where $n$ is 
