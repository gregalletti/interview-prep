---
title: "🟢🟠 Subtree of Another Tree"
external_links:
    NeetCode: https://neetcode.io/problems/subtree-of-a-binary-tree
---
!!! note ""
    Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

    <span/>

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

> Why 🟢🟠? This is a continuation of a different easy problem - it's inherently harder and even has an alternative completely different solution.

Understanding the solution was quite straightforward: iterate the `root` first until we find a match with the `subRoot`, and if that's the case then start comparing the nodes to check the exact matching.

Implementing it, however, was the challenging part. I intially started with a DFS implementation which checked the `root.val == subRoot.val` condition, and called a `isSame` function to continue. This turned out to be more complex than I thought, so I had to step back, much easier to use the initial function as the initial recursion.

We can use the `isSame` function to check everything: if both nodes are valid and they have matching values, we continue with the recursion on both sides and return `True` only if both sides match (hence the `and`). Another tricky part was the last check `if not root and not subRoot` we return `True` as this means they're still equal. If they're somewhat different, we return `False`.

But how to call this `isSame` function? Since it only performs recursion when there's an actual match, we can call it immediately on both roots: if they match we check, if not we have to continue explore the first tree. We can do that with a simple recursion on `isSubtree` using `root.left` and `root.right`, and this will trigger another `isSame` check: we return `True` if any match is found (hence the `or`).

Pay extra attention to edge cases:

- if `subRoot` is `null`, we can consider it as always included and return `True` immediately
- if `root` is `null` (and `subRoot` is not), we can consider it as never included and return `False` immediately

### Serialization Approach

I won't pretend I thought about it on my own. Yes, the basic concept is kinda easy, but getting there is not.

The core idea is that, instead of going through the actual trees, we can serialize them (as strings in this case) and transform the problem in a substring problem.

Take this `root` as an example:

        3
       / \
      4   5
     / \
    1   2

it can be serialized as:

    3,4,1,#,#,2,#,#,5,#,#

So if we serialize `subRoot` in the same way, the problem now becomes a substring problem. Note that this follows a specific format, namely the **preorder traversal**. To be more precise, traversal order doesn't fundamentally matter, we just have to be consistent for both trees. Preorder is just the most common/convenient choice because the root appears first. You can find more details on traversal techniques in [Overview](./00_intro.md).

One important point here: serialization takes $O(n)$ for `root` and $O(m)$ for `subRoot`, resulting in a total of $O(n + m)$. The substring search has to follow the same logic, otherwise we'll have no real benefits from this new approach (except that it's a more "creative" solution to the same problem). This means we can't just use a built-in substring method, as for example Python does not promise a specific asymptotic bound so we have to assume that this is equal to the naive implementation $O(n * m)$.

This is where optimal substring search algorithms come into the picture. *Z-function*, *KMP* and *Rabin-Karp* are valid alternatives, but only the first two have a guaranteed worst-case complexity of $O(n + m)$ while the last one has $O(n * m)$ (even if the average is $O(n + m)$).

I won't fully explain them here, they already have a dedicated section in [Named Algorithms](../../03_algorithms.md). Let's just use the built-in functions for now just because I'm lazy. I'll provide examples of them in the mentioned page when I find some time to do it.

## Solution - Tree Comparison

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

### Complexity

- **Time**: $O(n * m)$ _as in the worst case we might have to compare all nodes of the first tree with the second tree_ (imagine a weird case where all nodes of `root` are equal to the root node of `subRoot`)
- **Space**: $O(n + m)$ _as the recursion stack could store all nodes of `root` and `subRoot`, in case both trees are fully unbalanced but matching at the very end_

!!! note ""
    where $n$ is n is the number of nodes in `root` and $m$ is the number of nodes in `subRoot`

## Solution - Serialization

=== "Python"

        :::python
        # Definition for a binary tree node.
        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right

        class Solution:   
            def serialize(self, root: Optional[TreeNode]) -> str:
                tree = []

                def dfs(node):
                    if not node:
                        tree.append(",#")
                        return
                    tree.append(f",{str(node.val)}")
                    dfs(node.left)
                    dfs(node.right)

                dfs(root)
                return "".join(tree)

            def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
                serializedRoot = self.serialize(root)
                serializedSubroot = self.serialize(subRoot)
                return serializedSubroot in serializedRoot

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
            private String serialize(TreeNode root) {
                StringBuilder tree = new StringBuilder();
                dfs(root, tree);
                return tree.toString();
            }

            private void dfs(TreeNode node, StringBuilder tree) {
                if (node == null) {
                    tree.append(",#");
                    return;
                }

                tree.append(String.format(",%s", node.val));
                dfs(node.left, tree);
                dfs(node.right, tree);
            }

            public boolean isSubtree(TreeNode root, TreeNode subRoot) {
                String serializedRoot = serialize(root);
                String serializedSubroot = serialize(subRoot);
                return serializedRoot.contains(serializedSubroot);
            }

        }


### Complexity

- **Time**: $O(n * m)$ _as in the we have no guarantees on the built-in functions time complexity_
- **Space**: $O(n + m)$ _as we perform recursion on both trees and we store both serialized strings_

!!! note ""
    where $n$ is n is the number of nodes in `root` and $m$ is the number of nodes in `subRoot`

## Key Takeaways

- For algorithm analysis, a safe worst-case bound for substring search is $O(n × m)$. In practice, CPython uses optimized string-search algorithms, so `in` can be much faster than naive search on typical inputs. But do not just assume it.
- Same reasoning can be applied to Java's `in` equivalent, which is `contains()`. Again, we know it's faster than the naive search but we have no guarantees on the worst-case time complexity.
- Python: Use f-strings (`f"{variable}"`) for string formatting; they're concise and allow expressions directly inside {}.
- Java: Use `String.format()` (`String.format("%s %d", str, num)`) for formatted strings.
