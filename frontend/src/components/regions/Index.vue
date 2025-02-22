<template>
  <h2>Regions</h2>
  <RegionsForm action="create" />

  <div id="map"></div>
</template>

<script lang="ts">
import type { onMounted } from 'vue'
import RegionsForm from './components/RegionsForm.vue'
export default {
  name: 'RegionsIndex',
  components: {
    RegionsForm,
  },
  methods: {
    initMap() {},
  },
}
</script>
