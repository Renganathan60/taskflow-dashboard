# TaskFlow — Smart To-Do List

## CodeOrbit Tech Internship — Task 2

## Description

A responsive and professional To-Do List Web Application built using HTML, CSS and JavaScript.
TaskFlow works as a productivity dashboard: it tracks totals, completion progress, priorities and
due dates, and stores everything in the browser so nothing is lost on refresh.

## Features

- Add tasks
- Edit tasks
- Delete tasks (with confirmation)
- Mark tasks completed / uncompleted
- Search tasks (title + description)
- Filter tasks (All / Active / Completed, and by priority)
- Sort tasks (Newest, Oldest, Due date, Priority)
- Task priorities (Low / Medium / High)
- Due dates with an "Overdue" badge
- Progress tracking with live statistics
- localStorage persistence
- Responsive design (desktop, tablet, mobile)
- Smooth animations and accessible keyboard navigation

## Technologies

HTML5
CSS3
JavaScript ES6+
localStorage

## How to Run

1. Download or clone this folder (`index.html`, `style.css`, `script.js`, `README.md`).
2. Open `index.html` directly in any modern browser — no build step is required.
3. Optionally serve it locally for a cleaner URL:
   - `npx serve .`
   - or `python3 -m http.server 5500`, then visit `http://localhost:5500`.

## Local Storage

All tasks are stored in the browser under the key `taskflow_tasks` as a JSON array.
On page load the app reads and parses that value and renders the tasks; every add, edit,
complete and delete writes back immediately. If nothing is stored, the app starts with an
empty list. No backend, server or database is used.

## Author

Renganathan S

## Internship

CodeOrbit Tech — Full Stack Development Internship
