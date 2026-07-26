# [Container With Most Water](https://neetcode.io/problems/max-water-container/question?list=neetcode150)

!!! note ""
    You are given an integer array heights where heights[i] represents the height of the i-th bar.

    You may choose any two bars to form a container. Return the maximum amount of water a container can store.

    ### Examples
    
    | Example | Input | Output | Explanation |
    | --- | --- | --- | --- |
    | 1 | `[1,7,2,5,4,7,3,6]` | `36` | The container formed by the bars at index 1 and index 5 can store the most water. |
    | 2 | `[2,2,2]` | `4` | The container formed by the bars at index 0 and index 2 can store the most water. |

    ### Constraints
    - `2 <= height.length <= 1000`
    - `0 <= height[i] <= 1000`

## Analysis
Naive solution is quite intuitive, we can iterate through all the bars pairs and calculate the area, keeping track of the maximum. However, this would be O(n^2) time complexity, which is not optimal.

We can instead think about a different approach, and the category it's in is a hint. We can pick left and right bars, calculate the area, and move to the left or right depending on which bar is smaller (the smaller bar is limiting how much water we can store). This is now a trivial two pointers with O(n) time complexity solution, as we are iterating through the array only once.

## Solution
=== "Python"

    ```python
    class Solution:
        def maxArea(self, heights: List[int]) -> int:
            left, right = 0, len(heights) - 1
            ans = 0

            while (left < right):
                if heights[left] <= heights[right]:
                    ans = max(ans, heights[left] * (right - left))
                    left += 1
                else:
                    ans = max(ans, heights[right] * (right - left))
                    right -= 1
            return ans
    ```

=== "Java"

    ```java
    class Solution {
        public int maxArea(int[] heights) {
            int left = 0;
            int right = heights.length - 1;
            int ans = 0;

            while (left < right) {
                if (heights[left] <= heights[right]) {
                    ans = Math.max(ans, heights[left] * (right - left));
                    left++;
                }
                else {
                    ans = Math.max(ans, heights[right] * (right - left));
                    right--;
                }
            }
            return ans;
        }
    }
    ```

### Complexity
$O(n)$ time complexity as we iterate the string once ("half" from left and "half" from right)

$O(1)$ space complexity as we are not storing anything
