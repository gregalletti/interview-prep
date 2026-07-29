---
hide:
  - toc
---

# [Array.prototype.reduce](https://www.greatfrontend.com/questions/javascript/array-reduce)

## Statement

!!! note ""
    `Array.prototype.reduce` is a way of "reducing" elements in an array by calling a "reducer" callback function on each element in order and passing along the return value from the previous callback. The final result of running the reducer across all elements of the array is a single value.

    Implement `Array.prototype.reduce`. To avoid overwriting the actual `Array.prototype.reduce`, which is being used by the autograder, implement it as `Array.prototype.myReduce`.

    ### Examples

    | Example | Input | Output | Explanation |
    | --- | --- | --- | --- |
    | 1 | [1, 2, 3].myReduce((prev, curr) => prev + curr, 0); | 6 | 0 + 1 + 2 + 3 = 6 |
    | 2 | [1, 2, 3].myReduce((prev, curr) => prev + curr, 4);  | 10 | 4 + 1 + 2 + 3 = 10 |

## Analysis

I knew the general idea behind `reduce`, but I was a bit rusty with the exact edge cases and JavaScript syntax. I started by thinking about what happens when an initial value is provided versus when it isn't. If an initial value is provided, we can use it as the accumulator and start iterating from index 0. If there is no initial value, we need to find the first existing element in the array and use that as the accumulator, then start iterating from the next index.

The main thing I had to think about was sparse arrays, and I only realized it after seeing the test cases failing miserably. To be honest, I did not remember they even existed. We can't simply use the first element as the initial accumulator because the first few indexes might be empty. Instead, we need to keep moving through the array until we find an index that actually exists. This is where the `index in this` check comes in. If we reach the end without finding an element, we throw a `TypeError`.

Once the initial accumulator and starting index are determined, the rest is fairly straightforward. We loop through the remaining elements, skip any holes in the sparse array, and pass the accumulator, current value, index, and array to the callback. The callback returns the new accumulator, which is then used for the next iteration.

I also had a small JavaScript syntax issue along the way. I initially used `AND` instead of `&&`, which tells a lot about how rusty I was with the language.

After implementing the initial solution and passing the test cases, I ran the solution through AI to check for improvements which I implemented in the final solution, and summarized in the "Improvements" section below. Quite trivial ones, but they make the code cleaner.

## Solution

=== "JavaScript"

    ```javascript
    /**
     * @template T, U
     * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
     * @param {U} [initialValue]
     * @return {U}
     */
    Array.prototype.myReduce = function (callbackFn, initialValue) {
        let accumulator;
        let index = 0;
        let len = this.length;

        // handle input arguments
        if (arguments.length < 2) {
            if (len == 0) {
                throw TypeError("No valid data")
            } else {
                // handle sparse arrays
                while (index < len && !(index in this)) {
                    index++;
                }
                if (index >= len) {
                    throw new TypeError("Array too sparse");
                }
                accumulator = this[index];
                index++;
            }
        }
        else {
            accumulator = initialValue;
        }

        for (let i = index; i < len; i++) {
            if (!(i in this)) {
                continue
            }
            accumulator = callbackFn(accumulator, this[i], i, this);
        }
        return accumulator;
    };
    ```

=== "JavaScript (improved)"

    ```javascript
    /**
     * @template T, U
     * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
     * @param {U} [initialValue]
     * @return {U}
     */
    Array.prototype.myReduce = function (callbackFn, initialValue) {
        let accumulator;
        let index = 0;
        const len = this.length;

        // handle input arguments
        if (arguments.length === 1) {
            if (len === 0) {
                throw TypeError("No valid data")
            }
            // handle sparse arrays
            while (index < len && !(index in this)) {
                index++;
            }
            if (index >= len) {
                throw new TypeError("Array too sparse");
            }

            accumulator = this[index];
            index++;
        }
        else {
            accumulator = initialValue;
        }

        for (let i = index; i < len; i++) {
            if (!(i in this)) {
                continue;
            }

            accumulator = callbackFn(
                accumulator,
                this[i],
                i,
                this
            );
        }

        return accumulator;
    };
    ```

## Key Takeaways

- **Understand the difference between a value and the existence of a property.** `obj[key]` tells you the value; `key in obj` tells you whether the property exists.
- **`undefined` can be a legitimate value.** Don't automatically treat `undefined` as meaning "missing".
- **Check argument presence when it matters.** `arguments.length` can distinguish a missing argument from an explicitly passed `undefined`.
- **Be careful with sparse arrays.** An array can have a `length` without having values at every index.
- **Capture state before iteration when appropriate.** Saving `length` before a loop can prevent mutations during iteration from changing the iteration boundary.
- **Edge cases often define correctness.** Empty arrays, sparse arrays, `undefined`, and mutations can expose bugs that basic tests don't catch.
- **Prefer strict equality.** Use `===` and `!==` instead of `==` and `!=` unless you intentionally want type coercion.
- **Use clear variable names.** Names like `accumulator`, `index`, and `len` make the algorithm easier to understand.
- **Remove debugging code from final implementations.** `console.log()` is useful while developing, but should generally be removed from reusable methods.
- **Think about invariants.** At each point in an algorithm, ask: "What must be true here?" For example, after finding the accumulator, `index` should point to the next position to process.
- **Read the specification, not just the happy path.** Reimplementing native methods is a great way to discover subtle language behaviour and API edge cases.

## Improvements

1. **Use strict equality**: Prefer `===` over `==`.
2. **Use `const` when values don't change**: Use `let` only when reassignment is needed.
3. **Make conditions clear**: `arguments.length === 1` is more explicit than `arguments.length < 2`.
4. **Avoid unnecessary `else` blocks**: Simplify control flow when a branch throws or returns.
5. **Capture `length` once**: `const len = this.length` keeps the implementation clear.
