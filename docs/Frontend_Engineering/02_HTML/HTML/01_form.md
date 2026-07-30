---
title: "🟢 Contact Form"
external_links:
    GreatFrontEnd: https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/contact-form
---
!!! note ""
    Building forms is a common task in front-end development. In this exercise, we will build a basic "Contact Us" form, commonly seen on marketing websites for visitors to ask questions or provide feedback.

    ### Requirements
    The form should contain the following elements:

    - `Name` field.
    - `Email` field.
    - `Message` field. Since the message can be long, a `<textarea>` will be more suitable.
    - `Submit` button.
    - Contains the text "Send".
    - Clicking the submit button submits the form.
    - The form and submission should be implemented entirely in HTML. Do not use any JavaScript or framework-specific features for this question.
    - There is no need to do any client-side validation on the fields. Validation will be done on the server side.

## Analysis

Fun fact: I filterd for React problems and got this, started implementing and realized it's pure HTML. Still ok.

Initial idea was to use the `value` property but then I remembered it becomes part of the text, and does not disappear one the user click on it, this would require a change on event which is not the target here. So I just removed it for the sake of the exercise.

In the improved version there's a proper implementation using `div` and `label` to identify the inputs. Moreover, the submit input is replaced by a `button` - couldn't remember the properties but looks like `button` submits on its own.

## Solution

=== "JavaScript"

        :::javascript
        import submitForm from './submitForm';

        export default function App() {
            return (
                <form
                action="https://questions.greatfrontend.com/api/questions/contact-form"
                method="post"
                // Ignore the onSubmit prop, it's used by GFE to
                // intercept the form submit event to check your solution.
                onSubmit={submitForm}>
                <input type="text" id="name" name="name" required/>
                <input type="text" id="email" name="email" required/>
                <textarea type="text" id="message" name="message" required/>
                <input type="submit" value="Send" />
                </form>
            );
        }

=== "JavaScript (improved)"

        :::javascript
        import submitForm from './submitForm';

        export default function App() {
            return (
                <form
                action="https://questions.greatfrontend.com/api/questions/contact-form"
                method="post"
                // Ignore the onSubmit prop, it's used by GFE to
                // intercept the form submit event to check your solution.
                onSubmit={submitForm}>
                <div>
                    <label htmlFor="name-input">Name</label>
                    <input type="text" id="name-input" name="name" required/>
                </div>
                <div>
                    <label htmlFor="email-input">Name</label>
                    <input type="text" id="email-input" name="email" required/>
                </div>
                <div>
                    <label htmlFor="message-input">Name</label>
                    <textarea type="text" id="message-input" name="message" required/>
                </div>
                <button>Send</button>
                </form>
            );
        }

## Key Takeaways

- in a form, the `name` property is the most important one as it's defining the parameter.
- `required` → enables the browser's built-in validation and prevents submission when the field is empty. Not needed for this problem as validation happens upon solution submission, but still good practice.
- `action` → defines where the form data is sent when the form is submitted.
- `method="post"` → sends the form data in the request body.

## Improvements

- `<button>` → inside a form, defaults to `type="submit"` and submits the form unless another type is specified.
- `label` + `htmlFor` → associates a label with an input, improving accessibility and allowing users to click the label to focus the field.
