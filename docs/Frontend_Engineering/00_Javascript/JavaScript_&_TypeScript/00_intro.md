---
title: Overview
summary: JavaScript and TypeScript interview essentials
---
JavaScript and TypeScript are central to frontend interviews because they test both language fundamentals and practical coding judgment. The best answers usually show a solid grasp of closures, async behavior, data transformations, and type safety.

## Event Loop

The event loop isn't part of the JS engine. V8 (or SpiderMonkey, etc.) only gives you the call stack, the heap, and a job queue for microtasks. The event loop itself, the macrotask queue, and all the Web APIs (`setTimeout`, `fetch`, DOM events) belong to the host environment - the browser or Node - not to JavaScript the language. That's why the same language has slightly different async behavior in a browser tab vs. Node.js.

"Single-threaded" describes the call stack, not the whole runtime. JS itself runs on one thread, so it can never truly be doing two things at once - but the browser is not single-threaded. Timers, network requests, and DOM events are handled by separate browser threads/processes; they only hand a callback back to the one JS thread when it's ready. That's the whole trick behind non-blocking I/O.

### The call stack

A LIFO (last-in-first-out) structure that tracks what function is currently executing. Every time a function is called, a new execution context (the more precise spec term - it's not just a return address like a C stack frame, it also carries the function's local variables, its lexical scope chain, and its `this` binding) gets pushed on top. When that function returns, its context pops off.

    :::javascript
    function third()  { console.log('in third'); }
    function second()  { third(); }
    function first()  { second(); }
    first();

Trace: push `first` → push `second` → push `third` → `third` logs and returns, pop → `second` returns, pop → `first` returns, pop. Stack is empty again.

    :::
                ┌──────────────┐
     top ──────►│  third()     │  currently executing
                ├──────────────┤
                │  second()    │
                ├──────────────┤
                │  first()     │
                └──────────────┘
                (only one frame runs at a time — this is what
                "single-threaded" actually refers to)

### The queues

There are (at least) two separate queues with different priority, plus a rendering step:

#### Macrotask queue (also called the task queue, or callback queue - same thing, different names in different docs)

- The initial run of your script is itself the first macrotask
- `setTimeout` / `setInterval` callbacks
- UI events - click, keypress, scroll, input
- I/O completion callbacks
- `MessageChannel` / `postMessage`
- `setImmediate` (Node.js only, no browser equivalent)

#### Microtask queue (also called the job queue)

- `.then()` / `.catch()` / `.finally()` callbacks on promises
- `queueMicrotask()`
- `MutationObserver` callbacks
- the continuation of an `async` function after an `await`

Why two queues instead of one: microtasks exist to let a chain of "reactions" to something (usually a promise settling) finish completely and predictably before the loop moves on to literally anything else - another timer, another click handler, a repaint. Without that guarantee, promise chains could get arbitrary UI events or timers interleaved in the middle of them, which would make async code far harder to reason about.

    :::
    stack empties → drain ENTIRE microtask queue (including new ones added mid-drain)
                → (render, if due)
                → take exactly ONE macrotask, run it to completion
                → stack empties again → back to draining microtasks → repeat

### Async / await

No new concurrency primitive, no new thread. Two rules define it completely:

- `async` function always returns a promise. If you `return x`, that becomes `Promise.resolve(x)`. If you `throw`, the returned promise rejects with that error.
- `await` pauses that function only, not the whole program. When you `await somePromise`, execution of the current async function suspends right there, control unwinds back out of it (the stack doesn't just sit there blocked - the function's frame is popped and everything below it keeps running), and once the promise settles, the rest of the function's body is scheduled as a microtask.

Concretely, this:

    :::javascript
    async function getData() {
        try {
            const res = await fetch(url);
            const json = await res.json();
            return json;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

can be seen as:

    :::javascript
    function getData() {
        return fetch(url)
            .then(res => res.json())
            .then(json => json)
            .catch(err => {
                console.error(err);
                return null;
            });
    }

## Closures

## `this`

## The DOM

