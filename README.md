# Project Description

See the live [diary](https://gregalletti.github.io/interview-prep/) on Pages.

## Setup

Obviously you need mkdocs and material plugin. This project is now using [mkdocs-shadcn](https://github.com/asiffer/mkdocs-shadcn/tree/master) theme.

Follow the installation process below:

```
pip install mkdocs mkdocs-material

pip install mkdocs-shadcn

pip install pymdown-extensions
```

## Usage

### Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the local docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

### Local usage

`mkdocs serve`
or
`python -m mkdocs serve`
will expose the documentation at http://127.0.0.1:8000/

Use `mkdocs serve --livereload` to enable live page reload

### Github Pages deployment from Local

You can deploy from local to GH pages by executing:

`mkdocs gh-deploy`
or
`python -m mkdocs gh-deploy`
or
`python3 -m mkdocs gh-deploy`
or whichever command you prefer

### Github Pages deployment from Pipeline

TODO, or maybe not
