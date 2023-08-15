import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },
    favCount() {
      return this.tasks.reduce((acc, curr) => {
        return curr.isFav ? acc + 1 : acc;
      }, 0);
    },
    // arrow function example (need to pass state in as arg)
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.loading = true;

      const res = await fetch('http://localhost:3000/tasks');
      const data = await res.json();
      this.tasks = data;

      this.loading = false;
    },
    async addTask(task) {
      this.tasks.push(task);

      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (res.error) console.error(res.error);
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });
      if (res.error) console.error(res.error);
    },
    async toggleFav(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isFav = !task.isFav;

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFav: task.isFav }),
      });
      if (res.error) console.error(res.error);
    },
  },
});
