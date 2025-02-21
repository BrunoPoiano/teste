<template >
  <h1>User Info</h1>

  <div class="form">
    <form id="edit_form" v-on:submit="sendForm">
      <div>
        <label for="">Name</label>
        <input
          type="string"
          id="name"
          v-model="userInfo.name"
          name="name"
          required
          placeholder="Name"
        />
      </div>
      <div>
        <label for="">Email</label>
        <input
          type="email"
          id="email"
          v-model="userInfo.email"
          name="email"
          required
          placeholder="Email"
        />
      </div>
      <div>
        <label for="">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="userInfo.new_password"
          placeholder="Minimo 6 characters"
          minlength="6"
        />
        <small data-danger>Edit to change the current password</small>
      </div>
      <div>
        <label for="">Address</label>
        <input
          type="string"
          id="address"
          v-model="userInfo.address"
          name="address"
          required
          placeholder="address"
        />
      </div>
      <div class="action">
        <button type="submit">Enviar</button>
      </div>
    </form>
    <button @click="deleteAccount">Delete Account</button>
  </div>
</template>

<script setup lang="ts" >
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../../axios'

const userInfo = ref({ name: '', email: '', new_password: '', address: '' })
const router = useRouter()

const deleteAccount = () => {
  axiosInstance
    .delete('/user')
    .then(({ data }) => {
      localStorage.removeItem('USER_TOKEN')
      localStorage.removeItem('USER_DATA')
      router.push('/login')
    })
    .catch((error) => {
      console.error('Error:', error.response ? error.response.data : error.message)
    })
}

const sendForm = async (e: Event) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const formObject = Object.fromEntries(formData.entries())

  axiosInstance
    .put('/user', formObject)
    .then(({ data }) => {
      console.log('updated')
    })
    .catch((error) => {
      console.error('Error:', error.response ? error.response.data : error.message)
    })
}

onMounted(() => {
  userInfo.value = JSON.parse(localStorage.getItem('USER_DATA') || '')
})
</script>

<style scoped>
.form {
  width: 100%;
  form {
    margin-inline: auto;
    width: min(80ch, 100%);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(35ch, 1fr));
    gap: 1rem;

    div {
      display: grid;
      grid-template-rows: subgrid;
      grid-row: span 3;
    }

    .action {
      grid-column: 1 / -1;
      display: flex;
      justify-content: end;
    }
  }
}
</style>
