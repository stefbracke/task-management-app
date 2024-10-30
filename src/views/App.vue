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
</script>

<template>
  <!-- Dark Mode Toggle Button -->
  <input type="checkbox"
  @click="toggleDarkMode"
      class="toggle fixed top-5 right-5 z-50 "
    >
  </input>



  <!-- App Container -->
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-75 pt-10"
  >

  
  <div class="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-badge shadow-md p-6 max-w-lg mx-auto mt-6">
  <h1 class="text-center text-5xl font-bold mb-4 leading-tight">
    <span class="block text-gray-800 dark:text-gray-300">Task</span>
    <span class="block text-blue-600 font-extrabold">Manager</span>
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
          class="flex items-start p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md"
        >
          <input type="checkbox" v-model="task.completed" class="mr-3 mt-1" />
          <div>
            <h3
              :class="{
                'line-through text-gray-500 dark:text-gray-400': task.completed,
              }"
              class="text-xl font-semibold"
            >
              {{ task.title }}
            </h3>
            <p
              :class="{
                'line-through text-gray-500 dark:text-gray-400': task.completed,
              }"
            >
              {{ task.description }}
            </p>
          </div>
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
