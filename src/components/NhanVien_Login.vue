<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Đăng nhập Nhân viên</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <label>Mật khẩu</label>
          <input type="password" v-model="matkhau" placeholder="Mật khẩu" required />
        </div>
        <button type="submit" class="login-btn">Đăng nhập</button>
      </form>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      matkhau: "",
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.error = null; // Xóa thông báo lỗi cũ
        const response = await axios.post("http://localhost:3000/api/auth/login", {
          email: this.email,
          matkhau: this.matkhau,
        });
        const { token } = response.data;
        localStorage.setItem("token", token); // Lưu token vào localStorage
        this.$router.push("/"); // Chuyển hướng về trang chính sau khi đăng nhập thành công
      } catch (err) {
        this.error = err.response?.data?.message || "Đăng nhập thất bại!";
      }
    },
  },
};
</script>

<style scoped>
/* Tùy chỉnh CSS cho giao diện đăng nhập */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(80vh - 80px);
  background-color: #f0f4f8;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
  text-align: center;
}

.login-box h1 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  font-size: 1.1rem;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.login-btn {
  background: linear-gradient(90deg, #34a853, #0f9d58);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  width: 100%;
  transition: transform 0.2s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
}

.error-msg {
  color: red;
  margin-top: 10px;
}
</style>
<!-- Mai kéo nhỏ cái footer lại -->