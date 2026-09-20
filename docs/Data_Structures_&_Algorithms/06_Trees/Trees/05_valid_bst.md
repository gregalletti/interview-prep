---
title: "🟠 Valid Binary Search Tree"
external_links:
    NeetCode: https://neetcode.io/problems/valid-binary-search-tree
---
!!! note ""
    Given the `root` of a binary tree, return `true` if it is a valid binary search tree, otherwise return `false`.

    <span/>

    A valid binary search tree satisfies the following constraints:

    - The left subtree of every node contains only nodes with keys less than the node's key.
    - The right subtree of every node contains only nodes with keys greater than the node's key.
    - Both the left and right subtrees are also binary search trees.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

Not sure why, but this felt way easier than the previous problems - probably it's just a matter of getting familiar with recursion and traversals.

The idea is: for each node we will always have a range of acceptable values, so let's keep that and pass it down to the recursion. We can initialize those two variables `minimum` and `maximum` based on constraints, `-1000000000` and `1000000000`.

We call the `dfs` now, and if the current node is `null` we can always consider it as valid. Then we check if the value of the current node is in the range: if not, we know this is not valid and return `false` immediately.

If yes, we continue the recursion. The important part is the return value here: we want both sides to be valid (hence the `and`), but even more important is the range update.

- if we perform recursion on the **left** side, we want to update `maximum`, so that we assert *all nodes on the left side have a smaller value*
- if we perform recursion on the **right** side, we want to update `minimum`, so that we assert *all nodes on the right side have a larger value*

## Solution

=== "Python"

        :::python
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right

        class Solution:
            def isValidBST(self, root: Optional[TreeNode]) -> bool:
                
                def dfs(node: Optional[TreeNode], minimum: int, maximum: int) -> bool:
                    if not node:
                        return True
                    if minimum < node.val < maximum:
                        return dfs(node.left, minimum, node.val) and dfs(node.right, node.val, maximum)
                    else:
                        return False

                return dfs(root, -1000000000, 1000000000)

=== "Java"

        :::java
        /**
        * Definition for a binary tree node.
        * public class TreeNode {
        *     int val;
        *     TreeNode left;
        *     TreeNode right;
        *     TreeNode() {}
        *     TreeNode(int val) { this.val = val; }
        *     TreeNode(int val, TreeNode left, TreeNode right) {
        *         this.val = val;
        *         this.left = left;
        *         this.right = right;
        *     }
        * }
        */

        class Solution {
            public boolean isValidBST(TreeNode root) {
                return dfs(root, -1000000000, 1000000000);        
            }

            private boolean dfs(TreeNode node, int minimum, int maximum) {
                if (node == null)
                    return true;
                if (minimum < node.val && node.val < maximum)
                    return (dfs(node.left, minimum, node.val) && dfs(node.right, node.val, maximum));
                else
                    return false;
            }
        }

## Complexity

- **Time**: $O(n)$ _as we visit each node once_
- **Space**: $O(n)$ _as in the worst case of a fully unbalanced tree we will have all nodes on the recursion stack_

!!! note ""
    where $n$ is the number of nodes in the tree

## Key Takeaways

- Java requires both comparisons explicitly with `&&`, while Python allows chained comparisons like `minimum < node.val < maximum`.
- As always, in Python we have no issues with the maximum (and minimum) integer value we can handle.
- In Java, we might have issues with max and min - but not in this case as `Integer.MAX_VALUE = 2147483647` which is larger that the maximum value from the constraints (`1000000000`). Always check for this.

## Note on *MAX and MIN values*

### Integer Types

| Type    | Minimum | Maximum |
| ------- | ------------------ | ------------------ |
| `byte`  | `Byte.MIN_VALUE` = `-128` | `Byte.MAX_VALUE` = `127` |
| `short` | `Short.MIN_VALUE` = `-32,768` | `Short.MAX_VALUE` = `32,767` |
| `int`   | `Integer.MIN_VALUE` = `-2,147,483,648` | `Integer.MAX_VALUE` = `2,147,483,647` |
| `long`  | `Long.MIN_VALUE` = `-9.22 × 10¹⁸` | `Long.MAX_VALUE` = `9.22 × 10¹⁸` |

### Floating-Point Types

> For `float` and `double`, `MIN_VALUE` means the **smallest positive value greater than 0**, not the most negative value.

| Type     | Most Negative       | Smallest Positive                   | Largest Positive                   |
| -------- | ------------------- | ----------------------------------- | ---------------------------------- |
| `float`  | `-Float.MAX_VALUE`  | `Float.MIN_VALUE` ≈ `1.4 × 10⁻⁴⁵`   | `Float.MAX_VALUE` ≈ `3.4 × 10³⁸`   |
| `double` | `-Double.MAX_VALUE` | `Double.MIN_VALUE` ≈ `4.9 × 10⁻³²⁴` | `Double.MAX_VALUE` ≈ `1.8 × 10³⁰⁸` |

### Conclusion

Rule of Thumb:

- Use int when the constraints guarantee the value fits within int (*can any intermediate calculation stay within ~2.1 billion?*).
- Use long when a sum, product, distance, or other intermediate calculation might exceed Integer.MAX_VALUE.
- If you're unsure and overflow is plausible, use long and briefly explain why.

Drawbacks of long:

- Memory: long uses 8 bytes vs int's 4 bytes.
- Type compatibility: Array indices and many APIs expect int.
- Intent: int communicates that a value is known to fit within 32 bits.
- Performance: long can theoretically be slightly more expensive, but this is usually irrelevant in LeetCode/interviews.

For floating point:

- `float/double` are much less common and usually only appear when the problem explicitly requires floating-point arithmetic (never happened so far, but good to remember anyways).
- Remember the difference with integer types as it's the tricky part, actual max and min values should not be a problem since the ranges are huge.
