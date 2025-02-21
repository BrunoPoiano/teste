<script setup lang="ts">
import { useRouter } from 'vue-router'
import axiosInstance from '../../axios'
const router = useRouter()
import eventBus from '../../eventBus/index'

const sendForm = async (e: Event) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const formObject = Object.fromEntries(formData.entries())

  axiosInstance
    .post('/login', formObject)
    .then(({ data }) => {
      localStorage.setItem('USER_TOKEN', data.token)
      localStorage.setItem('USER_DATA', JSON.stringify(data.user))
      eventBus.$emit('userLogin', '')
      router.push('/')
    })
    .catch((error) => {
      console.error('Error:', error.response ? error.response.data : error.message)
    })
}
</script>

<template>
  <section class="login">
    <h1>Login</h1>
    <form v-on:submit="sendForm" id="login_form">
      <div>
        <label for="">Email</label>
        <input type="email" id="email" name="email" required placeholder="email" />
      </div>
      <div>
        <label for="">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="minimo 6 char"
          minlength="6"
        />
      </div>
      <div class="action">
        <button type="submit">Enviar</button>
        <button type="reset">Resetar</button>
      </div>
      <a @click="router.push('/signin')">Create an account?</a>
    </form>
  </section>
</template>


<style scoped>
.login {
  display: grid;
  place-items: center;
}
</style>
