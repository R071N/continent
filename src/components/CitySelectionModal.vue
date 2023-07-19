<template>
  <div v-if="isOpen" class="modal" @click.self="closeModal">
    <div class="modal__content">
      <div class="modal-close" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M14.815 0L8 6.815L1.185 0L0 1.185L6.815 8L0 14.815L1.185 16L8 9.185L14.815 16L16 14.815L9.185 8L16 1.185L14.815 0Z"
            fill="#979797" />
        </svg>
      </div>
      <h2>Выбор населённого пункта</h2>
      <div class="modal__content__block">
        <div class="input-container">
          <input class="modal__content__block__search" type="search" v-model="searchTerm" @input="searchCities"
            placeholder="Например, Санкт-петербург">
          <ul class="modal__content__block__city-list" v-if="showCityList && searchTerm.length > 0">
            <li class="modal__content__block__city-item" v-for="city in recentCities" :key="city.id"
              @click="selectCity(city)">
              {{ city.label }}
            </li>
          </ul>
        </div>
        <button class="btn btn-modal" @click="confirmCitySelection" :disabled="!selectedCity">
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['isOpen'],
  data() {
    return {
      searchTerm: '',
      cities: [],
      selectedCity: null,
      showCityList: true
    };
  },
  computed: {
    recentCities() {
      return this.cities.slice(0, 5);
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.showCityList = true;
      }
    }
  },
  methods: {
    async searchCities() {
      if (this.searchTerm.length >= 3) {
        try {
          const response = await axios.get('https://nlstar.com/api/catalog3/v1/city/', {
            params: {
              term: this.searchTerm,
              country: 'ru'
            }
          });
          this.cities = response.data.data;
          this.showCityList = true;
        } catch (error) {
          console.log(error);
        }
      } else if (this.searchTerm.length === 0) {
        this.showCityList = false;
      }
    },
    selectCity(city) {
      this.selectedCity = city;
      this.searchTerm = city.label;
      this.showCityList = false;
    },
    confirmCitySelection() {
      if (this.selectedCity) {
        this.$emit('city-selected', this.selectedCity);
      }
      location.reload();
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>
