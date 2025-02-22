<template>
  <div class="title">
    <h2>Regiões</h2>
    <RegionsForm action="create" @refreshRegions="getRegions" />
  </div>
  <Accordion :content="regions" @refreshRegions="getRegions" />
</template>

<script setup lang="ts">
import RegionsForm from './components/RegionsForm.vue'
import Accordion from './components/Accordion.vue'
import axiosInstance from '@/axios'
import { onMounted, ref } from 'vue'

type Region = {
  _id: string
  name: string
  geojson: GeoJson
}
type GeoJson = {
  type: string
  coordinates: [[[Coordinates]]]
}
type Coordinates = [number, number]

const regions = ref<Region[]>([])

const getRegions = () => {
  console.log('aqui get  Regions')
  axiosInstance
    .get('region')
    .then(({ data }) => {
      for (const el of data) {
        const coordinates_flat = el.geojson.coordinates.flat()
        el.map_coordinated = coordinates_flat.map((coord: Coordinates) => {
          return {
            lat: coord[0],
            lng: coord[1],
          }
        })
      }
      regions.value = data
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  getRegions()
})
</script>

<style scoped>
.title {
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 20px;
}
</style>
