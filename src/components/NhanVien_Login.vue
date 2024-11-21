<template>
  <div class="login-container">
    <button class="back-button" @click="goBack">Trở về</button>
    <div class="login-box">
      <h1>Đăng nhập Nhân viên</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <label>Mật khẩu</label>
          <div class="password-wrapper">
            <input
                :type="showPassword ? 'text' : 'password'"
                v-model="matkhau"
                placeholder="Mật khẩu"
                required />
            <button
                type="button"
                class="toggle-password"
                @click="togglePasswordVisibility" >
              <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </button>
          </div>
        </div>
        <button type="submit" class="login-btn">Đăng nhập</button>
      </form>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/Auth.service";

export default {
  data() {
    return {
      email: "",
      matkhau: "",
      role: 'nhanvien',
      error: null,
      showPassword: false,
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.error = null; // Xóa thông báo lỗi cũ
        const response = await AuthService.login({
          email: this.email,
          matkhau: this.matkhau,
          role: this.role,
        });
        const { token, user } = response;
        localStorage.setItem("token", token); // Lưu token vào localStorage
        localStorage.setItem("id_nv", user._id);
        localStorage.setItem("hoten_nv", user.hoten);
        localStorage.setItem("email_nv", user.email);
        localStorage.setItem("chucvu", user.chucvu);
        localStorage.setItem("diachi_nv", user.diachi);
        localStorage.setItem("dienthoai_nv", user.dienthoai);

        this.$router.push("/dashboard"); // Chuyển hướng về trang chính sau khi đăng nhập thành công
      } catch (err) {
        this.error = err.response?.data?.message || "Đăng nhập thất bại!";
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>

<style scoped>
/* Tùy chỉnh CSS cho giao diện đăng nhập */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 69vh;
  background-color: #f0f4f8;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
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

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #333;
}

.toggle-password i {
  pointer-events: none;
}

</style>