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
  <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Thư viện trường ABC. All Rights Reserved.</p>
            <p>Contact us: library@abc.edu.vn | Phone: (123) 456-7890</p>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #3b5998;
    color: white;
    text-align: center;
    padding: 37.5px 0;
    position: relative;
    width: 100%;
    bottom: 0;
}

.footer p {
    margin: 5px 0;
    font-size: 1.2rem;
}

.footer a {
    color: #f0f4f8;
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}
</style>