<template>
  <button @click="openModal">
    {{ action == 'create' ? 'Criar Regiao' : 'Editar Regiao' }}
  </button>
  <Teleport to="body">
    <dialog id="regions_dialog" style="max-width: 50ch">
      <button data-modal-close @click="closeModal">X</button>
      <form @submit.prevent="sendForm">
        <div>
          <label for="name">Nome:</label>
          <input type="text" id="name" name="name" v-model="form.name" required />
        </div>
        <div>
          <div
            class="coordinateForm"
            v-for="(coordinate, index) in form.coordinates"
            v-bind:key="index"
            :data-index="index"
          >
            <div>
              <label :for="`lat-${index}`">Latitude</label>
              <input
                type="number"
                step="any"
                :id="`lat-${index}`"
                v-model="coordinate[0]"
                placeholder="Latitude"
              />
            </div>
            <div>
              <label :for="`lng-${index}`">Longitude</label>
              <input
                type="number"
                step="any"
                :id="`lng-${index}`"
                v-model="coordinate[1]"
                placeholder="Longitude"
              />
            </div>
            <button type="button" @click="removeCoordinate(index)">remove</button>
          </div>
          <div class="coordinateForm" v-if="form.coordinates.length > 1">
            <div>
              <label for="lat">Latitude</label>
              <input
                disabled
                type="number"
                step="any"
                id="lat"
                v-model="form.coordinates[0][0]"
                placeholder="Latitude"
              />
            </div>
            <div>
              <label for="lgn">Longitude</label>
              <input
                disabled
                type="number"
                step="any"
                id="lgn"
                v-model="form.coordinates[0][1]"
                placeholder="Longitude"
              />
            </div>
          </div>

          <button type="button" @click="addCoordinate">Adicionar Coordenada</button>
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
        coordinates: [] as number[][],
      },
    }
  },
  methods: {
    addCoordinate() {
      this.form.coordinates.push([0, 0])
    },
    removeCoordinate(index: number) {
      this.form.coordinates.splice(index, 1)
    },
    sendForm(event: Event) {
      event.preventDefault()
      const params = JSON.parse(JSON.stringify(this.form))

      params.coordinates.push(params.coordinates[0])
      params.coordinates = [params.coordinates]
      console.log(params)

      axiosInstance.post('region', params).then(() => {
        alert('Regiao criada com sucesso!')
        this.form = { name: '', coordinates: [] }
        this.closeModal()
        this.$emit('refreshRegions')
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

<style scoped>
.coordinateForm {
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    min-width: min(10ch, 100%);
  }
}
</style>
