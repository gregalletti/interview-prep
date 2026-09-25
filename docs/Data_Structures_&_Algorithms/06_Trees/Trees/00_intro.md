---
title: Overview
summary: Different types of trees and traversals
---
A **tree** is a hierarchical structure built from nodes, with one root and no cycles - every node except the root has exactly one parent. Trees show up constantly in interviews because so many problems reduce to the same shape: define what to do at a node, then recurse into its children.

Most of the difficulty isn't the data structure itself, it's **picking the right traversal order** and thinking recursively about problems that have a natural base case (a leaf, or an empty subtree) and a natural recursive case (combine results from the children).

## Core Concepts

- A tree is a hierarchical structure: one root, and every other node has exactly one parent
- **Terminology:** root, leaf (no children), parent/child, depth (distance from the root), height (distance to the furthest leaf), subtree
- A tree with `n` nodes always has exactly `n - 1` edges
- No cycles - that's what separates a tree from a general graph

## Trees

- A node can have any number of children, not just two - a file system, an org chart, a trie are all trees
- Traversal generalizes to DFS (visit a node, recurse into each child in turn) or BFS (level by level)
- Represented as a node holding a list of children, rather than fixed `left`/`right` references

## Binary Trees

- Each node has at most two children, conventionally called `left` and `right`
- **Full:** every node has 0 or 2 children. **Complete:** every level is filled except possibly the last, filled left to right. **Perfect:** every level is completely filled
- **Balanced:** height stays $O(\log n)$. A degenerate tree (everything chained to one side) behaves like a linked list - $O(n)$
- Standard node:

        :::python
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right

## Binary Search Trees

- Ordering invariant: every node's left subtree holds smaller values, right subtree holds larger values
- In-order traversal of a BST visits nodes in sorted order - the main reason in-order matters
- Search, insert, and delete are all $O(\log n)$ on a balanced tree, but degrade to $O(n)$ on a skewed one
- Self-balancing variants (AVL, Red-Black) keep the $O(\log n)$ guarantee by rebalancing after insert/delete

### Tree traversal techniques

Take this binary tree as an example:

         1
       /   \
      2     3
     / \   / \
    4   5 6   7

#### In-order

Inorder traversal visits the node in the order: `Left -> Root -> Right`

In the example: `4, 2, 5, 1, 6, 3, 7`

    :::python
    def inorder(root):
        if not root:
            return []
        return inorder(root.left) + [root.val] + inorder(root.right)

#### Pre-order

Preorder traversal visits the node in the order: `Root -> Left -> Right`

In the example: `1, 2, 4, 5, 3, 6, 7`

    :::python
    def preorder(root):
        if not root:
            return []
        return [root.val] + preorder(root.left) + preorder(root.right)

#### Post-order

Postorder traversal visits the node in the order: `Left -> Right -> Root`

In the example: `4, 5, 2, 6, 7, 3, 1`

    :::python
    def postorder(root):
        if not root:
            return []
        return postorder(root.left) + postorder(root.right) + [root.val]

#### Level-order

Level Order Traversal visits all nodes present in the same level completely before visiting the next level.

It's the BFS fashion.

In the example: `1, 2, 3, 4, 5, 6, 7`

    :::python
    from collections import deque

    def level_order(root):
        if not root:
            return []
        result, queue = [], deque([root])
        while queue:
            node = queue.popleft()
            result.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return result

## Common Methods and Notes

### Python

- Define a node with `class TreeNode: def __init__(self, val=0, left=None, right=None): ...`
- Recursive traversals reading as `left + [root] + right` are natural, but each `+` builds a new list - for large trees, prefer appending to a shared `result` list passed through the recursion
- `collections.deque` is the standard choice for level-order/BFS, but as we said earlier, a simple list representing a stack is usually fine

### Java

- `TreeNode` typically has `int val; TreeNode left; TreeNode right;`
- Recursive traversals append to a shared `List<Integer>` rather than concatenating return values
- `Queue<TreeNode> queue = new LinkedList<>();` (or `ArrayDeque`) for level-order/BFS

## Quick Tips

- **Problem has a natural recursive structure:** define the base case (usually `null`/`None`) and combine results from `left` and `right`.
- **Need nodes in sorted order from a BST:** in-order traversal.
- **Need to process level by level, or find the shortest path in an unweighted tree:** BFS/level-order, not DFS.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| DFS traversal (in/pre/post-order) | $O(n)$ | $O(h)$ | `h` = tree height, from the recursion stack |
| BFS / level-order traversal | $O(n)$ | $O(n)$ | Queue holds up to a full level, worst case $n/2$ |
| Search in a BST | $O(\log n)$ average, $O(n)$ worst | $O(1)$ | Worst case is a skewed (degenerate) tree |
| Insert/delete in a BST | $O(\log n)$ average, $O(n)$ worst | $O(1)$ | Same balance caveat as search |
