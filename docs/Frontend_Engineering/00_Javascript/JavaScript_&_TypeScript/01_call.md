---
title: "🟢 Function call"
external_links:
    GreatFrontEnd: https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/function-call
---
!!! note ""
    The Function.prototype.call() method calls the function with a given this value and arguments provided individually.

    Implement your own Function.prototype.call without calling the native call method. To avoid overwriting the actual Function.prototype.call, implement the function as Function.prototype.myCall.

    ### Examples
        :::javascript
        function multiplyAge(multiplier = 1) {
            return this.age * multiplier;
        }

        const mary = {
            age: 21,
        };

        const john = {
            age: 42,
        };

        multiplyAge.myCall(mary); // 21
        multiplyAge.myCall(john, 2); // 84

## Analysis

TODO

## Solution

=== "App.js"

        :::javascript

=== "styles.css"

        :::css

## Key Takeaways
