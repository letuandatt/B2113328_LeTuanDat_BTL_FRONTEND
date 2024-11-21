<template>
  <div class="profile-container">
    <div class="profile-box">
      <h2>Thông tin tài khoản</h2>
      <div class="form-group">
          <label for="id">ID của bạn:</label>
          <input type="text" id="id" v-model="id" required readonly/>
        </div>
        <div class="form-group">
          <label for="hoten">Họ và tên:</label>
          <input type="text" id="hoten" v-model="hoten" required readonly/>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required readonly/>
        </div>
        <div class="form-group">
          <label for="phai">Giới tính:</label>
          <input type="text" id="phai" v-model="phai" required readonly/>
        </div>
        <div class="form-group">
          <label for="diachi">Địa chỉ:</label>
          <input type="text" id="diachi" v-model="diachi" required readonly/>
        </div>
        <div class="form-group">
          <label for="dienthoai">Số điện thoại:</label>
          <input type="text" id="dienthoai" v-model="dienthoai" required readonly/>
        </div>
      <button @click="goBack" class="back-btn">Quay lại</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      id: "",
      hoten: "",
      email: "",
      phai: "",
      diachi: "",
      dienthoai: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.hoten = localStorage.getItem("ten");
    this.email = localStorage.getItem("email");
    this.phai = localStorage.getItem("phai");
    this.diachi = localStorage.getItem("diachi");
    this.dienthoai = localStorage.getItem("dienthoai");
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 115vh;
  background-color: #f0f4f8;
}

.profile-box {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.profile-box h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.save-btn {
  width: 100%;
  padding: 12px;
  background-color: #34a853;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
}

.save-btn:hover {
  background-color: #0f9d58;
}

.back-btn {
  width: 100%;
  padding: 12px;
  background-color: #ff4b5c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
  transition: 0.2s ease;
}

.back-btn:hover {
  background-color: #e24b58;
}
</style>
