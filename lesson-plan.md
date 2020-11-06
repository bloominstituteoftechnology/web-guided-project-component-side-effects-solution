# Lesson Plan

## 1- Preliminaries

* Walk the class through the clone, install and start process of the GP repo.
* This project includes **two** scripts: one to start the API and the other for the React page.

## 2- Instructor's Checklist of Things to Cover

* Quick review of installing Axios in the project via NPM (the project has it already).
* The usefulness of centralizing constants used across the project in their own file.
* The Effect Hook.
* Constructing an URL by concatenating several pieces.
* Initializing slices of state that are lists to the empty array, so `.map` does not crash.
* Running effects after first render only.
* Running effects after every render.
* Running effects only after renders caused by changes in specific variables.
* Cleaning up after effects that leave timers or listeners in the DOM.
* The importance of using breakpoints or log statements inside the `.catch`.
* The lifecycle of components:
  1. Render function executes.
  1. React elements are returned and put in a virtual DOM.
  1. React figures out what's changed comparing against the previous state of the virtual DOM.
  1. React performs surgery on the real DOM if required.
  1. Effects execute now (cleanup of the previous effect runs first!).

## 3- Demo

See the design inside `src/design-files` and explain students what they are building.

The project is designed so we can comfortably observe the "life and death" of the `Details` component.

We will flesh out the files `App.js` and `Details.js`, in that order. Follow the `👉 TASK`s.

There are lots of console.logs to study, don't have them all commented in at once.

## 4- Links of Interest

* [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)
* [The Virtual DOM](https://reactjs.org/docs/faq-internals.html)

## 5- Following Along and Catching Up

* The instructor should make sure students clone the starter repo without forking it.
* The instructor must make commits to a `lecture` branch and push them regularly (or use a script to do it).
* If the students work on their own named branch, `main` is kept clean so they can re-do the demo later.
* In order to catch up, the students can reset their branch to the instructor's last pushed commit:

  ```bash
    git fetch && git reset --hard origin/lecture
  ```
