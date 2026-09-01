---
title: "🟢 Accordion"
external_links:
    GreatFrontEnd: https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/accordion
---

## Analysis

## Solution

=== "App.js"

        :::javascript
        import { useState } from 'react';

        export default function Accordion() {

        const [expanded, setExpanded] = useState([]);

        const toggleAccordion = (id) => {
            setExpanded(previous => {
            if (previous.includes(id)) {
                return previous.filter((item) => item !== id);
            }

            return [...previous, id];
            });
        }

        const sections = [
            {
            id: 0,
            title: "HTML",
            text: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
            },
            {
            id: 1,
            title: "CSS",
            text: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."
            },
            {
            id: 2,
            title: "JavaScript",
            text: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."
            }
        ];

        return (
            <div>
            {
            sections.map((s) => {
                const isExpanded = expanded.includes(s.id);

                return (
                <div className="accordion" key={s.id}>
                    <button aria-expanded={isExpanded} className="accordion-item" onClick={() => toggleAccordion(s.id)}>
                    {s.title} <span aria-hidden={true} className={`accordion-icon ${isExpanded ? "accordion-icon--rotated" : ""}`}/>
                    </button>
                    <div hidden={!isExpanded}>
                    {s.text}
                    </div>
                </div>
                )
            })
            }
            </div>
        );
        }

=== "styles.css"

        :::css
        body {
        font-family: sans-serif;
        }

        .accordion-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: #f0f8ff;
        transition: background-color .1s;
        }

        .accordion-item:hover {
        background-color: #8ea6b9;
        transition: background-color .1s;
        }

        .accordion-icon {
        border: solid currentcolor;
        border-width: 0 2px 2px 0;
        display: inline-block;
        height: 8px;
        pointer-events: none;
        transform: translateY(-2px) rotate(45deg);
        width: 8px;
        }

        .accordion-icon--rotated {
        transform: translateY(2px) rotate(-135deg);
        }

## Key Takeaways

- When new state depends on previous state, prefer the **functional state updater**: `setState(previous => ...)`.
- Treat React state as **immutable**; create a new array/object instead of mutating the existing state.
- Keep a **single source of truth** and derive related UI from it (panel visibility, icon state, `aria-expanded`).
- Use a **native `<button>`** for accordion headers so pointer and keyboard interaction work naturally.
- Use `aria-expanded` to communicate whether a section is open.
- Use `aria-controls` to connect the button to the panel it controls, with a matching panel `id`.
- Mark decorative icons with **`aria-hidden="true"`** so they stay out of the accessibility tree.
- Use the native **`hidden`** attribute when the collapsed panel should remain in the DOM but be hidden.
- Arrow functions with `{}` need an explicit **`return`** when used with `.map()`.
- Use stable React **`key`** values such as an item's ID rather than the array index.
- Conditional classes can be driven from the same derived state, e.g. `isExpanded ? "active" : ""`.
- In JSX, use `{}` to evaluate JavaScript expressions; use backticks/template literals when building dynamic strings, such as conditional className values: ``className={`accordion-icon ${isExpanded ? "rotated" : ""}`}``.