<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const name = ref("Stef Br");

// Task data
const tasks = ref([
  {
    id: 1,
    title: "Task One",
    description: "Description of Task One",
    completed: false,
  },
  {
    id: 2,
    title: "Task Two",
    description: "Description of Task Two",
    completed: false,
  },
  {
    id: 3,
    title: "Task Three",
    description: "Description of Task Three",
    completed: false,
  },
  {
    id: 4,
    title: "Task Four",
    description: "Description of Task Four",
    completed: false,
  },
]);

// New task fields
const newTaskTitle = ref("");
const newTaskDescription = ref("");

// Dark mode state
const darkMode = ref(false);

// Task being edited
const editingTask = ref(null);
const editTitle = ref("");
const editDescription = ref("");

// Check localStorage for user preference and apply it on mount
onMounted(() => {
  darkMode.value = localStorage.getItem("theme") === "dark";
  document.documentElement.classList.toggle("dark", darkMode.value);
});

// Toggle dark mode and save preference
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle("dark", darkMode.value);
  localStorage.setItem("theme", darkMode.value ? "dark" : "light");
};

// Add a task with validation
const addTask = () => {
  if (!newTaskTitle.value.trim() || !newTaskDescription.value.trim()) {
    toast.error("Both title and description are required.");
    return;
  }
  tasks.value.push({
    id: Date.now(),
    title: newTaskTitle.value.trim(),
    description: newTaskDescription.value.trim(),
    completed: false,
  });
  toast.success("Task added successfully!");
  newTaskTitle.value = "";
  newTaskDescription.value = "";
};

// Edit task
const startEditingTask = (task) => {
  editingTask.value = task.id;
  editTitle.value = task.title;
  editDescription.value = task.description;
};

// Save edited task
const saveTask = (task) => {
  task.title = editTitle.value.trim();
  task.description = editDescription.value.trim();
  editingTask.value = null;
  toast.success("Task updated successfully!");
};

// Cancel editing
const cancelEditing = () => {
  editingTask.value = null;
};

// Delete task
const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
  toast.success("Task deleted successfully!");
};
</script>

<template>
  <!-- Dark Mode Toggle Button -->
  <label class="swap swap-rotate fixed top-5 right-5 z-50">
    <input type="checkbox" @click="toggleDarkMode" />
    <!-- Sun Icon -->
    <svg
      class="swap-on h-10 w-10 fill-yellow-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
      />
    </svg>
    <!-- Moon Icon -->
    <svg
      class="swap-off h-10 w-10 fill-blue-200"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
      />
    </svg>
  </label>

  <!-- App Container -->
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-75 pt-10"
  >
    <div
      class="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-badge shadow-md p-6 max-w-lg mx-auto mt-6"
    >
      <h1 class="text-center text-5xl font-bold mb-4 leading-tight">
        <span class="block text-gray-800 dark:text-gray-300">Task</span>
        <span class="block text-blue-500 font-extrabold">Manager</span>
      </h1>
      <p class="text-center text-gray-500 dark:text-gray-400">
        Add and manage your tasks with ease.
      </p>
    </div>

    <div class="flex flex-col items-center py-10">
      <!-- Task List -->
      <h2 class="text-2xl mb-5">Tasks:</h2>
      <ul class="w-full max-w-md space-y-4">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md"
        >
          <!-- Left Side: Checkbox and Task Details -->
          <div class="flex items-start space-x-3">
            <input
              type="checkbox"
              v-model="task.completed"
              class="checkbox checkbox-info mt-1"
            />
            <div v-if="editingTask === task.id" class="flex-grow">
              <!-- Edit Mode -->
              <input
                v-model="editTitle"
                placeholder="Task Title"
                class="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <textarea
                v-model="editDescription"
                placeholder="Task Description"
                class="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              ></textarea>
              <button
                @click="saveTask(task)"
                class="mr-2 py-1 px-3 bg-blue-500 text-white rounded"
              >
                Save
              </button>
              <button
                @click="cancelEditing"
                class="py-1 px-3 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
            <div v-else>
              <!-- Display Mode -->
              <h3
                :class="{
                  'line-through text-gray-500 dark:text-gray-400':
                    task.completed,
                }"
                class="text-xl font-semibold"
              >
                {{ task.title }}
              </h3>
              <p
                :class="{
                  'line-through text-gray-500 dark:text-gray-400':
                    task.completed,
                }"
              >
                {{ task.description }}
              </p>
            </div>
          </div>

          <!-- Right Side: Hamburger Menu Button within Task Box (hidden when in edit mode) -->
          <details v-if="editingTask !== task.id" class="dropdown">
            <summary class="btn m-1 bg-slate-500">
              <!-- Hamburger Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-5 w-5 stroke-slate-300 text-gray-200"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </summary>
            <ul
              class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li @click="startEditingTask(task)" class="cursor-pointer">
                <span class="text-blue-500 w-full text-left">Edit</span>
              </li>
              <li @click="deleteTask(task.id)" class="cursor-pointer">
                <span class="text-red-500 w-full text-left">Delete</span>
              </li>
            </ul>
          </details>
        </li>
      </ul>

      <!-- Add New Task -->
      <div class="mt-8 w-full max-w-md">
        <h2 class="text-2xl mb-4">Add New Task:</h2>
        <input
          v-model="newTaskTitle"
          placeholder="Task Title"
          class="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <textarea
          v-model="newTaskDescription"
          placeholder="Task Description"
          class="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        ></textarea>
        <button
          @click="addTask"
          :disabled="!newTaskTitle.trim() || !newTaskDescription.trim()"
          class="w-full py-2 px-4 font-bold bg-green-500 dark:bg-green-600 text-white rounded disabled:bg-gray-600 disabled:dark:bg-gray-200 disabled:dark:text-gray-700 disabled:cursor-not-allowed"
        >
          Add Task
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
