<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const sendForm = (e: Event) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const formObject = Object.fromEntries(formData.entries())
  console.log('aqui login', formObject)
}
</script>

<template>
  <section class="login">
    <h1>Login</h1>
    <form v-on:submit="sendForm" id="testForm">
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
