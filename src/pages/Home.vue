<template>
    <main class="main container">
      <h1 class="main__title">Категории товаров</h1>
      <ul class="main__list">
        <li class="main__item" v-for="category in categories" :key="category.slug">
          <router-link :to="{ name: 'category', params: { slug: category.slug, categoryName: category.name } }">
            <div class="main__item__text" :style="'color:' + category.text_color"> {{ category.name }} </div>
            <img class="main__item__image" :src="category.image" :alt="category.name">
          </router-link>
        </li>
      </ul>
    </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      cityId: localStorage.getItem('cityId') || 1,
    };
  },
  async mounted() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('https://nlstar.com/ru/api/catalog3/v1/menutags/', {
          params: {
            city_id: this.cityId
          }
        });
        this.categories = response.data.tags;
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>
