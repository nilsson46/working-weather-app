<template>
  <div class="search-bar">
    <input
      class="city-input"
      placeholder="Search city..."
      v-model="inputValue"
      @keypress.enter="handleSearch"
      @blur="handleBlur"
      @keyup="startSearchTimer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted, watch } from "vue"; 


const props = defineProps({
initialValue:{
  type: String, 
  default:"",
},
});

const inputValue = ref(props.initialValue);
const emit = defineEmits(["city-searched"]);
let searchTimer: ReturnType<typeof setTimeout> | null = null;

const handleSearch = () => {
const searchValue = inputValue.value.trim();
if (!searchValue) {
  // Handle empty search value
  return;
}
emit("city-searched", searchValue);
inputValue.value="";
};

const startSearchTimer = () => {
clearSearchTimer(); 
searchTimer = setTimeout(handleSearch, 2000);
};

const clearSearchTimer = () => {
if(searchTimer) {
  clearTimeout(searchTimer);
  searchTimer = null;
}
};

const handleBlur= () => {
clearSearchTimer();
handleSearch();
};

watch(() => props.initialValue, (newValue) => {
inputValue.value = newValue;
})

onMounted(() => {
const storedValue = localStorage.getItem("searchValue");
if(storedValue) {
  inputValue.value = storedValue;
}
})


</script>

<style>
.search-bar{

display: flex;
justify-content: center;
align-items: center;
}
.city-input{
background-color: rgb(207, 249, 255);
padding: 0.5rem;
margin: 0.5rem;
border-radius: 0.5rem;
border: 0.1rem black solid;;
}
</style>