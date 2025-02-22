<template>
  <h1>Dashboard de Usuario</h1>

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
          :disabled="loadingForm"
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
          :disabled="loadingForm"
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
          :disabled="loadingForm"
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
          :disabled="loadingForm"
        />
      </div>
      <div class="action">
        <Loading :loading="loadingForm">
          <button type="submit">Enviar</button>
        </Loading>
      </div>
    </form>
    <div class="deleteAccountButton">
      <button @click="deleteAccount" :disabled="loadingDelete">Delete Account</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../../axios'
import Loading from '@/components/global/Loading.vue'

const userInfo = ref({ name: '', email: '', new_password: '', address: '' })
const router = useRouter()
const loadingForm = ref(false)
const loadingDelete = ref(false)

const deleteAccount = () => {
  loadingDelete.value = true
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
    .finally(() => {
      loadingDelete.value = false
    })
}

const sendForm = async (e: Event) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const formObject = Object.fromEntries(formData.entries())

  loadingForm.value = true
  axiosInstance
    .put('/user', formObject)
    .then(({ data }) => {
      console.log('updated')
    })
    .catch((error) => {
      console.error('Error:', error.response ? error.response.data : error.message)
    })
    .finally(() => {
      loadingForm.value = false
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
    grid-template-columns: repeat(auto-fill, minmax(min(35ch, 100%), 1fr));
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

.deleteAccountButton {
  display: flex;
  justify-content: flex-end;
  button {
    --bg: var(--danger);
  }
}
</style>
