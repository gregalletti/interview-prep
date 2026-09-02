---
title: "🟢 Accordion"
external_links:
    GreatFrontEnd: https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/accordion
---
!!! note ""
    Build an Accordion component that displays a list of vertically stacked sections that each contain a title and content snippet. Some HTML is provided for you as example content along with a chevron icon.

    ### Requirements

    - By default, all sections are collapsed and are hidden from view.
    - Clicking a section title toggles the contents.
    - If the section is collapsed, the section will be expanded and the contents will be displayed.
    - If the section is expanded, the section will be collapsed and the contents will be hidden.
    - The sections are independent of each other.

## Analysis

Not my fist time dealing with accordion / collapsible elements, so this was already a good starting point. It was immediately clear what to do: we need a proper state that holds info regarding which section should be extended and which one collapsed.

Since we had a simple example with 3 items only, I initially started with a different state `expanded`: an array of booleans with the same length of the sections. Every time we click on a section header, we toggle the state and expand / collapse accordingly. However, I soon realized this in not really expandable: better to use a different logic: `expanded` will only contain, guess what, the expanded sections. We toggle this by just adding / removing the section `id` from the state. *This is a better solution as it has variable length based on whichever sections we are dealing with.*

Let's check the core logic now: we map each section to a parent `<div>` with a `key`, the section id. `key` gives React a stable way to identify each list item between renders so it can update the UI correctly. In this specific case, no changes happen on `sections` (which would cause a re-render), but it's always a good thing to include.

We immediately check if the specific section id `s.id` is in the `expanded` state variable and save it as `isExpanded` boolean, and continue with the JSX. We use a `button` native element containing the title and the chevron icon, and adjust the button's `aria-expanded` property and the icon `accordion-icon--rotated` className accordingly. Same logic applies to the text right below, where we control the `hidden` attribute.

Nothing much is left now, just some small CSS changes: to be fair I think I spent something like 30 seconds for the styling - do not expect anything fancy here.

Last point, think about reusability, even if it's not real-world code we still want our accordion component to be reusable with different section values, different length, etc. This is the reason why I then implemented a **polished solution with props** that defines sections in `App.js` and passes down the `sections` object to the `Accordion` component props. Of course, we would normally not even have this scenario (data is fetched from an API, a database,...) but I think it shows the core idea of component reusability.

### Continuation

One note from the problem statement caught my attention:
> You may want to think about ways to improve the user experience of the application and implement them (you get bonus credit for doing that during interviews).

What we should consider:

- **Clear visual feedback** — obvious open/closed state and smooth transitions.
- **Accessibility** — aria-expanded, aria-controls, keyboard interaction, etc.
- **Good focus behavior** — users should always know where they are when navigating with the keyboard.
- **Responsive design** — comfortable interaction on mobile.
- **Animation** — subtle expand/collapse animation, if it doesn't hurt accessibility.
- **Content readability** — spacing, typography, and sensible panel width.
- **Potentially an “Expand all / Collapse all”** action if there are many sections.

TODO: implement some because why not

## Solution

=== "App.js"
        :::javascript
        import Accordion from './Accordion';

        export default function App() {
            return <Accordion />;
        }

=== "Accordion.js"

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
                            <div key={s.id}>
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

## Solution - *with props*

=== "App.js"
        :::javascript
        import Accordion from './Accordion';

        export default function App() {

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

            return <Accordion sections={sections} />;

        }


=== "Accordion.js"

        :::javascript
        import { useState } from 'react';

        export default function Accordion({ sections }) {

            const [expanded, setExpanded] = useState([]);

            const toggleAccordion = (id) => {
                setExpanded(previous => {
                if (previous.includes(id)) {
                    return previous.filter((item) => item !== id);
                }

                return [...previous, id];
                });
            }

            return (
                <div>
                    {
                    sections.map((s) => {
                        const isExpanded = expanded.includes(s.id);

                        return (
                        <div key={s.id}>
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
