<template>
  <nav v-if="is_loged">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const is_loged = ref()

onMounted(() => {
  is_loged.value = localStorage.getItem('USER_TOKEN')
})
</script>
