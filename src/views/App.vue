<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const name = ref("Stef Br");
const status = ref("active");

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

// Refs for new task inputs
const newTaskTitle = ref("");
const newTaskDescription = ref("");

const addTask = () => {
  if (!newTaskTitle.value.trim()) {
    toast.error("Task title is required.", {
      timeout: 5000, // Duration in milliseconds
      closeButton: false, // Hide close button
      icon: "⚠️", // Custom icon
    });
    return;
  }
  if (!newTaskDescription.value.trim()) {
    toast.error("Task description is required.");
    return;
  }

  tasks.value.push({
    id: Date.now(), // Use timestamp as unique ID
    title: newTaskTitle.value.trim(),
    description: newTaskDescription.value.trim(),
    completed: false,
  });

  // Show success message
  toast.success("Task added successfully!");

  // Clear input fields after adding the task
  newTaskTitle.value = "";
  newTaskDescription.value = "";
};
</script>

<template>    <!-- Toggle Button at the Top Right -->

    <input type="checkbox"
      class="toggle fixed top-4 right-4 z-50"
    >
  </input>
  <div class="bg-slate-700 min-h-screen text-white">
    <div class="flex flex-col items-center mt-10">
      <h1
        class="text-5xl font-bold font-mono text-gray-100 bg-cyan-900 rounded-xl px-32 py-3 shadow-lg hover:bg-cyan-700 transition-colors duration-300"
      >
        {{ name }}
      </h1>
      <!-- Task List -->
      <h3 class="text-xl my-3">Tasks:</h3>
      <ul>
        <li v-for="task in tasks" :key="task.id" class="flex items-start my-3">
          <input type="checkbox" v-model="task.completed" class="mr-2 mt-1" />
          <div>
            <h4 :class="{ 'line-through': task.completed }">
              {{ task.title }}
            </h4>
            <p :class="{ 'line-through': task.completed }">
              {{ task.description }}
            </p>
          </div>
        </li>
      </ul>

      <!-- Add New Task Form -->
      <div class="mt-5 w-full max-w-md">
        <h3 class="text-xl mb-3">Add New Task:</h3>
        <input
          v-model="newTaskTitle"
          placeholder="Task Title"
          class="border p-2 w-full mb-2"
        />
        <textarea
          v-model="newTaskDescription"
          placeholder="Task Description"
          class="border p-2 w-full mb-2"
        ></textarea>
        <button
          @click="addTask"
          :disabled="!newTaskTitle.trim() || !newTaskDescription.trim()"
          class="mt-3 px-4 py-2 bg-green-500 text-white rounded-md w-full"
        >
          Add Task
        </button>
      </div>
    </div>
    <!-- Logo Clouds -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 class="text-center text-lg/8 font-semibold text-gray-900">
          Trusted by the world’s most innovative teams
        </h2>
        <div
          class="mx-auto mt-10 max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
        >
          <img
            class="col-span-2 max-h-12 w-full object-contain lg:col-span-1 lg:col-start-3"
            src="@/components/logo_text_white.svg"
            alt="Your Company Logo"
            width="200"
            height="50"
          />
        </div>
      </div>
    </div>
    </div>
</template>

<style scoped>
.line-through {
  text-decoration: line-through;
}
button:disabled {
  background-color: gray;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
