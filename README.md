# Project Description

See the live [diary](https://gregalletti.github.io/interview-prep/) on Pages.

## Setup

Install mkdocs and material plugin.
`pip install mkdocs mkdocs-material`

This project is now using [mkdocs-shadcn](https://github.com/asiffer/mkdocs-shadcn/tree/master) theme.
Follow the installation process (quite simple):

`pip install mkdocs-shadcn`

`pip install pymdown-extensions`

## Usage

### Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

### Local deployment

`mkdocs serve`
or
`python -m mkdocs serve`

will expose the documentation at http://127.0.0.1:8000/

`mkdocs serve --livereload` to enable live page reload

### Github Pages deployment from Local

You can deploy from local to GH pages by executing:
`mkdocs gh-deploy`.
or
`python -m mkdocs gh-deploy`.

### Github Pages deployment from Pipeline

TODO, or maybe not
