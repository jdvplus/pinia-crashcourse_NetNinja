<template>
  <main>
    <!-- header -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia logo" />
      <h1>Pinia Task Manager</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">all tasks</button>
      <button @click="filter = 'favs'">favorited tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">loading tasks...</div>

    <!-- tasks section -->
    <div class="task-list" v-if="filter === 'all'">
      <p>
        you have {{ totalCount }}
        {{ totalCount > 1 || totalCount === 0 ? 'tasks' : 'task' }}
        remaining
      </p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>
        you have {{ favCount }}
        {{
          favCount > 1 || favCount === 0 ? 'favorited tasks' : 'favorited task'
        }}
        remaining
      </p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="reset">
      <button @click="taskStore.$reset">reset state</button>
    </div>
  </main>
</template>

<script setup>
import { useTaskStore } from './stores/TaskStore';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';

const taskStore = useTaskStore();

// destructure state properties + getters (no actions)
const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore);

taskStore.getTasks(); // fetch tasks

const filter = ref('all');
</script>
