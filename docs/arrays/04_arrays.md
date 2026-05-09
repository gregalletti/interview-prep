# [Products of Array Except Self](https://neetcode.io/problems/products-of-array-discluding-self/question?list=neetcode150)

## Statement
>Given an integer array nums, return an array output where output[i] is the product of all the elements of nums except nums[i].
>
>Each product is guaranteed to fit in a 32-bit integer.
>
>Follow-up: Could you solve it in O(n) time without using the division operation?
>
>Example 1:
>
>Input: nums = [1,2,4,6]
>
>Output: [48,24,12,8]
>Example 2:
>
>Input: nums = [-1,0,1,2,3]
>
>Output: [0,-6,0,0,0]
>Constraints:
>
>2 <= nums.length <= 1000
>-20 <= nums[i] <= 20


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

So if we take i=2 as an example, the product of all elements except nums[2] would be Prefix[2] * Suffix[2] = 0 * 6 = 0

Best way to do this is to pre-calculate the prefix and suffix and then just multiply them together.

**Extra optimization**: we can calculate the prefix and suffix on the fly, without needing to store them in separate arrays. We do so by calculating the prefix in the ans array, and then calculating the suffix in reverse order while updating the ans array.

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
                return ans
            else:
                for i in range(len(nums)):
                    ans.append(tot // nums[i])
                return ans
    ```
=== "Java"

    ```java

    ```

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

    ```

### Prefix and Suffix (optimized) approach
=== "Python"

    ```python

    ```



=== "Java"

    ```java

    ```

## Complexity
$O(n + m)$ time complexity as we iterate once through the 2 strings

$O(1)$ space complexity as we are storing at most all the English characters in the hashmap, hence 26

## TODO
- Optimize Java solution using computeIfAbsent() instead of putIfAbsent() + get()
- Update complexity analysis to reflect accurate O(n * k log k) where n = number of strings, k = average string length
- Add Analysis section explaining the grouping strategy
