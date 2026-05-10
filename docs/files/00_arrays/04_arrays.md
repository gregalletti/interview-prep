# [Products of Array Except Self](https://neetcode.io/problems/products-of-array-discluding-self/question?list=neetcode150)

## Statement

!!! note ""
    Given an integer array `nums`, return an array `output` where `output[i]` is the product of all the elements of `nums` except `nums[i]`.

    Each product is guaranteed to fit in a 32-bit integer.

    **Follow-up:** Could you solve it in $O(n)$ time without using the division operation?

    ### Examples

    | Example | Input | Output |
    | --- | --- | --- |
    | 1 | `[1,2,4,6]` | `[48,24,12,8]` |
    | 2 | `[-1,0,1,2,3]` | `[0,-6,0,0,0]` |

    ### Constraints

    - 2 <= nums.length <= 1000
    - -20 <= nums[i] <= 20


## Analysis
Let's play along the problem statement and try to solve it with division first (we exclude the naive approach). We can calculate the total product of the array, and then for each element, divide the total product by that element to get the result. 

However, we need to be careful with zeros, as they would make the total product zero and lead to division by zero errors. We can count the number of zeros in the array. If there are more than one zero, then all products will be zero. If there is exactly one zero, then all products except the one corresponding to the zero will be zero, and the product for the zero will be the total product of the non-zero elements. If there are no zeros, we can simply divide the total product by each element.

Let's think about the follow up and try an approach without division. It's clear that we need to reuse some calculations, but we won't be able to reuse the total product anymore. The best we can do it to split the product, and the only remaining way we have is to split between left and right (call them prefix and suffix).

**Prefix[i]**: products of all elements _before_ the current element i.

**Suffix[i]**: products of all elements _after_ the current element i.

|   |   |   |   |   |   |
|---|---|---|---|---|---|
| Example  | <span style="color:#ce9178">-1</span>  | <span style="color:#ce9178">0</span>  | 1  | <span style="color:#4ec9b0">2</span>  |  <span style="color:#4ec9b0">3</span>  |
| Prefix  |  1 | -1  |  <span style="color:#ce9178">0</span>  |  0  |  0  |
| Suffix  |  0  | 6  |  <span style="color:#4ec9b0">6</span>  |  3  |  1  |
| Solution  |  0  | -6  |  <span style="color:#4ec9b0">0</span>  |  0  |  0  |

So if we take i=2 as an example, the product of all elements except nums[2] would be Prefix[2] * Suffix[2] = 0 * 6 = 0

Best way to do this is to pre-calculate the prefix and suffix and then just multiply them together.

**Extra optimization**: we can calculate the prefix and suffix on the fly, without needing to store them in separate arrays. We do so by calculating the prefix in the ans array, and then calculating the suffix in reverse order while updating the ans array. This is however a bit tricky as we have to keep track of the suffix in a separate variable, can't rely on the ans array for that as we are updating it in place.

## Solution
### Division approach
=== "Python"

    ```python
    class Solution:
        def productExceptSelf(self, nums: List[int]) -> List[int]:
            tot = 1
            zeros = 0
            ans = []
            for n in nums:
                if n != 0:
                    tot *= n
                else:
                    zeros += 1
            if zeros > 1:
                return [0] * len(nums)
            elif zeros == 1:
                ans = [0] * len(nums)
                for i in range(len(nums)):
                    if nums[i] == 0:
                        ans[i] = tot
            else:
                for i in range(len(nums)):
                    ans.append(tot // nums[i])
            
            return ans
    ```
=== "Java"

    ```java
    class Solution {
        public int[] productExceptSelf(int[] nums) {
            int tot = 1;
            int zeros = 0;
            int[] ans = new int[nums.length]; // initialized with 0s by default

            for (int n : nums) {
                if (n != 0) { 
                    tot *= n;
                }
                else {
                    zeros++;
                }
            }

            if (zeros > 1) {
                return ans;
            }
            else if (zeros == 1) {
                for (int i = 0; i < nums.length; i++) {
                    if (nums[i] == 0) {
                        ans[i] = tot;
                    }
                }
            } else {
                for (int i = 0; i < nums.length; i++) {
                    ans[i] = tot / nums[i];
                }
            }
            return ans;
        }
    }  
    ```

### Complexity
$O(n)$ time complexity as we iterate twice through the array

$O(n)$ space complexity as we are storing the result in a separate array of length n

### Prefix and Suffix approach
=== "Python"

    ```python
    class Solution:
        def productExceptSelf(self, nums: List[int]) -> List[int]:
            n = len(nums)
            left, right, ans = [0] * n, [0] * n, [0] * n
            left[0], right[n - 1] = 1, 1

            for i in range(1, n):
                left[i] = left[i - 1] * nums[i - 1]

            for i in range(n - 2, -1, -1):
                right[i] = right[i + 1] * nums[i + 1]

            for i in range(n):
                ans[i] = left[i] * right[i]
            return ans
    ```

=== "Java"

    ```java
    class Solution {
        public int[] productExceptSelf(int[] nums) {
            int n = nums.length;
            int[] ans = new int[n];
            int[] left = new int[n];
            int[] right = new int[n];

            left[0] = 1;
            right[n - 1] = 1;

            for (int i = 1; i < nums.length; i++) {
                left[i] = left[i - 1] * nums[i - 1];
            }

            for (int i = n - 2; i > -1 ; i--) {
                right[i] = right[i + 1] * nums[i + 1];
            }

            for (int i = 0; i < nums.length; i++) {
                ans[i] = left[i] * right[i];
            }
            return ans;
        }
    }  
    ```

### Complexity
$O(n)$ time complexity as we iterate twice through the array

$O(n)$ space complexity as we are storing the result, prefix and suffix in separate arrays of length n

### Prefix and Suffix (optimized) approach
=== "Python"

    ```python
    class Solution:
        def productExceptSelf(self, nums: List[int]) -> List[int]:
            n = len(nums)
            ans = [0] * n
            ans[0] = 1

            for i in range(1, n):
                ans[i] = ans[i - 1] * nums[i - 1]

            suffix = 1
            for i in range(n - 2, -1, -1):
                suffix *= nums[i + 1]
                ans[i] *= suffix

            return ans
    ```



=== "Java"

    ```java
    class Solution {
        public int[] productExceptSelf(int[] nums) {
            int n = nums.length;
            int[] ans = new int[n];

            ans[0] = 1;

            for (int i = 1; i < nums.length; i++) {
                ans[i] = ans[i - 1] * nums[i - 1];
            }

            int suffix = 1;
            for (int i = n - 2; i > -1 ; i--) {
                suffix *= nums[i + 1];
                ans[i] *= suffix;
            }

            return ans;
        }
    }  
    ```

## Complexity
$O(n)$ time complexity as we iterate twice through the array

$O(n)$ space complexity as we are storing the result in a separate array of length n

## TODO
- Optimize Java solution using computeIfAbsent() instead of putIfAbsent() + get()
- Update complexity analysis to reflect accurate O(n * k log k) where n = number of strings, k = average string length
- Add Analysis section explaining the grouping strategy
