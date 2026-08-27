# TaskFlow Dashboard

Create a modern, professional and fully functional To-Do List Web Application for my CodeOrbit Tech Full Stack Development Internship — Task 2.

PROJECT NAME:

TaskFlow — Smart To-Do List

IMPORTANT:

This project must satisfy the internship requirement:

- Users can add tasks

- Users can edit tasks

- Users can delete tasks

- Users can mark tasks as completed

- Tasks must persist using browser localStorage

- Frontend must be built using HTML, CSS and JavaScript

- No backend or database is required

TECHNOLOGY:

- HTML5

- CSS3

- Vanilla JavaScript (ES6+)

- Browser localStorage

- No React

- No backend

- No database

- No unnecessary frameworks

DESIGN DIRECTION:

Create a professional productivity dashboard rather than a basic beginner To-Do app.

Use a clean LIGHT theme.

Color palette:

- White background

- Very light gray / blue-gray page background

- Dark navy text

- Blue-violet primary accent

- Soft blue accent

- Green for completed/success states

- Orange/red only for priority or destructive actions

Do NOT use:

- Dark theme

- Excessive gradients

- Neon colors

- Cartoon-style UI

- Excessive glassmorphism

Use:

- Clean cards

- Soft shadows

- Subtle borders

- 12–16px border radius

- Professional typography

- Consistent spacing

- Strong visual hierarchy

PAGE STRUCTURE:

HEADER:

Left:

TaskFlow logo/icon

"TaskFlow"

Subtitle:

"Stay organized. Get things done."

Right:

Current date

Small profile/avatar area if appropriate

MAIN DASHBOARD:

Top heading:

"Good morning 👋"

"Let's get things done."

Below the heading show a summary row:

TOTAL TASKS

0

COMPLETED

0

PENDING

0

PROGRESS

0%

These values must update dynamically.

ADD TASK SECTION:

Create a professional task input card.

Fields:

Task title

Placeholder:

"What needs to be done?"

Description (optional)

Placeholder:

"Add a short description..."

Priority:

- Low

- Medium

- High

Due Date:

Date picker

Button:

"+ Add Task"

When the user clicks Add Task:

- Validate the title

- Create the task

- Add it to the task list

- Save it to localStorage

- Clear the form

- Update statistics

- Show a subtle success animation

TASK LIST:

Heading:

"My Tasks"

Create task cards/rows.

Each task should display:

☐ Task title

Description

Priority badge

Due date

Created date

Actions:

- Complete

- Edit

- Delete

When a task is completed:

- Show checked checkbox

- Strike through the title

- Reduce visual emphasis

- Show "Completed" state

- Update completed count

- Update progress percentage

- Save the updated task to localStorage

EDIT TASK:

When Edit is clicked:

- Open a clean modal/dialog

- Pre-fill existing task data

- Allow changing:

  - Title

  - Description

  - Priority

  - Due date

- Buttons:

  - Save Changes

  - Cancel

After saving:

- Update the task

- Save to localStorage

- Refresh the task list

DELETE TASK:

When Delete is clicked:

Show confirmation dialog:

"Delete this task?"

Buttons:

Cancel

Delete

Only delete after confirmation.

Save the updated list to localStorage.

SEARCH:

Add a search bar:

"Search tasks..."

Search should work instantly while typing.

Search by:

- Task title

- Description

FILTERS:

Create filter buttons/dropdowns:

All

Active

Completed

Priority:

All

High

Medium

Low

Sort:

- Newest

- Oldest

- Due Date

- Priority

All filtering and sorting must work dynamically.

EMPTY STATE:

If there are no tasks:

Show a clean empty-state illustration/icon.

Text:

"No tasks yet"

"Add your first task and start getting things done."

Show:

"+ Add Task"

When all tasks are completed:

"All caught up! 🎉"

"You've completed all your tasks."

PROGRESS SECTION:

Create a small productivity card.

Example:

Today's Progress

████████████░░░ 80%

4 of 5 tasks completed

Calculate the percentage dynamically.

Do not hardcode these values.

LOCAL STORAGE:

This is very important.

Use localStorage to persist all tasks.

Storage key:

"taskflow_tasks"

When the page loads:

- Read tasks from localStorage

- Parse the stored JSON

- Render tasks

Whenever a task is:

- Added

- Edited

- Completed

- Deleted

Update localStorage immediately.

If localStorage is empty:

- Start with an empty task list

The tasks must remain available after:

- Browser refresh

- Closing and reopening the browser

Do NOT use a backend.

JAVASCRIPT STRUCTURE:

Keep the JavaScript clean and modular.

Create functions such as:

loadTasks()

saveTasks()

renderTasks()

addTask()

editTask()

deleteTask()

toggleTask()

filterTasks()

searchTasks()

sortTasks()

updateStatistics()

updateProgress()

clearForm()

Use event listeners properly.

Avoid putting everything inside one large function.

ANIMATIONS:

Add subtle professional animations.

Task card:

- Fade/slide in when created

Complete:

- Smooth checkbox animation

- Smooth text strike-through

Delete:

- Fade out before removal

Edit modal:

- Smooth fade + scale entrance

Buttons:

- Slight lift on hover

- Smooth transition

Statistics:

- Smooth number/progress update

Background:

- Very subtle animated gradient blobs

MOUSE INTERACTION:

Add a subtle cursor-following glow in the background.

The glow should:

- Follow the mouse slowly

- Have low opacity

- Never interfere with clicking

- Never reduce readability

Do not make the animation excessive.

Disable or reduce mouse effects on mobile.

RESPONSIVE DESIGN:

DESKTOP:

- Centered dashboard

- Maximum width around 1100–1200px

- Comfortable spacing

- Task list displayed professionally

TABLET:

- Adjust card sizes

- Maintain good spacing

MOBILE:

- Single-column layout

- Full-width task form

- Full-width buttons where appropriate

- Task actions remain easy to tap

- Filters become horizontally scrollable or stack cleanly

- No horizontal overflow

- Minimum 44px touch targets

ACCESSIBILITY:

Use:

- Semantic HTML

- Proper labels

- Accessible buttons

- Keyboard navigation

- Visible focus states

- aria-label where needed

- Good color contrast

Do not rely only on color to indicate task status.

VALIDATION:

Task title:

- Required

- Minimum 2 characters

Description:

- Optional

Due date:

- Optional

Show clear validation messages.

Prevent duplicate rapid submissions.

DATE HANDLING:

Display dates in a readable format.

Example:

Aug 27, 2026

Highlight overdue tasks with a subtle "Overdue" badge.

Do not mark completed tasks as overdue.

TASK PRIORITY:

High:

Use a subtle red/orange badge

Medium:

Use a subtle orange/yellow badge

Low:

Use a subtle blue/green badge

Keep the colors professional and not too bright.

TASK CARD DESIGN:

Example:

┌──────────────────────────────────────────────┐

│ ○ Complete JavaScript Assignment       High  │

│   Finish DOM manipulation exercises          │

│                                              │

│   📅 Aug 29, 2026                            │

│                                              │

│                    Edit   Delete             │

└──────────────────────────────────────────────┘

Completed example:

┌──────────────────────────────────────────────┐

│ ✓ Complete JavaScript Assignment   Completed │

│   Finish DOM manipulation exercises          │

│                                              │

│   📅 Aug 29, 2026                            │

└──────────────────────────────────────────────┘

NAVIGATION / EXTRA FEATURES:

Keep this as a single-page To-Do application.

Do not add unnecessary pages.

Add a simple footer:

"TaskFlow — Built with HTML, CSS & JavaScript"

"CodeOrbit Tech Internship — Task 2"

PROJECT QUALITY:

The application should look like a real frontend portfolio project.

It should NOT look like a basic tutorial project.

Make sure:

- Everything is functional

- No fake buttons

- No placeholder functionality

- No console errors

- No broken interactions

- No horizontal scrolling

- Good responsive behavior

- Clean code

- Reusable JavaScript functions

- Proper localStorage implementation

FILE STRUCTURE:

index.html

style.css

script.js

README.md

README.md should contain:

# TaskFlow — Smart To-Do List

## CodeOrbit Tech Internship — Task 2

## Description

A responsive and professional To-Do List Web Application built using HTML, CSS and JavaScript.

## Features

- Add tasks

- Edit tasks

- Delete tasks

- Mark tasks completed

- Search tasks

- Filter tasks

- Sort tasks

- Task priorities

- Due dates

- Progress tracking

- localStorage persistence

- Responsive design

- Smooth animations

## Technologies

HTML5

CSS3

JavaScript ES6+

localStorage

## How to Run

Explain how to run the project locally.

## Local Storage

Explain that tasks are stored in the browser using localStorage and no backend/database is required.

## Author

Renganathan S

## Internship

CodeOrbit Tech — Full Stack Development Internship

FINAL REQUIREMENT:

Before finishing, test every major interaction:

1. Add task

2. Edit task

3. Complete task

4. Uncomplete task

5. Delete task

6. Search

7. Filter

8. Sort

9. Refresh browser

10. Verify tasks still exist after refresh

11. Test empty state

12. Test mobile layout

Fix all errors before completing the project.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0e49c8c-2a86-4131-a6c8-37ebe5c7efa5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
