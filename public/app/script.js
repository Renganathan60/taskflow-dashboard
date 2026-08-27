/* TaskFlow — Smart To-Do List
 * CodeOrbit Tech Internship — Task 2
 * Vanilla JavaScript (ES6+) with localStorage persistence.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "taskflow_tasks";
  const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

  const state = {
    tasks: [],
    status: "all",
    priority: "all",
    sort: "newest",
    query: "",
    editingId: null,
    deletingId: null,
    submitting: false,
  };

  const $ = (id) => document.getElementById(id);
  const el = {
    form: $("taskForm"),
    title: $("title"),
    description: $("description"),
    priority: $("priority"),
    dueDate: $("dueDate"),
    titleError: $("titleError"),
    addBtn: $("addBtn"),
    list: $("taskList"),
    empty: $("emptyState"),
    emptyTitle: $("emptyTitle"),
    emptyText: $("emptyText"),
    emptyAddBtn: $("emptyAddBtn"),
    search: $("search"),
    priorityFilter: $("priorityFilter"),
    sortBy: $("sortBy"),
    statTotal: $("statTotal"),
    statCompleted: $("statCompleted"),
    statPending: $("statPending"),
    statProgress: $("statProgress"),
    progressFill: $("progressFill"),
    progressBar: $("progressBar"),
    progressPct: $("progressPct"),
    progressText: $("progressText"),
    editModal: $("editModal"),
    editForm: $("editForm"),
    editTitle: $("editTitle"),
    editDescription: $("editDescription"),
    editPriority: $("editPriority"),
    editDueDate: $("editDueDate"),
    editTitleError: $("editTitleError"),
    editCancel: $("editCancel"),
    deleteModal: $("deleteModal"),
    deleteName: $("deleteName"),
    deleteCancel: $("deleteCancel"),
    deleteConfirm: $("deleteConfirm"),
    toast: $("toast"),
    todayDate: $("todayDate"),
    greeting: $("greetingText"),
    glow: $("cursorGlow"),
  };

  /* ---------- Storage ---------- */
  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      state.tasks = Array.isArray(parsed) ? parsed.filter(isValidTask) : [];
    } catch (err) {
      console.warn("TaskFlow: could not read stored tasks.", err);
      state.tasks = [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    } catch (err) {
      console.warn("TaskFlow: could not save tasks.", err);
      showToast("Storage unavailable — changes may not persist");
    }
  }

  function isValidTask(t) {
    return t && typeof t === "object" && typeof t.title === "string" && t.id;
  }

  /* ---------- Helpers ---------- */
  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  function formatDate(value) {
    if (!value) return "";
    const d = value.length === 10 ? new Date(value + "T00:00:00") : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function isOverdue(task) {
    if (!task.dueDate || task.completed) return false;
    const due = new Date(task.dueDate + "T23:59:59");
    return due.getTime() < Date.now();
  }

  function showToast(message) {
    el.toast.textContent = message;
    el.toast.hidden = false;
    requestAnimationFrame(() => el.toast.classList.add("show"));
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      el.toast.classList.remove("show");
      setTimeout(() => (el.toast.hidden = true), 250);
    }, 2200);
  }

  /* ---------- CRUD ---------- */
  function addTask(data) {
    const task = {
      id: uid(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    state.tasks.unshift(task);
    saveTasks();
    render();
    showToast("Task added");
  }

  function editTask(id, data) {
    const task = state.tasks.find((t) => t.id === id);
    if (!task) return;
    Object.assign(task, data, { updatedAt: new Date().toISOString() });
    saveTasks();
    render();
    showToast("Task updated");
  }

  function deleteTask(id) {
    const node = el.list.querySelector(`[data-id="${id}"]`);
    const remove = () => {
      state.tasks = state.tasks.filter((t) => t.id !== id);
      saveTasks();
      render();
      showToast("Task deleted");
    };
    if (node) {
      node.classList.add("is-removing");
      setTimeout(remove, 220);
    } else {
      remove();
    }
  }

  function toggleTask(id) {
    const task = state.tasks.find((t) => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;
    saveTasks();
    render();
  }

  /* ---------- Query pipeline ---------- */
  function searchTasks(tasks) {
    const q = state.query.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) => t.title.toLowerCase().includes(q) || (t.description || "").toLowerCase().includes(q)
    );
  }

  function filterTasks(tasks) {
    return tasks.filter((t) => {
      if (state.status === "active" && t.completed) return false;
      if (state.status === "completed" && !t.completed) return false;
      if (state.priority !== "all" && t.priority !== state.priority) return false;
      return true;
    });
  }

  function sortTasks(tasks) {
    const list = tasks.slice();
    switch (state.sort) {
      case "oldest":
        return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "due":
        return list.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        });
      case "priority":
        return list.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
      default:
        return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }

  /* ---------- Rendering ---------- */
  function taskTemplate(task) {
    const overdue = isOverdue(task);
    const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    return `
      <li class="task ${task.completed ? "completed" : ""}" data-id="${task.id}">
        <button class="check" type="button" data-action="toggle" aria-pressed="${task.completed}"
          aria-label="${task.completed ? "Mark as not completed" : "Mark as completed"}: ${escapeHtml(task.title)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>
        </button>
        <div class="task-main">
          <div class="task-top">
            <h4 class="task-title">${escapeHtml(task.title)}</h4>
            <span class="badge ${task.completed ? "badge-done" : "badge-" + task.priority}">
              ${task.completed ? "Completed" : priorityLabel}
            </span>
          </div>
          ${task.description ? `<p class="task-desc">${escapeHtml(task.description)}</p>` : ""}
          <div class="task-meta">
            ${task.dueDate ? `<span class="meta-text">📅 Due ${formatDate(task.dueDate)}</span>` : ""}
            ${overdue ? `<span class="badge badge-overdue">Overdue</span>` : ""}
            <span class="meta-text">Created ${formatDate(task.createdAt)}</span>
            ${!task.completed ? `<span class="badge badge-${task.priority}" hidden></span>` : ""}
          </div>
          <div class="task-actions">
            <button class="btn btn-ghost" type="button" data-action="edit">Edit</button>
            <button class="btn btn-ghost" type="button" data-action="delete">Delete</button>
          </div>
        </div>
      </li>`;
  }

  function renderTasks() {
    const visible = sortTasks(filterTasks(searchTasks(state.tasks)));
    el.list.innerHTML = visible.map(taskTemplate).join("");

    const hasAny = state.tasks.length > 0;
    const allDone = hasAny && state.tasks.every((t) => t.completed);
    const showEmpty = visible.length === 0;
    el.empty.hidden = !showEmpty;
    el.list.hidden = showEmpty;

    if (showEmpty) {
      if (!hasAny) {
        el.emptyTitle.textContent = "No tasks yet";
        el.emptyText.textContent = "Add your first task and start getting things done.";
        el.emptyAddBtn.hidden = false;
      } else if (allDone && state.status !== "active") {
        el.emptyTitle.textContent = "All caught up! 🎉";
        el.emptyText.textContent = "You've completed all your tasks.";
        el.emptyAddBtn.hidden = false;
      } else if (allDone) {
        el.emptyTitle.textContent = "All caught up! 🎉";
        el.emptyText.textContent = "You've completed all your tasks.";
        el.emptyAddBtn.hidden = false;
      } else {
        el.emptyTitle.textContent = "No matching tasks";
        el.emptyText.textContent = "Try a different search term or filter.";
        el.emptyAddBtn.hidden = true;
      }
    }
  }

  function bump(node, value) {
    if (node.textContent === String(value)) return;
    node.textContent = value;
    node.classList.add("pop");
    setTimeout(() => node.classList.remove("pop"), 250);
  }

  function updateStatistics() {
    const total = state.tasks.length;
    const completed = state.tasks.filter((t) => t.completed).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    bump(el.statTotal, total);
    bump(el.statCompleted, completed);
    bump(el.statPending, total - completed);
    bump(el.statProgress, pct + "%");
  }

  function updateProgress() {
    const total = state.tasks.length;
    const completed = state.tasks.filter((t) => t.completed).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    el.progressFill.style.width = pct + "%";
    el.progressBar.setAttribute("aria-valuenow", String(pct));
    el.progressPct.textContent = pct + "%";
    el.progressText.textContent = `${completed} of ${total} task${total === 1 ? "" : "s"} completed`;
  }

  function render() {
    renderTasks();
    updateStatistics();
    updateProgress();
  }

  /* ---------- Form handling ---------- */
  function readForm() {
    return {
      title: el.title.value.trim(),
      description: el.description.value.trim(),
      priority: el.priority.value,
      dueDate: el.dueDate.value || "",
    };
  }

  function validateTitle(value, errorNode, input) {
    if (!value) {
      errorNode.textContent = "Task title is required.";
      input.setAttribute("aria-invalid", "true");
      return false;
    }
    if (value.length < 2) {
      errorNode.textContent = "Title must be at least 2 characters.";
      input.setAttribute("aria-invalid", "true");
      return false;
    }
    errorNode.textContent = "";
    input.removeAttribute("aria-invalid");
    return true;
  }

  function clearForm() {
    el.form.reset();
    el.priority.value = "medium";
    el.titleError.textContent = "";
    el.title.removeAttribute("aria-invalid");
  }

  el.form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (state.submitting) return;
    const data = readForm();
    if (!validateTitle(data.title, el.titleError, el.title)) {
      el.title.focus();
      return;
    }
    state.submitting = true;
    el.addBtn.disabled = true;
    addTask(data);
    clearForm();
    setTimeout(() => {
      state.submitting = false;
      el.addBtn.disabled = false;
    }, 350);
  });

  el.title.addEventListener("input", () => {
    if (el.titleError.textContent) validateTitle(el.title.value.trim(), el.titleError, el.title);
  });

  el.emptyAddBtn.addEventListener("click", () => {
    el.title.focus();
    el.title.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  /* ---------- List interactions ---------- */
  el.list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const id = btn.closest(".task").dataset.id;
    const action = btn.dataset.action;
    if (action === "toggle") toggleTask(id);
    if (action === "edit") openEditModal(id);
    if (action === "delete") openDeleteModal(id);
  });

  /* ---------- Search / filters / sort ---------- */
  el.search.addEventListener("input", (e) => {
    state.query = e.target.value;
    renderTasks();
  });

  document.querySelectorAll(".chip[data-status]").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.status = chip.dataset.status;
      document.querySelectorAll(".chip[data-status]").forEach((c) => c.classList.toggle("is-active", c === chip));
      renderTasks();
    });
  });

  el.priorityFilter.addEventListener("change", (e) => {
    state.priority = e.target.value;
    renderTasks();
  });

  el.sortBy.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderTasks();
  });

  /* ---------- Modals ---------- */
  function openModal(node) {
    node.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal(node) {
    node.hidden = true;
    document.body.style.overflow = "";
  }

  function openEditModal(id) {
    const task = state.tasks.find((t) => t.id === id);
    if (!task) return;
    state.editingId = id;
    el.editTitle.value = task.title;
    el.editDescription.value = task.description || "";
    el.editPriority.value = task.priority;
    el.editDueDate.value = task.dueDate || "";
    el.editTitleError.textContent = "";
    openModal(el.editModal);
    el.editTitle.focus();
  }

  el.editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = el.editTitle.value.trim();
    if (!validateTitle(title, el.editTitleError, el.editTitle)) return;
    editTask(state.editingId, {
      title,
      description: el.editDescription.value.trim(),
      priority: el.editPriority.value,
      dueDate: el.editDueDate.value || "",
    });
    state.editingId = null;
    closeModal(el.editModal);
  });

  el.editCancel.addEventListener("click", () => {
    state.editingId = null;
    closeModal(el.editModal);
  });

  function openDeleteModal(id) {
    const task = state.tasks.find((t) => t.id === id);
    if (!task) return;
    state.deletingId = id;
    el.deleteName.textContent = task.title;
    openModal(el.deleteModal);
    el.deleteConfirm.focus();
  }

  el.deleteCancel.addEventListener("click", () => {
    state.deletingId = null;
    closeModal(el.deleteModal);
  });

  el.deleteConfirm.addEventListener("click", () => {
    if (state.deletingId) deleteTask(state.deletingId);
    state.deletingId = null;
    closeModal(el.deleteModal);
  });

  [el.editModal, el.deleteModal].forEach((backdrop) => {
    backdrop.addEventListener("mousedown", (e) => {
      if (e.target === backdrop) {
        state.editingId = null;
        state.deletingId = null;
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!el.editModal.hidden) closeModal(el.editModal);
    if (!el.deleteModal.hidden) closeModal(el.deleteModal);
  });

  /* ---------- Chrome: date, greeting, cursor glow ---------- */
  function initChrome() {
    const now = new Date();
    el.todayDate.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const h = now.getHours();
    const greeting = h < 12 ? "Good morning 👋" : h < 17 ? "Good afternoon 👋" : "Good evening 👋";
    el.greeting.textContent = greeting;
  }

  function initCursorGlow() {
    if (window.matchMedia("(hover: none)").matches) return;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.glow.style.opacity = "1";
    });
    (function loop() {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      el.glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Init ---------- */
  initChrome();
  initCursorGlow();
  loadTasks();
  render();
})();
