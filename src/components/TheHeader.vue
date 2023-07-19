<template>
  <header class="header">
    <div class="header__container container">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="16" viewBox="0 0 11 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M5.5 7C4.119 7 3 5.881 3 4.5C3 3.119 4.119 2 5.5 2C6.881 2 8 3.119 8 4.5C8 5.881 6.881 7 5.5 7ZM5.5 0C2.462 0 0 2.462 0 5.5C0 8.538 5.5 16 5.5 16C5.5 16 11 8.538 11 5.5C11 2.462 8.538 0 5.5 0Z"
          fill="#979797" />
      </svg>
      <div class="header__country" @click="openModal">{{ cityName }}</div>
    </div>
  </header>
  <CitySelectionModal :isOpen="isModalOpen" @city-selected="handleCitySelected" @close="isModalOpen = false" />
</template>

<script>
import axios from 'axios';
import CitySelectionModal from '../components/CitySelectionModal.vue';

export default {
  components: { CitySelectionModal },
  data() {
    return {
      cityId: localStorage.getItem('cityId') || 1,
      cityName: '',
      isModalOpen: false,
    };
  },
  async mounted() {
    await this.fetchCityName();
  },
  methods: {
    async fetchCityName() {
      try {
        const response = await axios.get('https://nlstar.com/api/catalog3/v1/city/', {
          params: {
            id: this.cityId
          }
        });
        this.cityName = response.data.data.city;
      } catch (error) {
        console.log(error);
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    handleCitySelected(city) {
      localStorage.setItem('cityId', city.id);
      this.cityId = city.id;
      this.cityName = city.name;
      this.isModalOpen = false;
    }
  }
};
</script>
