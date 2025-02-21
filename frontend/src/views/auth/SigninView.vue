<script setup lang="ts">
import { useRouter } from 'vue-router'
import axiosInstance from '../../axios'

const router = useRouter()

const sendForm = (e: Event) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const formObject = Object.fromEntries(formData.entries())

  axiosInstance
    .post('/signin', formObject)
    .then(() => {
      router.push('/login')
    })
    .catch((error) => {
      console.error('Error:', error.response ? error.response.data : error.message)
    })
}
</script>

<template>
  <section class="login">
    <h1>Sign In</h1>
    <form v-on:submit="sendForm" id="signin_form">
      <div>
        <label for="">Name</label>
        <input type="string" id="name" name="name" required placeholder="Name" />
      </div>
      <div>
        <label for="">Email</label>
        <input type="email" id="email" name="email" required placeholder="Email" />
      </div>
      <div>
        <label for="">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Minimo 6 characters"
          minlength="6"
        />
      </div>
      <div>
        <label for="">Address</label>
        <input type="string" id="address" name="address" required placeholder="address" />
      </div>
      <div class="action">
        <button type="submit">Enviar</button>
        <button type="reset">Resetar</button>
      </div>
      <a @click="router.push('/login')">Already have an account?</a>
    </form>
  </section>
</template>


<style scoped>
.login {
  display: grid;
  place-items: center;
}
</style>
