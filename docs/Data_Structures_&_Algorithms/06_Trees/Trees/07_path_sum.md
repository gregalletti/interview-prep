---
title: "🔴 Binary Tree Maximum Path Sum"
external_links:
    NeetCode: https://neetcode.io/problems/binary-tree-maximum-path-sum
---
!!! note ""
    Given the `root` of a non-empty binary tree, return the maximum path sum of any non-empty path.

    <span/>
    
    A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can not appear in the sequence more than once. The path does not necessarily need to include the root.

    The path sum of a path is the sum of the node's values in the path.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

Again, I keep getting surprised: this took waaaay less than the previous problem. Let's break down my **full** thought process.

It's clear that we can't just iterate the tree and compute every possible path and check which one has the largest value. So I immediately thought about a bottom up approach: if we start from a leaf, the only path value is the leaf itself. This implicitely drives us towards a DFS approach, but let's continue for now.

When we go up one level, we can calculate the (partial, for that node) maximum path value as: `node.val + max(left, right)`, where `left` and `right` are the maximum values as well, both previously calculated if we think about leaves. Again, a leaf node will have this value as `node.val + 0 + 0 = node.val` - good, we have our base case for recursion.

Actually, it's not always true. A node can also choose both `left` and `right`, think about the first example.

So we can now update the formula as `node.val + max(left, 0) + max(right, 0)`. Why the max check with 0? Because since we want to maximize this value, if by including the below left or right part will lower our value, we don't want to include it at all.

I then wondered, would this affect our algorithm if we have all negative values? It's not really a problem, we're not comparing with 0 for that reason: our comparison with 0 is a include/not include choice, if it lowers the value even more, we still don't include.

Here I made **my first mistake**: for some reason I though that a path was valid only if it was made by at least 2 nodes, which is not really the case. The path definition is not excluding single nodes as paths, so if in doubt that's a good clarifying question during interviews.

Let's continue now. After implementing this I submitted and realized it was still wrong.

Here's my **second mistake**: I was considering all possible paths, including invalid ones - I probably need to read the problem statement more slowly. The key point here is: if we consider a specific node, the previous formula still holds: you can include `left`, `right`, or both. But as soon as we go up one level, this is not valid anymore!

Consider this example, when calculating for node `13`:

     13     -> partialSum_13 = 13 + 7 + 2 = 22, include both left and right
     / \
    7   2

Now let's go up one level to node `8`:

       8    -> partialSum_8 = 8 + partialSum_13 = 8 + 22 = 30
      /
     13
     / \
    7   2

> Remember: A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them.

Apparently I couldn't really understand this, so let's rephrase: a path isn't just a collection of connected nodes; it's a sequence where consecutive nodes are adjacent, and in a tree a simple path cannot branch or revisit a node. So in a way, take any path, I must be able to go from start to end and vice versa in a "linear" way.

`partialSum_8` would include 8, 13, 7 and 2 which makes the path invalid since you can't go from start to end in a linear way.

This means that when calculating a single node's `partialSum` we can still apply `node.val + max(left, 0) + max(right, 0)` because the current node will be in the middle (so we can go from left to right and viceversa), but this can't be used by the upper level as it is: we need to make a choice **before returning** - either we include `left` or `right`, not both.

What we return has to be `node.val + max(left, right)`, where I removed the 0 check just for simplicity.

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
            def maxPathSum(self, root: Optional[TreeNode]) -> int:
                maxPath = float("-infinity")

                def dfs(node):
                    if not node:
                        return 0

                    nonlocal maxPath
                    
                    left = max(dfs(node.left), 0)
                    right = max(dfs(node.right), 0)
                    partialSum = node.val + left + right
                    maxPath = max(maxPath, partialSum)
                    return node.val + max(left, right)

                dfs(root)
                return maxPath if maxPath != float("-infinity") else 0

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
            int maxPath = Integer.MIN_VALUE; // max value is 30000 * (+-)1000 so less than 2 billions

            public int maxPathSum(TreeNode root) {
                dfs(root);
                return (maxPath != Integer.MIN_VALUE) ? maxPath : 0;
            }

            private int dfs(TreeNode node) {
                if (node == null)
                    return 0;

                int left = Math.max(dfs(node.left), 0);
                int right = Math.max(dfs(node.right), 0);
                int partialSum = node.val + left + right;
                maxPath = Math.max(maxPath, partialSum);
                return node.val + Math.max(left, right);
            }
        }

=== "Java (pass result)"

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

            public int maxPathSum(TreeNode root) {
                int[] maxPath = new int[1]; 
                maxPath[0] = Integer.MIN_VALUE; // max value is 30000 * (+-)1000 so less than 2 billions
                dfs(root, maxPath);
                return (maxPath[0] != Integer.MIN_VALUE) ? maxPath[0] : 0;
            }

            private int dfs(TreeNode node, int[] maxPath) {
                if (node == null)
                    return 0;

                int left = Math.max(dfs(node.left, maxPath), 0);
                int right = Math.max(dfs(node.right, maxPath), 0);
                int partialSum = node.val + left + right;
                maxPath[0] = Math.max(maxPath[0], partialSum);
                return node.val + Math.max(left, right);
            }
        }


## Complexity

- **Time**: $O(n)$ _as we visit every node only once, it's a DFS_
- **Space**: $O(n)$ _as we store the entire tree in the recursion stack if unbalanced_, $O(\log(n))$ otherwise

!!! note ""
    where $n$ is the number of nodes in the tree

## Key Takeaways

- Java is `pass-by-value`, and primitive int values cannot be modified by a recursive function and have that modification persist outside the function. The second Java solution passes a one-element array instead of using a class varialbe `maxPath` as arrays are mutable.
