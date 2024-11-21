<script>
import AppHeader from './components/AppHeader.vue'

export default {
  components: {
    AppHeader
  }
}
</script>

<template>
  <div id="app" class="bg-gray-100 min-h-screen">
    <AppHeader />
    <div class="container mx-auto p-6">
      <router-view />
    </div>
  </div>
</template>