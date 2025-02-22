<template>
  <nav v-if="is_loged">
    <div>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/profile">Perfil</RouterLink>
    </div>
    <div>
      <ColorScheme />
      <button class="logout" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import eventBus from '../../eventBus/index'
import ColorScheme from './ColorScheme.vue'

const is_loged = ref()
const router = useRouter()

const logout = () => {
  localStorage.removeItem('USER_TOKEN')
  localStorage.removeItem('USER_DATA')
  is_loged.value = null
  router.push('/login')
}

const getUserData = () => {
  is_loged.value = localStorage.getItem('USER_DATA')
}

onMounted(() => {
  getUserData()
  eventBus.$on('userLogin', getUserData)
})

onBeforeUnmount(() => {
  eventBus.$off('userLogin', getUserData)
})
</script>

<style scoped>
nav {
  padding: 1rem 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: fit-content;
    &:nth-child(2) {
      width: 300px;
      justify-content: flex-end;
    }
  }

  .logout {
    --bg: var(--danger);
  }
}
</style>
