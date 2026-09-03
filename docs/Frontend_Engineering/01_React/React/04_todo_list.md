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
