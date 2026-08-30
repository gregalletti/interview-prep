---
title: "🟠 Reverse Polish Notation"
external_links:
    NeetCode: https://neetcode.io/problems/evaluate-reverse-polish-notation
---
!!! note ""
    You are given an array of strings `tokens` that represents a valid arithmetic expression in [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation).

    Return the integer that represents the evaluation of the expression.

    - The operands may be integers or the results of other operations.
    - The operators include `'+'`, `'-'`, `'*'`, and `'/'`.
    - Assume that division between integers always truncates toward zero.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    | `["1","2","+","3","*","4","-"]` | `5` | ((1 + 2) * 3) - 4 = 5 |

    ### Constraints
    - `1 <= tokens.length <= 1000`
    - `tokens[i]` is `"+"`, `"-"`, `"*"`, or `"/"`, or a string representing an integer in the range `[-200, 200]`.

## Analysis

The concept is clear: we can use the stack to push operants until we read an operator. At that point we can pop the elements, apply the operation on them and save the partial result. Then continue until we finish.

The problem does not explain well at all besides linking to Wikipedia with the basic first test case already given. Therefore, I had some issues understanding which examples could be valid and which not. As a binary operator, we can only have two operands and one operator, that's why `["1","2","3","+","*"]` is a valid expression but hard to understand at first. Ultimately, a quick check is to see if $number of operands = number of operators + 1$. If not, the expression is invalid.

This means we don't need to empty the stack every time we read an operator, but we can just check if the stack has at least two elements. We pop them out and apply the operation, then push the result back to the stack. In this way, the second element we pop from the stack is the partial result of the previous operation, and the first element is the next operand. This is important because the order of operations matters, especially for subtraction and division.

If we finish reading the expression and the stack has more than one element, it means the expression is invalid. If it has exactly one element, that is the final result.

**One good clarifying question to ask in interviews is whether the expression is guaranteed to be valid or not.** If it is, we can skip the checks and just return the final result. If not, we need to check for invalid expressions and return an error or a specific value. In this case, the expression is guaranteed to be valid.

Last tricky part is the division. In Python, the division operator `/` returns a float, and the `//` operator truncates towards negative infinity. We need to truncate towards zero, which means we need to use `int(a / b)` instead of `a // b`. In Java, we can just use the `/` operator, as it truncates towards zero by default.

I've cleaned up the code to remove the need for the OPERANDS list, as we can just check for the operators directly. This makes the code cleaner and easier to read. Moreover, Java arrays don't have a convenient `in` operation like Python. We could use `Arrays.asList(OPERANDS).contains(n)` but it would be less efficient and less readable than just checking for the operators directly.

## Solution

=== "Python"

        :::python
        class Solution:
            def evalRPN(self, tokens: List[str]) -> int:
                OPERANDS = ["+", "-", "*", "/"] # we could technically skip this and just check later, but this is more explicit
                stack = []

                for n in tokens:
                    if n in OPERANDS:
                        if len(stack) >= 2: # not really needed as the problem guarantees valid expressions
                            first, second = stack.pop(), stack.pop()
                            if n == "+":
                                stack.append(second + first)
                            if n == "-":
                                stack.append(second - first)
                            if n == "*":
                                stack.append(second * first)
                            if n == "/":
                                stack.append(int(second / first))
                    else:
                        stack.append(int(n))
                return stack[0]

=== "Python (cleaner)"

        :::python
        class Solution:
            def evalRPN(self, tokens: List[str]) -> int:
                stack = []

                for n in tokens:
                    if n == "+":
                        first, second = stack.pop(), stack.pop()
                        stack.append(second + first)
                    elif n == "-":
                        first, second = stack.pop(), stack.pop()
                        stack.append(second - first)
                    elif n == "*":
                        first, second = stack.pop(), stack.pop()
                        stack.append(second * first)
                    elif n == "/":
                        first, second = stack.pop(), stack.pop()
                        stack.append(int(second / first))
                    else:
                        stack.append(int(n))
                return stack[0]

=== "Java"

        :::java
        class Solution {
            public int evalRPN(String[] tokens) {
                Stack<Integer> stack = new Stack<>();

                for (String n : tokens) {
                    if (n.equals("+")) {
                        int first = stack.pop();
                        int second = stack.pop();
                        stack.push(second + first);
                    } else if (n.equals("-")) {
                        int first = stack.pop();
                        int second = stack.pop();
                        stack.push(second - first);
                    } else if (n.equals("*")) {
                        int first = stack.pop();
                        int second = stack.pop();
                        stack.push(second * first);
                    } else if (n.equals("/")) {
                        int first = stack.pop();
                        int second = stack.pop();
                        stack.push(second / first);
                    } else {
                        stack.push(Integer.parseInt(n));
                    }
                }

                return stack.pop();
            }
        }

## Complexity

- **Time**: $O(n)$ _as we iterate the list once and pop some values out of the stack in $O(1)$_
- **Space**: $O(n)$ _as we store the operands and partial results in the stack_

!!! note ""
    where $n$ is the length of the input list `tokens`.
