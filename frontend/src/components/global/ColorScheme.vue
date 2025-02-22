<template>
  <button id="mode-toggle" @click="changeColorTheme">
    <span id="sun" data-active="false">
      <svg
        width="40"
        height="40"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.0003 2.73726V1.97705M13.0003 24.0231V23.2629M23.2632 13.0001H24.0234M1.97729 13.0001H2.73751M20.2579 5.74327L20.7955 5.20572M5.20516 20.7945L5.74271 20.257M20.2579 20.2569L20.7955 20.7945M5.20516 5.20566L5.74271 5.74321M19.0672 12.9585C19.0672 16.3173 16.3443 19.0402 12.9855 19.0402C9.62667 19.0402 6.90381 16.3173 6.90381 12.9585C6.90381 9.5997 9.62667 6.87684 12.9855 6.87684C16.3443 6.87684 19.0672 9.5997 19.0672 12.9585Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>

    <span id="moon" data-active="true">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.9001 11.7003V8.70034M18.9001 8.70034V5.70034M18.9001 8.70034L21.9001 8.70034M18.9001 8.70034H15.9001M14.1001 5.70034V3.90034M14.1001 3.90034V2.10034M14.1001 3.90034L15.9001 3.90034M14.1001 3.90034L12.3001 3.90034M21.3 14.9398C20.3977 15.2134 19.4404 15.3605 18.4488 15.3605C13.0308 15.3605 8.63863 10.9684 8.63863 5.55037C8.63863 4.55915 8.78564 3.60227 9.05904 2.70034C5.03161 3.92172 2.1001 7.66338 2.1001 12.0897C2.1001 17.5077 6.49226 21.8999 11.9103 21.8999C16.337 21.8999 20.079 18.9678 21.3 14.9398Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </button>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const colorScheme = ref(localStorage.getItem('theme') || 'dark')

const setColorTheme = () => {
  const moon = document.getElementById('moon')
  const sun = document.getElementById('sun')

  localStorage.setItem('theme', colorScheme.value)
  moon?.setAttribute('data-visible', colorScheme.value === 'light')
  sun?.setAttribute('data-visible', colorScheme.value === 'dark')
  console.log(colorScheme.value)
  document.documentElement.style.setProperty('color-scheme', colorScheme.value)
}
const changeColorTheme = () => {
  if (colorScheme.value === 'dark') {
    colorScheme.value = 'light'
  } else {
    colorScheme.value = 'dark'
  }
  setColorTheme()
}
onMounted(() => {
  setColorTheme()
})
</script>

<style scoped>
#mode-toggle {
  z-index: 1;
  border: none;
  background: transparent;
  overflow: hidden;

  position: relative;
  width: 100px;
  height: 40px;

  display: grid;
  place-items: center;

  #sun,
  #moon {
    position: absolute;

    svg {
      transition: transform 2s
        linear(
          0,
          0.013 0.6%,
          0.05 1.2%,
          0.199 2.5%,
          0.395 3.7%,
          0.948 6.7%,
          1.201 8.4%,
          1.289 9.2%,
          1.354 10%,
          1.396 10.8%,
          1.416 11.6%,
          1.418 12.2%,
          1.405 12.9%,
          1.345 14.3%,
          1.258 15.6%,
          1.012 18.8%,
          0.909 20.5%,
          0.851 22%,
          0.826 23.6%,
          0.83 24.8%,
          0.854 26.2%,
          0.996 30.8%,
          1.039 32.5%,
          1.063 34%,
          1.073 35.5%,
          1.061 38.2%,
          0.984 44.4%,
          0.97 47.4%,
          0.973 49.8%,
          1.004 55.8%,
          1.013 59.2%,
          0.995 71%,
          1.002 82.8%,
          1
        );
    }
  }

  #sun {
    svg path {
      stroke: #feff94;
      filter: drop-shadow(0px 0px 3px yellow);
    }

    &[data-visible='false'] svg {
      transform: translateX(-75px);
    }
  }

  #moon {
    svg path {
      stroke: #505050;
      filter: drop-shadow(0px 0px 1px black);
    }

    &[data-visible='false'] svg {
      transform: translateX(75px);
    }
  }
}
</style>
