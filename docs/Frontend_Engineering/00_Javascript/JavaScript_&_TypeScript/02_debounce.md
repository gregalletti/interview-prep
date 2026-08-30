---
title: "🟢 Debounce"
external_links:
    GreatFrontEnd: https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/debounce
---
!!! note ""
    Debouncing controls how often a function can execute over time. When a JavaScript function is debounced with a wait time of wait milliseconds, it runs only after wait milliseconds have elapsed since the debounced function was last called.

    You have probably encountered debouncing in daily life before, such as when entering an elevator. Only after some time passes without pressing the "Door open" button (the debounced function not being called) will the elevator door actually close (the callback function is executed).

    Implement `debounce(func, wait)` so that func is called only after wait milliseconds have passed since the most recent call. The returned function should not invoke `func `immediately. When the delayed call finally runs, it should use the latest arguments and preserve the this value from the most recent call.

    ### Follow-up

    - Debounce with a `cancel()` method to cancel delayed invocations and a `flush()` method to immediately invoke them.
    - Implement `throttle`, which is similar to debounce but a little different.

## Analysis

Same story, I knew the general idea of debounce, but I never implemented something like this. The idea was clear though, every time the debounced function is called, we have to cancel the previous timer and create a new one. Easy to understand by thinking about real world applications of this technique like the elevator: if you keep pressing the button, the door will NEVER close, and this means that the timer constantly gets updated.

I then started drafting the solution from `existingTimer`, for sure we have to store it in order to reset it. I created `debouncedFunc` that clears the existing timer and replaces it with a new one with a scheduled execution of `func.apply`.

Of course I initially fell into the most trivial mistake of not passing down the original arguments, so I went back and updated the function with `...args`, and same for the `apply`. When we call `debouncedFunc("hello")`, the argument is received by the wrapper function, not directly by `func`. Using `...args` collects all arguments passed to the wrapper into an array, so in this case `args` becomes `["hello"]`. We then need to pass those arguments to the original function through the apply.

Luckily, saving the original context was not an issue since I used the arrow function immediately, but it's important to understand why this happens: because the callback passed to setTimeout is an arrow function it does not create its own this - it inherits the this from the surrounding function.

And why do we need to preserve `this`? Because the debounced function can be calld from both an Object or not (spoiler, tests of course have both).

### Follow-ups

**Cancel and Flush** functionalities

**Throttling** is a different concept. Instead of increasing the delay, we basically just ignore successive calls if there's already one scheduled. Technically we can also queue the calls, but let's keep it simple.

The idea here is that we don't need the `existingTimer` anymore, but just one variable that tells us if there's a `throttling` happening: if yes, we return immediately. If not, we schedule the call and then we set the `throttling` to true.

## Solution

=== "JavaScript #1"

        :::javascript
        /**
        * @param {(...args: Array<unknown>) => unknown} func
        * @param {number} wait
        * @returns {(...args: Array<unknown>) => void}
        */
        export default function debounce(func, wait) {

        let existingTimer = null;

        function debouncedFunc(...args) {

            clearTimeout(existingTimer);

            existingTimer = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };

        return debouncedFunc;
        }

## Solution - Cancel and Flush

=== "JavaScript #2"

        :::javascript
        /**
        * @param {(...args: Array<unknown>) => unknown} func
        * @param {number} wait
        * @returns {(...args: Array<unknown>) => void}
        */
        export default function throttle(func, wait) {

        let throttling = false;

        function throttledFunc(...args) {

            // ignore every call if there's already one scheduled
            if(throttling)
                return;

            throttling = true;

            setTimeout(() => {
                func.apply(this, args);
                throttling = false;
            }, wait);

        };

        return throttledFunc;
        }

## Solution - Throttling

=== "JavaScript #3"

        :::javascript
        /**
        * @param {(...args: Array<unknown>) => unknown} func
        * @param {number} wait
        * @returns {(...args: Array<unknown>) => void}
        */
        export default function throttle(func, wait) {

        let throttling = false;

        function throttledFunc(...args) {

            // ignore every call if there's already one scheduled
            if(throttling)
                return;

            throttling = true;

            setTimeout(() => {
                func.apply(this, args);
                throttling = false;
            }, wait);

        };

        return throttledFunc;
        }

## Key Takeaways

- `func.apply(this, args)` calls `func` with the given `this` value and spreads the array elements as arguments.
- `func(...args)` also forwards arguments, but `apply` is useful when we also need to explicitly control `this`.
- Arrow functions inherit `this` from their surrounding scope instead of creating their own `this`.
- `setTimeout` delays the execution of the original function, not the call to the debounced wrapper itself.
- `clearTimeout` cancels the previous pending execution.
- The `existingTimer` variable persists because of a **closure**, allowing multiple calls to share the same timer reference.

## TODO

- implement first follow-up
