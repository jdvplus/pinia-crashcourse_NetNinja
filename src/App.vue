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

    <!-- reset state -->
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

<style scoped>
header {
  text-align: center;
  background: #e7e7e7;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

header img {
  max-width: 60px;
  /* transform: rotate(-10deg); */
  margin-bottom: 20px;
}

header h1 {
  margin: 0;
  font-size: 2em;
  padding-top: 25px;
  margin-left: 15px;
  color: #777;
  /* transform: rotate(2deg); */
}

.new-task-form {
  background: #e7e7e7;
  padding: 20px 0;
}

.filter {
  width: 640px;
  margin: 10px auto;
  text-align: right;
}

.filter button {
  display: inline-block;
  margin-left: 10px;
  background: #fff;
  border: 2px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 1em;
}

.loading {
  max-width: 640px;
  border: 1px solid #ffd859;
  background: #ffe9a0;
  color: #3a3a3a;
  padding: 5px 0;
  text-align: center;
  margin: 30px auto;
}

.task-list {
  max-width: 640px;
  margin: 20px auto;
}

.reset {
  display: flex;
  justify-content: center;
  margin: 25px 0;
}

.reset button {
  display: inline-block;
  background: #fff;
  border: 2px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 1em;
  width: 20%;
}
</style>
