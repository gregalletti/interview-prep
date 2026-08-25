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

### Naive Approach

One thing is crystal clear based on the definition of median: we need to find the middle element, so we need to identify the number of elements which (in a theoretical merged array) are on the left side. This is equal to half of the number of elements in the merged array $n + m / 2$. _Let's not worry about the odd/even case for now._

I initially thought about some sort of merge sort approach without merging, where I would calculate the total number of elements, pick half of it from the first array and half from the second array. Then compare the last element of the first partition with the first element outside the second partition, and vice versa, to see if we have the correct partition. If not, we would move the partition by one in one of the arrays and repeat the process. This approach basically a two pointer approach, but of course it's linear time complexity, which is not optimal. In the worst case we will have $O(min(m, n))$ time complexity as we are traversing the smallest array.

See the following example:

```text
A = [10, 20, 30]
B = [1, 2, 3, 4, 5, 6, 7, 8, 9]

Total = 3 + 9 = 12
Target = 12 // 2 = 6
```

We want the left side of the merged array to contain exactly 6 elements. A natural first guess is to take 3 from A and 3 from B.

```text
A = [10, 20, 30 | ]
             P1 = 3

B = [1, 2, 3 | 4, 5, 6, 7, 8, 9]
          P2 = 3

A[P1] is ignored because there is no right-side element in A
B[P2 - 1] = 3

A[P1 - 1] = 30
B[P2]     = 4

30 > 4 -> partition is invalid, move P1 left.
```

Try the next partition:

```text
A = [10, 20 | 30]
         P1 = 2

B = [1, 2, 3, 4 | 5, 6, 7, 8, 9]
             P2 = 4

A[P1]     = 30
B[P2 - 1] = 4

4 <= 30 -> partition is valid, but we need to check the other side as well.

A[P1 - 1] = 20
B[P2]     = 5

20 > 5 -> partition is still invalid, move P1 left again.
```

Try again:

```text
A = [10 | 20, 30]
     P1 = 1

B = [1, 2, 3, 4, 5 | 6, 7, 8, 9]
                P2 = 5

A[P1]     = 20
B[P2 - 1] = 5

5 <= 20 -> partition is valid, but we need to check the other side as well.

A[P1 - 1] = 10
B[P2]     = 6

10 > 6 -> partition is invalid, move P1 left one more time.
```

Now we get the valid partition:

```text
A = [ | 10, 20, 30]
   P1 = 0

B = [1, 2, 3, 4, 5, 6 | 7, 8, 9]
                   P2 = 6

A[P1]     = 10
B[P2 - 1] = 6

6 <= 10 -> partition is valid, but we need to check the other side as well.

A[P1 - 1] is ignored because there is no left-side element in A
B[P2]     = 7
```

This is the correct partition, and the full left side is `[1, 2, 3, 4, 5, 6]`.

In this case we moved the partition one step at a time, which is $O(min(m, n))$ time complexity. This is a good intuition builder, but not optimal enough for the final solution.

We now have all the elements to implement a proper solution.

### Optimal Approach

The key intuition here to use binary search is that instead of moving the indices one by one, we can move them in a binary search fashion. We can start with the middle of the first array and calculate the corresponding index in the second array. Then we can check if the partition is valid or not (with the same method as before), and if not, we can move the index in the first array to the left or right half with binary search. This way we can reduce the search space by half each time instead of moving one by one, which gives us $O(log(min(m, n)))$ time complexity.

The game changer here is thinking about what we are actually searching for. We are not searching for a specific value as in a traditional binary search problem, but we are searching for a partition point. This is a very important distinction to make, and it took me a while to realize this.

As always, indices definition might be tricky. I personally prefer for this case to define them as the number of elements in the partition. So in a sorted array of size 3, the partition indices can be 0, 1, 2, or 3 (you can take 0, 1, 2, or all 3 elements from this array).

Let' walk through the same example again:

```text
A = [10, 20, 30]
B = [1, 2, 3, 4, 5, 6, 7, 8, 9]

Total = 3 + 9 = 12
Target = 12 // 2 = 6
```

We start with a middle split of A:

```text
A = [10 | 20, 30]
     P1 = 1

B = [1, 2, 3, 4, 5 | 6, 7, 8, 9]
                P2 = 5

A[P1]     = 20
B[P2 - 1] = 5

5 <= 20 -> partition is valid, but we need to check the other side as well.

A[P1 - 1] = 10
B[P2]     = 7

10 > 6 -> partition is invalid, the left side is too large
```

Move the partition to the left side of A and repeat the check:

```text
A = [ | 10, 20, 30]
   P1 = 0

B = [1, 2, 3, 4, 5, 6 | 7, 8, 9]
                   P2 = 6

A[P1]     = 10
B[P2 - 1] = 6

6 <= 10 -> partition is valid, but we need to check the other side as well.

A[P1 - 1] is ignored
B[P2]     = 7
```

This is now valid, so the correct partition is:

```text
A = [ | 10, 20, 30]
B = [1, 2, 3, 4, 5, 6 | 7, 8, 9]

P1 = 0
P2 = 6
```

The median is then `(6 + 7) / 2 = 6.5` since the total number of elements is **even**. In case of an **odd** total number, the median would be the minimum of the right side (the first element "left out" of the partition as it's the smallest one).

We need to be extra careful with the edge cases where we can have out of bounds indices, but not only because of errors, but also because of the valid partition check. For example, what we marked as "ignored" in the previous example is actually a valid partition, but we need to handle it carefully. We can use `-infinity` and `infinity` to represent the out of bounds values, which will always satisfy the valid partition check.

Why are we searching on the smaller array? First of all it makes the search faster, as we'll only search on a smaller amount of partitions. Moreover, it ensures the partition index in the larger array stays within bounds (when calculating `P2`).

## Solution

=== "Python"

        :::python
        class Solution:
            def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
                if len(nums2) < len(nums1):
                    A, B = nums2, nums1
                else:
                    A, B = nums1, nums2
                
                total = len(nums1) + len(nums2)
                target = total // 2
                isOdd = total % 2

                left, right = 0, len(A)
                while True:
                    P1 = left + (right - left) // 2
                    P2 = target - P1

                    A_in = A[P1 - 1] if (P1 - 1) >= 0 else float("-infinity")
                    A_out = A[P1] if P1 < len(A) else float("infinity")
                    B_in = B[P2 - 1] if (P2 - 1) >= 0 else float("-infinity")
                    B_out = B[P2] if P2 < len(B) else float("infinity")
                    
                    if (B_in <= A_out) and (A_in <= B_out):
                        # valid partition, calculate median
                        out = min(A_out, B_out)
                        return out if isOdd else (max(A_in, B_in) + out) / 2
                    elif B_in > A_out:
                        # partition on A is too small
                        left = P1 + 1
                    elif A_in > B_out:
                        # partition on A is too large
                        right = P1 - 1
=== "Java"

        :::java
        class Solution {
            public double findMedianSortedArrays(int[] nums1, int[] nums2) {
                int[] A;
                int[] B;

                if (nums2.length < nums1.length) {
                    A = nums2;
                    B = nums1;
                } else {
                    A = nums1;
                    B = nums2;
                }
                int total = nums1.length + nums2.length;
                int target = total / 2;
                boolean isOdd = total % 2 == 1;

                int left = 0;
                int right = A.length;
                
                while (true) {
                    int P1 = left + (right - left) / 2;
                    int P2 = target - P1;

                    int A_in = (P1 - 1) >= 0 ? A[P1 - 1] : Integer.MIN_VALUE;
                    int A_out = P1 < A.length ? A[P1] : Integer.MAX_VALUE;
                    int B_in = (P2 - 1) >= 0 ? B[P2 - 1] : Integer.MIN_VALUE;
                    int B_out = P2 < B.length ? B[P2] : Integer.MAX_VALUE;

                    if (B_in <= A_out && A_in <= B_out) {
                        // valid partition, calculate median
                        int out = Math.min(A_out, B_out);
                        return isOdd ? out : (Math.max(A_in, B_in) + out) / 2.0;
                    } else if (B_in > A_out) {
                        // partition on A is too small
                        left = P1 + 1;
                    } else if (A_in > B_out) {
                        // partition on A is too large
                        right = P1 - 1;
                    }
                }
            }
        }

## Complexity

- Time Complexity: $O(log(min(m, n)))$ time complexity _as we perform binary search on the smaller array_
- Space Complexity: $O()$ space complexity _as we don't use any extra space_

!!! note ""
    where $n$ is the length of $nums1$ and $m$ is the length of $nums2$

## Key Takeaways

- Python is more expressive here because `float("-infinity")` and `float("infinity")` give us clean sentinel values for empty partitions. Java uses `Integer.MIN_VALUE` and `Integer.MAX_VALUE` instead, which is a good reminder that primitive types need explicit handling for boundary cases.
- In Python, division produces a float automatically, so `(a + b) / 2` is correct for even-length totals. In Java, integer division would truncate, so the code must explicitly use `2.0` or a `double` expression.
