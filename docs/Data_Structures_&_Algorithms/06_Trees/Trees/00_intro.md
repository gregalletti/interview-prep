---
title: Overview
summary: Different types of trees and traversals
---
## Core Concepts

## Trees

## Binary Trees

## Binary Search Trees

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

#### Pre-order

Preorder traversal visits the node in the order: `Root -> Left -> Right`

In the example: `1, 2, 4, 5, 3, 6, 7`

#### Post-order

Postorder traversal visits the node in the order: `Left -> Right -> Root`

In the example: `4, 5, 2, 6, 7, 3, 1`

#### Level-order

Level Order Traversal visits all nodes present in the same level completely before visiting the next level.

It's the BFS fashion.

In the example: `1, 2, 3, 4, 5, 6, 7`