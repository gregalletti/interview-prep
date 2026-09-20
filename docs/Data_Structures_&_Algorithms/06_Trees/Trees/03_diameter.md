---
title: "🟢🟠 Diameter of Binary Tree"
external_links:
    NeetCode: https://neetcode.io/problems/binary-tree-diameter
---
!!! note ""
    The **diameter** of a binary tree is defined as **the length of the longest path between any two nodes within the tree**. 

    <span/>
    
    The path does not necessarily have to pass through the root.

    The length of a path between two nodes in a binary tree is the number of edges between the nodes. Note that the path can not include the same node twice.

    Given the root of a binary tree `root`, return the diameter of the tree.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints
    - `1 <= number of nodes in the tree <= 100`
    - `-100 <= Node.val <= 100`

## Analysis

> Why 🟢🟠? This problem mixes standard DFS and recursion with a global variable management - it can be tricky.

Let's try to break down the definition of diameter and how we can compute it: for a given node, we can consider the diameter passing by it as the longest path on the left side plus the longest path on the right side.

Conveniently, the path lenght is the height of the (sub)tree starting from the current node.

This means that for each node, we can think about a DFS search which first explores the left side, then the right side, and then returns the diameter. So this problem becomes a relatively standard DFS implementation, with a tweak on the diameter computation: we keep track of the global largest diameter as we traverse.

We need to be careful, at every node:

        node
       /    \
    left    right

The longest path through that node is:

    height(left) + height(right)

while the height returned to the parent is:

    1 + max(height(left), height(right))

**That's an important pattern to recognize**. You'll see the same post-order DFS + return information upward + update a global answer pattern in many tree problems.

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
            def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
                diameter = 0

                def computeHeight(curr: TreeNode) -> int:
                    if not curr:
                        return 0
                    
                    maxLeft = computeHeight(curr.left)
                    maxRight = computeHeight(curr.right)
                    currDiameter = maxLeft + maxRight

                    nonlocal diameter
                    diameter = max(diameter, currDiameter)
                    return 1 + max(maxLeft, maxRight)

                computeHeight(root)
                return diameter

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
            int diameter = 0;

            public int diameterOfBinaryTree(TreeNode root) {

                computeHeight(root);
                return diameter;
            }

            private int computeHeight(TreeNode curr) {
                if (curr == null)
                    return 0;
                
                int maxLeft = computeHeight(curr.left);
                int maxRight = computeHeight(curr.right);
                int currDiameter = maxLeft + maxRight;

                diameter = Math.max(diameter, currDiameter);
                return 1 + Math.max(maxLeft, maxRight);
            }
        }

## Complexity

- **Time**: $O(n)$ _as we visit each node of the tree once_
- **Space**: $O(n)$ _as we store the entire tree in the recursion stack if unbalanced_, $O(log(n))$ otherwise

!!! note ""
    where $n$ is number of nodes in the tree

## Key Takeaways

- Both Python and Java can run out of stack space with deep recursion, but Python has an explicit recursion limit while Java relies on the JVM thread stack size.
- For typical binary-tree problems, recursive DFS is fine, but extremely deep/skewed trees can cause `RecursionError` in Python or `StackOverflowError` in Java.
- Java is `pass-by-value`, and primitive int values cannot be modified by a recursive function and have that modification persist outside the function.
- The Java solution therefore has a different way to manage the `diameter` variable. Using a class variable works for now, but another common workaround is to pass a one-element array instead as arrays are mutable.
