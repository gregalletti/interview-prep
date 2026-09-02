---
title: "🟠 Tabs"
external_links:
    GreatFrontEnd: https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/tabs
---
!!! note ""
    Build a tabs component that displays one panel of content at a time depending on the active tab element. Some HTML is provided for you as example content.

    ### Requirements

    - Clicking a tab makes it the active tab. Add a visual indication (e.g. using blue text color) for the active tab to differentiate it from the non-active tabs.
    - At all times, only one panel's contents should be displayed — the one corresponding to the active tab.
    - Support an initial active tab, and ensure multiple instances on the page maintain independent selections.

## Analysis

To be honest, pretty much the same as the previous problem but with some small requirements changes. These tabs are not so much different than an accordion with one single panel open at a time.

Since we don't have to worry about how many panels are active (but just one), we can use a different state variable to keep track of the active tab. We allow the user to pass in a default tab, but if they don't we will just use the first tab as the default.

Then we just map the tab list, calculate `isActive` and render the tab title and content accordingly. The only thing to pay attention to is that we need to hide the non-active panels, but we don't want to unmount them (so we can keep their state). So we will again use the `hidden` attribute for that.

Finally, same reasoning applies as for the previous problem regarding **flexibility**: we don't want to hardcode the number of tabs, so we will just map the `tabs` array and render the titles and content accordingly.

## Solution

=== "App.js"

        :::javascript
        import Tabs from './Tabs';

        export default function App() {

            const data = [
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

            return <Tabs defaultTab={1} tabs={data} />;
        }

=== "Tabs.js"

        :::javascript
        import { useState } from 'react';

        export default function Tabs({ defaultTab, tabs }) {

        const [active, setActive] = useState(defaultTab ?? tabs[0].id);

            return (
                <div className="container">
                    <div className="tabs">
                    {
                        tabs.map(({id, title: tabTitle}) => {
                            const isActive = id === active;

                            return (
                                <button 
                                    key={id} 
                                    className={[
                                        'tab-title',
                                        isActive && 'tab-title--active',
                                    ].filter(Boolean)
                                    .join(' ')
                                    }
                                    onClick={() => setActive(id)}
                                >
                                    {tabTitle}
                                </button>
                            )
                        })
                    }
                    </div>
                    <div className="text">
                    {
                        tabs.map(({id, text: tabText}) => {
                            const isActive = id === active;

                                return (
                                    <p key={id} hidden={!isActive}>
                                        {tabText}
                                    </p>
                                )
                            })
                    }
                    </div>
                </div>
            );
        }

=== "styles.css"

        :::css
        body {
            font-family: sans-serif;
        }

        .tabs {
            display: flex;
            gap: 6px;
        }

        .tab-title {
            border: none;
            font-weight: 750;
            border-bottom: 2px solid #fff;
            padding: 10px 10px;
            --active-color: aqua;
            transition: border-bottom .5s ease;
        }

        .tab-title:hover {
            cursor: pointer;
            border-bottom: 2px solid var(--active-color);
            transition: border-bottom .5s ease-in;
        }

        .tab-title--active,
        .tab-title--active:hover {
            background-color: var(--active-color);
            border-bottom: 2px solid #000;
        }

## Key Takeaways

- What we just implemented (and also in the previous problem) is an [uncontrolled component](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components), meaning that the parent component does not have any control over the state of the child component (`Tabs` has a local state not exposed to the parent). During interviews, make sure to clarify with your interviewer if they want you to implement a controlled or uncontrolled component.
- Remember the usage of the `.filter(Boolean).join(' ')` method to remove falsy values from an array. This is a common pattern in React when conditionally applying class names since it's essentially a more scalable version of ``className={`tab-title ${isActive ? 'tab-title--active' : ''}`}``.
- When checking for the default tab, `??` is the correct choice since it checks for nullish values (`null` and `undefined`). The ternary operator `defaultTab ? defaultTab : tabs[0].id` is not the best approach since this checks for truthiness instead (which in JavaScript can be a bit tricky as `0`, `false`, `null`, `undefined` are all falsy values).

### Note on *uncontrolled components*

A controlled component would look more like this, where the parent owns the state and controls the active tab and the child component is just a dumb component that receives props and calls a callback to notify the parent of any changes:

=== "App.js"

        :::javascript
        import { useState } from 'react';
        import Tabs from './Tabs';

        export default function App() {

            const [activeTab, setActiveTab] = useState(1);

            const data = [
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

            return <Tabs activeTab={activeTab} tabs={data} onTabChange={setActiveTab}/>;
        }

=== "Tabs.js"

        :::javascript
        export default function Tabs({ activeTab, tabs, onTabChange }) {

            return (
                <div className="container">
                    <div className="tabs">
                    {
                        tabs.map(({id, title: tabTitle}) => {
                            const isActive = id === activeTab;

                            return (
                                <button 
                                    key={id} 
                                    className={[
                                        'tab-title',
                                        isActive && 'tab-title--active',
                                    ].filter(Boolean)
                                    .join(' ')
                                    }
                                    onClick={() => onTabChange(id)}
                                >
                                    {tabTitle}
                                </button>
                            )
                            })
                    }
                    </div>
                    <div className="text">
                    {
                        tabs.map(({id, text: tabText}) => {
                            const isActive = id === activeTab;

                            return (
                                <p key={id} hidden={!isActive}>
                                    {tabText}
                                </p>
                            )
                        })
                    }
                    </div>
                </div>
            );
        }

To be fair, this was written in the problem statement;

> Support an initial active tab, and ensure multiple instances on the page maintain independent selections.

So we can assume that the interviewer wants an uncontrolled component, but it's always good to clarify this with them. The key point to remember is that if we test this with the uncontrolled component, we can have multiple instances of the `Tabs` component on the same page and they will maintain independent states. If we test this with the controlled component, we will have the same state for all instances of the `Tabs` component on the same page since they are all controlled by the same parent state variable.

If we don't want that, we can just create a parent component that owns the state for each instance of the `Tabs` component and pass down the state and callback to each instance:

    :::javascript
    const [activeTab1, setActiveTab1] = useState(0);
    const [activeTab2, setActiveTab2] = useState(1);
