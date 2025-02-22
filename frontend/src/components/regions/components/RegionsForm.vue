<template>
  <button @click="openModal">
    {{ action == 'create' ? 'Criar Regiao' : 'Editar Regiao' }}
  </button>
  <Teleport to="body">
    <dialog id="regions_dialog">
      <button data-modal-close @click="closeModal">X</button>
      <form v-on:submit="sendForm">
        <div>
          <label for="name">Nome:</label>
          <input type="text" id="name" name="name" v-model="form.name" required />
        </div>
        <div>
          <div v-for="(coordinate, index) in coordinates" v-bind:key="index">
            <span>{{ coordinate[0] }}</span>
            <span>{{ coordinate[1] }}</span>
          </div>

          <div>
            <input type="number" />
            <input type="number" />
          </div>
        </div>

        <div class="action">
          <button type="submit">Enviar</button>
          <button type="reset">Resetar</button>
        </div>
      </form>
    </dialog>
  </Teleport>
</template>

<script lang="ts">
import axiosInstance from '@/axios'
import { Teleport } from 'vue'
export default {
  props: {
    action: {
      type: String,
      default: 'create',
    },
  },
  components: {
    Teleport,
  },
  data() {
    return {
      form: {
        name: '',
        coordinated: [],
      },
    }
  },
  methods: {
    sendForm(event: Event) {
      event.preventDefault()
      axiosInstance.post('region', {
        name: 'Polygon 1',
        coordinates: [
          [
            [-46.62529, -23.533773],
            [-46.62429, -23.534773],
            [-46.62329, -23.532773],
            [-46.62529, -23.533773],
          ],
        ],
      })
    },
    openModal() {
      const dialog = document.getElementById('regions_dialog')
      dialog?.showModal()
    },
    closeModal() {
      const dialog = document.getElementById('regions_dialog')
      dialog?.close()
    },
  },
}
</script>
