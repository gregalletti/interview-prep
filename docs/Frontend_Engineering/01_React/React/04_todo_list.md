---
title: "🟠 Todo List"
external_links:
    GreatFrontEnd: https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/todo-list
---
!!! note ""
    You're given some existing HTML for a Todo List app. Add the following functionality to the app:

    1. Add new tasks on clicking the "Submit" button.
        - The `<input>` field should be cleared upon successful addition.
        - Treat task input as plain text; user-provided markup must not be interpreted as HTML.
    2. Remove tasks from the Todo List upon clicking the "Delete" button.
    
    Give the task input an accessible label so the form is operable with assistive technology.

## Analysis

Improved version:
- Using a <form> to capture submission of new tasks. This will handle both Enter key presses and "Submit" button clicks.
- Displaying an empty state when there are no tasks in the list.
- Asking for confirmation before deletion of a task.

## Solution

=== "App.js"

        :::javascript
        import { useState } from 'react';

        export default function App() {

            const [tasks, setTasks] = useState([]);
            const [newTask, setNewTask] = useState("");

            function addTask() {
                if (newTask.trim() !== '') {
                    setTasks(currentTasks => {
                        return [
                            ...currentTasks,
                            { id: crypto.randomUUID(), value: newTask.trim() }
                        ]
                    })
                }
            }

            function deleteTask(task) {
                setTasks(currentTasks => {
                    return currentTasks.filter((t) => t.id !== task)
                })
            }

            return (
                <div>
                    <h1>Todo List</h1>
                    <div className="taskbar">
                        <input type="text" value={newTask} placeholder="Add your task" onChange={(e) => setNewTask(e.target.value)}/>
                        <div>
                            <button onClick={() => {addTask(); setNewTask("");}}>Submit</button>
                        </div>
                    </div>
                    <ul>
                    { tasks.map((t) => (
                        <li key={t.id}>
                            <span>{t.value}</span>
                            <button onClick={() => deleteTask(t.id)}>Delete</button>
                        </li>
                        ))
                    }
                    </ul>
                </div>
            );
        }

=== "styles.css"

        :::css
        body {
            font-family: sans-serif;
        }

        .taskbar {
            display: flex;
            gap: 10px;
        }

        li::marker {
            color: gray;
            font-family: sans-serif;
            font-size: 0.8em;
        }

## Key Takeaways

- When the next state depends on the previous state, use `setState(prev => ...)`. This avoids relying on potentially stale state.
- Don't modify arrays directly. Create a new array with techniques like spread (`...`), `filter()`, or `map()` so React can detect the update.
- List items need a unique, stable `key`. Use an actual task ID rather than the array index, especially when items can be deleted or reordered. `crypto.randomUUID()` is always a good choice if we don't have ids already.
- Keep the input value in React state with `value={newTask}`. This lets you easily clear the input or manipulate its value after submission.
- Use `trim()` before adding a task so inputs containing only spaces aren't accepted.
- Use `<form onSubmit={...}>` instead of relying only on a button click. This also allows users to submit the task by pressing **Enter**.
