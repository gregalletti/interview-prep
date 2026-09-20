---
title: "🟢 Invert a Binary Tree"
external_links:
    NeetCode: https://neetcode.io/problems/invert-a-binary-tree
---
!!! note ""
    You are given the root of a binary tree `root`. Invert the binary tree and return its root.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints
    - `0 <= The number of nodes in the tree <= 100`
    - `-100 <= Node.val <= 100`

## Analysis

Introductive question, as always more focused on learning.

Most important intuition is that we always have to swap left and right pointers of each node, and continue until every node has been swapped. The most intuitive way for me is a Breadth First Search (BFS) approach as it feels more straightforward: go level by level and swap the pointers. Continue until all nodes have been visited.

Worth to also implement recursive and iterative DFS, but not today.

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
            def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
                # bfs
                stack = [root]
                while stack:
                    curr = stack.pop()
                    if curr:
                        stack.append(curr.left)
                        stack.append(curr.right)

                        tmp = curr.left
                        curr.left = curr.right
                        curr.right = tmp

                return root
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
            public TreeNode invertTree(TreeNode root) {
                Deque<TreeNode> stack = new ArrayDeque<>();
                stack.push(root);

                while (!stack.empty()) {
                    TreeNode curr = stack.pop();
                    if (curr != null) {
                        stack.push(curr.left);
                        stack.push(curr.right);

                        TreeNode tmp = curr.left;
                        curr.left = curr.right;
                        curr.right = tmp;
                    }
                }

                return root;
                
            }
        }

## Complexity

- **Time**: $O(n)$ _as we visit each node once_
- **Space**: $O(n)$ _as we store at most each node in the stack_

!!! note ""
    where $n$ is the number of nodes in the binary tree

## Key Takeaways
