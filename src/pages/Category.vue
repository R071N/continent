<template>
  <main class="main container">
    <div class="category">
      <div class="category__up">
        <div @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="15" fill="#030303" />
            <path d="M21.9999 15H8.49988" stroke="white" stroke-width="2" />
            <path d="M13 10L8 15L13 20" stroke="white" stroke-width="2" />
          </svg>
        </div>
        <h1 class="category__up__title">{{ categoryName }}</h1>
      </div>
      <div class="category__block">
        <aside class="category__block__left" v-if="tags.length > 1">
          <ul class="category__block__left__list">
            <li class="category__block__left__item" @click="selectSubcategory(null)">Все продукты</li>
            <li class="category__block__left__item" v-for="tag in tags" :key="tag.slug" @click="selectSubcategory(tag)">
              {{ tag.name }}
            </li>
          </ul>
        </aside>
        <section class="category__block__right products">
          <div class="product" v-for="product in filteredProducts" :key="product.id">
            <img :src="product.main_image_thumb_300" :alt="product.present_name">
            <p>{{ product.category.name }}</p>
            <h2>{{ product.present_name }}</h2>
            <p>{{ product.comment_name }}</p>
            <p>{{ product.price }} руб.</p>
            <div>
              <button class="btn" disabled v-if="!product.allowed || !product.available">Нет в наличии</button>
              <button class="btn" v-else>
                <div class="btn-light"></div>
                В корзину
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  props: ['slug', 'categoryName'],
  data() {
    return {
      products: [],
      tags: [],
      cityId: null,
      selectedSubcategory: null,
    };
  },
  async mounted() {
    this.cityId = localStorage.getItem('cityId') || 1;
    await this.fetchProducts();
  },
  computed: {
    filteredProducts() {
      if (!this.selectedSubcategory) {
        return this.products;
      }
      return this.products.filter(product => product.tags.some(tag => tag.slug === this.selectedSubcategory.slug));
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(`https://nlstar.com/ru/api/catalog3/v1/menutags/${this.slug}/`, {
          params: {
            city_id: this.cityId
          }
        });
        this.products = response.data.products;
        this.tags = response.data.tags;
      } catch (error) {
        console.log(error);
      }
    },
    selectSubcategory(subcategory) {
      this.selectedSubcategory = subcategory;
    },
    goBack() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>
