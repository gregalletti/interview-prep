---
title: "🟢 Same Binary Tree"
external_links:
    NeetCode: https://neetcode.io/problems/same-binary-tree
---
!!! note ""
    Given the roots of two binary trees `p` and `q`, return `true` if the trees are equivalent, otherwise return `false`.
    Two binary trees are considered equivalent if they share the exact same structure and the nodes have the same values.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints
    - `0 <= The number of nodes in both trees <= 100`
    - `-100 <= Node.val <= 100`

## Analysis

Well, I solved this after solving the follow up problem (Subtree of Another Tree), so this was trivial as it's the exact same. I'll just repeat it here for completeness but won't spend a lot of time explaining it.

If both nodes are valid and they have matching values, we continue with the recursion on both sides and return `True` only if both sides match (hence the `and`).  `if not root and not subRoot` we return `True` as this means they're still equal. If they're somewhat different, we return `False`.

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
            def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
                if p and q and p.val == q.val:
                    return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
                if not p and not q:
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
            public boolean isSameTree(TreeNode p, TreeNode q) {
                if (p != null && q != null && p.val == q.val)
                    return (isSameTree(p.left, q.left) && isSameTree(p.right, q.right));
                if (p == null && q == null)
                    return true;
                return false;
            }
        }

## Complexity

- **Time**: $O(n)$ _as in the worst case we explore the entire first tree `p`_
- **Space**: $O(n)$ _as in the case of a fully unbalanced tree the recursion stack contains the whole tree `p`_

!!! note ""
    where $n$ is the number of nodes in the first tree `p`

## Key Takeaways
