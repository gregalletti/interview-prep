---
title: "🟠 Binary Tree from Preorder and Inorder"
external_links:
    NeetCode: https://neetcode.io/problems/binary-tree-from-preorder-and-inorder-traversal
---
!!! note ""
    You are given two integer arrays `preorder` and `inorder`.

    - `preorder` is the preorder traversal of a binary tree
    - `inorder` is the inorder traversal of the same tree
    - Both arrays are of the same size and consist of unique values.
    
    Rebuild the binary tree from the preorder and inorder traversals and return its root.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

First doubt: why do we need both? Why can't we just reconstruct from one traversal only? 

As we know from [Overview](./00_intro.md), pre-order is `Root -> Left -> Right` while in-order is `Left -> Root -> Right`.

Let's take the first example `preorder = [1,2,3,4]`:

    1: root
    2: left
    3: ??? -> this can be either left or right
    4: right, but who's the parent?

        1                    1
       / \                  / \
      2   4       or       2   3
     /                          \
    3                            4

That's why we also need `inorder = [2,1,3,4]`:

    2: left, and we now know it's the left leaf as well
    1: root
    3: we now know that this is the root of the right subtree
    4: right, 3 is the parent

      1
     / \
    2   3
         \
          4

A couple of considerations here:

- pre-order tells us what's the `root` as its first element
- in-order clearly splits the tree in 2 halves, since we know the `root` element
- if we continue from pre-order, the first part of in-order (up until the root element) tells us when left subtree ends. When the current element in preorder matches the current element in inorder, we know we reached a leaf

Let's take a more complex example:

`preorder = [1, 2, 4, 5, 3, 6, 7]`

`inorder = [4, 2, 5, 1, 6, 3, 7]`

    preorder first element tells us 1 is the root
    2 is 1 left child - preorder[i] != inorder[0]
    4 is 2 left child - preorder[i] == inorder[0]
    preorder current element matches inorder first element, we reached the leftmost leaf (of left subtree)
    preorder next element is 5: is this the right child of 2 or 1?
    inorder element did not reach the root yet, so 5 is still part of the left subtree: 5 is the right child of 2
    inorder element is root, we are done with left subtree now
    3 is 1 right child
    6 is 3 left child
    preorder current element matches inorder current element, we reached the leftmost leaf (of right subtree)
    7 is 3 right child

         1
       /   \
      2     3
     / \   / \
    4   5 6   7

<div style="background:#0e1116;">
<svg id="viz" width="100%" viewBox="0 0 380 300" style="display:block;margin:0 auto;max-width:480px;"></svg>
<div id="stepText" style="font-size:0.82rem;color:#666;text-align:center;margin:0.5rem 0 1rem;min-height:2.6em;line-height:1.4;"></div>
<div style="display:flex;align-items:center;justify-content:center;gap:12px;">
  <button id="prevBtn" style="padding:4px 14px;border-radius:6px;border:1px solid #ddd;background:#fff;cursor:pointer;">Prev</button>
  <span id="stepCount" style="font-size:0.8rem;color:#666;min-width:76px;text-align:center;"></span>
  <button id="nextBtn" style="padding:4px 14px;border-radius:6px;border:1px solid #ddd;background:#fff;cursor:pointer;">Next</button>
</div>
</div>
<script>
const preorder = [1,2,4,5,3,6,7];
const inorder  = [4,2,5,1,6,3,7];

const steps = [
  {type:'root', preorderIdx:0, reveal:1, stack:[1], j:0,
   caption:'1 is the root.'},

  {type:'check', preorderIdx:1, stack:[1], j:0,
   caption:'top of stack is 1. inorder[0] = 4. No match \u2192 next value will attach as left child of 1.'},
  {type:'act', preorderIdx:1, reveal:2, stack:[1,2], j:0,
   caption:'2 attaches as left child of 1.'},

  {type:'check', preorderIdx:2, stack:[1,2], j:0,
   caption:'top of stack is 2. inorder[0] = 4. No match \u2192 next value will attach as left child of 2.'},
  {type:'act', preorderIdx:2, reveal:4, stack:[1,2,4], j:0,
   caption:'4 attaches as left child of 2.'},

  {type:'check', preorderIdx:3, stack:[1,2,4], j:0,
   caption:'top of stack is 4. inorder[0] = 4. Match \u2192 leftmost leaf reached, must climb before attaching the next value.'},
  {type:'act', preorderIdx:3, reveal:5, stack:[1,5], j:2,
   caption:'Climb past 4, 2 (both match in turn) until 1 \u2260 inorder[2]=5 \u2192 5 attaches as right child of 2.'},

  {type:'check', preorderIdx:4, stack:[1,5], j:2,
   caption:'top of stack is 5. inorder[2] = 5. Match \u2192 must climb again before attaching the next value.'},
  {type:'act', preorderIdx:4, reveal:3, stack:[3], j:4,
   caption:'Climb past 5, 1 \u2014 stack empties \u2192 3 attaches as right child of 1. Left subtree done.'},

  {type:'check', preorderIdx:5, stack:[3], j:4,
   caption:'top of stack is 3. inorder[4] = 6. No match \u2192 next value will attach as left child of 3.'},
  {type:'act', preorderIdx:5, reveal:6, stack:[3,6], j:4,
   caption:'6 attaches as left child of 3.'},

  {type:'check', preorderIdx:6, stack:[3,6], j:4,
   caption:'top of stack is 6. inorder[4] = 6. Match \u2192 leftmost leaf of right subtree, must climb.'},
  {type:'act', preorderIdx:6, reveal:7, stack:[7], j:6,
   caption:'Climb past 6, 3 \u2014 stack empties \u2192 7 attaches as right child of 3.'}
];

const svgns = 'http://www.w3.org/2000/svg';
function mk(tag, attrs){ const e = document.createElementNS(svgns, tag); for(const k in attrs) e.setAttribute(k, attrs[k]); return e; }

const svg = document.getElementById('viz');
const cellW = 32, gap = 4, startX = 66;
function cellX(i){ return startX + i * (cellW + gap); }
function cellCenterX(i){ return cellX(i) + cellW / 2; }

svg.appendChild(mk('text', {x:startX, y:14, 'font-size':'11px', fill:'#999'})).textContent = 'preorder';
const preY = 20, rowH = 26;
const preRects = [], preTexts = [];
preorder.forEach((v,i) => {
  const r = mk('rect', {x:cellX(i), y:preY, width:cellW, height:rowH, rx:'6', fill:'#fff', stroke:'#ddd'});
  const t = mk('text', {x:cellCenterX(i), y:preY+rowH/2, 'text-anchor':'middle', 'dominant-baseline':'central', 'font-size':'13px', 'font-weight':'500', fill:'#666'});
  t.textContent = v;
  svg.appendChild(r); svg.appendChild(t);
  preRects.push(r); preTexts.push(t);
});

svg.appendChild(mk('text', {x:startX, y:64, 'font-size':'11px', fill:'#999'})).textContent = 'inorder';
const inY = 70;
const inRects = [], inTexts = [];
inorder.forEach((v,i) => {
  const r = mk('rect', {x:cellX(i), y:inY, width:cellW, height:rowH, rx:'6', fill:'#fff', stroke:'#ddd'});
  const t = mk('text', {x:cellCenterX(i), y:inY+rowH/2, 'text-anchor':'middle', 'dominant-baseline':'central', 'font-size':'13px', 'font-weight':'500', fill:'#666'});
  t.textContent = v;
  svg.appendChild(r); svg.appendChild(t);
  inRects.push(r); inTexts.push(t);
});
const pointer = mk('polygon', {points:'0,0 8,0 4,7', fill:'#993C1D'});
svg.appendChild(pointer);

const pos = {1:[150,150], 2:[90,205], 3:[210,205], 4:[60,260], 5:[120,260], 6:[180,260], 7:[240,260]};
const parentOf = {2:1, 3:1, 4:2, 5:2, 6:3, 7:3};
const edgeEls = {}, nodeEls = {};
Object.keys(parentOf).forEach(id => {
  const [x1,y1] = pos[parentOf[id]], [x2,y2] = pos[id];
  const line = mk('line', {x1,y1,x2,y2, stroke:'#999', 'stroke-width':'1.5', opacity:'0'});
  svg.appendChild(line);
  edgeEls[id] = line;
});
Object.keys(pos).forEach(id => {
  const [x,y] = pos[id];
  const g = mk('g', {opacity:'0'});
  const circle = mk('circle', {cx:x, cy:y, r:16, fill:'#fff', stroke:'#999', 'stroke-width':'0.5'});
  const text = mk('text', {x, y, 'text-anchor':'middle', 'dominant-baseline':'central', 'font-size':'13px', 'font-weight':'500', fill:'#333'});
  text.textContent = id;
  g.appendChild(circle); g.appendChild(text);
  svg.appendChild(g);
  nodeEls[id] = {g, circle, text};
});

svg.appendChild(mk('text', {x:300, y:140, 'font-size':'11px', fill:'#999'})).textContent = 'stack';
const stackSlots = [];
for (let d = 0; d < 3; d++) {
  const y = 256 - d * 28;
  const r = mk('rect', {x:300, y, width:55, height:24, rx:'5', fill:'#fff', stroke:'#eee', opacity:'0'});
  const t = mk('text', {x:327, y:y+12, 'text-anchor':'middle', 'dominant-baseline':'central', 'font-size':'12px', 'font-weight':'500', fill:'#666'});
  svg.appendChild(r); svg.appendChild(t);
  stackSlots.push({r, t});
}

const teal = {fill:'#5DCAA5', stroke:'#0F6E56', text:'#04342C'};
const coral = {fill:'#F0997B', stroke:'#993C1D', text:'#4A1B0C'};
const coralL = {fill:'#FAECE7', stroke:'#993C1D', text:'#993C1D'};

let step = 0;
const stepText = document.getElementById('stepText');
const stepCount = document.getElementById('stepCount');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function render() {
  const st = steps[step];

  // preorder row: solid coral once placed (act/root), dashed "pending" outline while being checked
  preRects.forEach((r,i) => {
    const isPending = i === st.preorderIdx && st.type === 'check';
    const isJustPlaced = i === st.preorderIdx && (st.type === 'act' || st.type === 'root');
    const isDone = i < st.preorderIdx || (i === st.preorderIdx && st.type !== 'check' && false);
    if (isJustPlaced) {
      r.setAttribute('fill', coral.fill); r.setAttribute('stroke', coral.stroke);
      r.setAttribute('stroke-width', '2'); r.setAttribute('stroke-dasharray', '0');
      preTexts[i].setAttribute('fill', coral.text);
    } else if (isPending) {
      r.setAttribute('fill', '#fff'); r.setAttribute('stroke', coral.stroke);
      r.setAttribute('stroke-width', '1.5'); r.setAttribute('stroke-dasharray', '3,2');
      preTexts[i].setAttribute('fill', coral.stroke);
    } else if (i < st.preorderIdx || (i === st.preorderIdx && st.type !== 'check' && st.type !== 'root' && step > steps.indexOf(st))) {
      r.setAttribute('fill', '#fff'); r.setAttribute('stroke', '#eee');
      r.setAttribute('stroke-width', '1'); r.setAttribute('stroke-dasharray', '0');
      preTexts[i].setAttribute('fill', '#ccc');
    } else {
      const settled = i < st.preorderIdx;
      r.setAttribute('fill', '#fff'); r.setAttribute('stroke', settled ? '#eee' : '#ddd');
      r.setAttribute('stroke-width', '1'); r.setAttribute('stroke-dasharray', '0');
      preTexts[i].setAttribute('fill', settled ? '#ccc' : '#666');
    }
  });

  // inorder row: consumed cells dim, pointer marker at current j
  inRects.forEach((r,i) => {
    const isConsumed = i < st.j;
    r.setAttribute('fill', isConsumed ? coralL.fill : '#fff');
    r.setAttribute('stroke', isConsumed ? coralL.stroke : '#ddd');
    inTexts[i].setAttribute('fill', isConsumed ? coralL.text : '#666');
  });
  const pIdx = Math.min(st.j, inorder.length - 1);
  pointer.setAttribute('transform', `translate(${cellCenterX(pIdx) - 4}, ${inY + rowH + 4})`);

  // tree: reveal cumulative nodes up to and including this step
  Object.values(nodeEls).forEach(n => n.g.setAttribute('opacity','0'));
  Object.values(edgeEls).forEach(e => e.setAttribute('opacity','0'));
  let lastRevealed = null;
  for (let s = 0; s <= step; s++) {
    const rs = steps[s];
    if (rs.reveal === undefined) continue;
    const n = nodeEls[rs.reveal];
    n.g.setAttribute('opacity','1');
    if (edgeEls[rs.reveal]) edgeEls[rs.reveal].setAttribute('opacity','1');
    lastRevealed = rs.reveal;
  }
  Object.keys(nodeEls).forEach(id => {
    const n = nodeEls[id];
    const isCurrent = Number(id) === lastRevealed && (st.type === 'act' || st.type === 'root');
    if (n.g.getAttribute('opacity') === '1') {
      n.circle.setAttribute('fill', isCurrent ? coral.fill : teal.fill);
      n.circle.setAttribute('stroke', isCurrent ? coral.stroke : teal.stroke);
      n.circle.setAttribute('stroke-width', isCurrent ? '2' : '0.5');
      n.text.setAttribute('fill', isCurrent ? coral.text : teal.text);
    }
  });

  // stack panel: check phase = outline only on top slot (being examined, nothing changed yet)
  // act phase = filled top slot (just committed)
  stackSlots.forEach((slot, d) => {
    if (d < st.stack.length) {
      const isTop = d === st.stack.length - 1;
      slot.r.setAttribute('opacity','1');
      slot.t.setAttribute('opacity','1');
      slot.t.textContent = st.stack[d];
      if (isTop && st.type === 'check') {
        slot.r.setAttribute('fill', '#fff');
        slot.r.setAttribute('stroke', coral.stroke);
        slot.r.setAttribute('stroke-width', '2');
        slot.t.setAttribute('fill', coral.stroke);
      } else if (isTop) {
        slot.r.setAttribute('fill', coralL.fill);
        slot.r.setAttribute('stroke', coralL.stroke);
        slot.r.setAttribute('stroke-width', '1');
        slot.t.setAttribute('fill', coralL.text);
      } else {
        slot.r.setAttribute('fill', '#fff');
        slot.r.setAttribute('stroke', '#ddd');
        slot.r.setAttribute('stroke-width', '1');
        slot.t.setAttribute('fill', '#666');
      }
    } else {
      slot.r.setAttribute('opacity','0');
      slot.t.setAttribute('opacity','0');
    }
  });

  stepText.textContent = st.caption;
  stepCount.textContent = `Step ${step+1} of ${steps.length}`;
  prevBtn.disabled = step === 0;
  nextBtn.disabled = step === steps.length - 1;
}

prevBtn.onclick = () => { if (step > 0) { step--; render(); } };
nextBtn.onclick = () => { if (step < steps.length - 1) { step++; render(); } };
render();
</script>

My solution uses a stack to keep track of the current path from the root to the most recently created node. I iterate through `preorder` to create nodes, while using `inorder` as a signal for when a subtree is complete: whenever the top of the stack matches `inorder[i]`, I pop nodes until it no longer matches, meaning I have climbed back up the tree and the next node should be attached as a right child.

This is closely related to NeetCode's Morris/two-pointer solution, which uses temporary right pointers instead of an explicit stack to achieve `O(1)` extra space. **For an interview, I would probably prefer the stack version** because it is much easier to get to and explain, while still being optimal and with the same (amortized) complexities.

Morris achieves better space complexity but requires a considerably more subtle pointer-manipulation technique. In this case, I also arrived at the stack-based approach independently, without knowing the Morris solution, which makes it a particularly natural approach for me to explain and reason about.

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
            def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
                if not preorder:
                    return None
                stack = []

                root = TreeNode(preorder[0])
                stack.append(root)

                i = 0
                for p in range(1, len(preorder)):
                    curr = TreeNode(preorder[p])

                    if stack[-1].val == inorder[i]:
                        # climb up until it matches again
                        while stack and stack[-1].val == inorder[i]:
                            parent = stack.pop()
                            i += 1

                        parent.right = curr
                    else:
                        stack[-1].left = curr
                    stack.append(curr)

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
            public TreeNode buildTree(int[] preorder, int[] inorder) {
                if (preorder == null)
                    return null;

                Deque<TreeNode> stack = new ArrayDeque<>();

                TreeNode root = new TreeNode(preorder[0]);
                stack.push(root);

                int i = 0;
                for (int p = 1; p < preorder.length; p++) {
                    TreeNode curr = new TreeNode(preorder[p]);

                    if (stack.peek().val == inorder[i]) {
                        // climb up until it matches again
                        TreeNode parent = null;
                        while (!stack.isEmpty() && stack.peek().val == inorder[i]) {
                            parent = stack.pop();
                            i++;
                        }
                        parent.right = curr;
                    } else {
                        stack.peek().left = curr;
                    }
                    stack.push(curr);
                }
                return root;
            }
        }

## Complexity

- **Time**: $O(n)$ _as every node is created, pushed, and popped at most once. Although there is a nested while loop, its total number of iterations across the entire algorithm is at most $n$, giving a total of $O(2n)$_
- **Space**: $O(n)$ _as we have $O(n)$ auxiliary space for the stack in the worst case, when the tree is completely skewed. The output tree itself also takes $O(n)$ space, so a total of $O(2n)$_

!!! note ""
    where $n$ is the number of nodes of the tree

## Key Takeaways
