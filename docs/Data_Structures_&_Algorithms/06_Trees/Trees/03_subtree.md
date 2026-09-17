---
title: "🟢 Subtree of Another Tree"
external_links:
    NeetCode: https://neetcode.io/problems/subtree-of-a-binary-tree
---
!!! note ""

    Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.
    A subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints
    - The number of nodes in the `root` tree is in the range `[1, 2000]`
    - The number of nodes in the `subRoot` tree is in the range `[1, 1000]`
    - `-10^4 <= root.val <= 10^4`
    - `-10^4 <= subRoot.val <= 10^4`

## Analysis

Understanding the solution was quite straightforward: iterate the `root` first until we find a match with the `subRoot`, and if that's the case then start comparing the nodes to check the exact matching.

Implementing it, however, was the challenging part. I intially started with a DFS implementation which checked the `root.val == subRoot.val` condition, and called a `isSame` function to continue. This turned out to be more complex than I thought, so I had to step back, much easier to use the initial function as the initial recursion.

We can use the `isSame` function to check everything: if both nodes are valid and they have matching values, we continue with the recursion on both sides and return `True` only if both sides match (hence the `and`). Another tricky part was the last check `if not root and not subRoot` we return `True` as this means they're still equal. If they're somewhat different, we return `False`.

But how to call this `isSame` function? Since it only performs recursion when there's an actual match, we can call it immediately on both roots: if they match we check, if not we have to continue explore the first tree. We can do that with a simple recursion on `isSubtree` using `root.left` and `root.right`, and this will trigger another `isSame` check: we return `True` if any match is found (hence the `or`).

Pay extra attention to edge cases:

- if `subRoot` is `null`, we can consider it as always included and return `True` immediately
- if `root` is `null` (and `subRoot` is not), we can consider it as never included and return `False` immediately

### Serialization Approach

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
            def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
                if not subRoot:
                    return True

                if not root:
                    return False

                if self.isSame(root, subRoot):
                    return True
                else:
                    return (self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot))

            def isSame(self, root: TreeNode, subRoot: TreeNode) -> bool:
                if root and subRoot and root.val == subRoot.val:
                    return (self.isSame(root.left, subRoot.left) and self.isSame(root.right, subRoot.right))

                if not root and not subRoot:
                    return True
                    
                return False

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
            public boolean isSubtree(TreeNode root, TreeNode subRoot) {
                if (subRoot == null)
                    return true;

                if (root == null)
                    return false;

                if (isSame(root, subRoot))
                    return true;
                else
                    return (isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot));
            }

            private boolean isSame(TreeNode root, TreeNode subRoot) {
                if (root != null && subRoot != null && root.val == subRoot.val)
                    return (isSame(root.left, subRoot.left) && isSame(root.right, subRoot.right));

                if (root == null && subRoot == null)
                    return true;
                    
                return false;
            }
        }

## Complexity

- **Time**: $O(n * m)$ _as in the worst case we might have to compare all nodes of the first tree with the second tree_ (imagine a weird case where all nodes of `root` are equal to the root node of `subRoot`)
- **Space**: $O(n + m)$ _as the recursion stack could store all nodes of `root` and `subRoot`, in case both trees are fully unbalanced but matching at the very end_

!!! note ""
    where $n$ is n is the number of nodes in `root` and $m$ is the number of nodes in `subRoot`

## Key Takeaways
