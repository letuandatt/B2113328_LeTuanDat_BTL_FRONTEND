<template>
  <div class="profile-container">
    <div class="profile-box">
      <h2>Thông tin tài khoản</h2>
        <div class="form-group">
          <label for="id">ID của bạn:</label>
          <div class="id-container">
            <input type="text" id="id" v-model="id" required readonly />
            <button @click="copyIdToClipboard" class="copy-btn">
              <i class="fa fa-copy"></i>
            </button>
          </div>
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
          <label for="chucvu">Chức vụ:</label>
          <input type="text" id="phai" v-model="chucvu" required readonly/>
        </div>
        <div class="form-group">
          <label for="diachi">Địa chỉ:</label>
          <input type="text" id="diachi" v-model="diachi" required readonly/>
        </div>
        <div class="form-group">
          <label for="dienthoai">Số điện thoại:</label>
          <input type="text" id="dienthoai" v-model="dienthoai" required readonly/>
        </div>
        <hr style="margin-left: 50px; margin-right: 50px;">
        <div>
          <i style="font-size: small;">(*) Hãy lưu trữ ID của bạn để tiện thao tác trên hệ thống!</i>
        </div>
        <div>
          <i style="font-size: small;">(*) Nếu có sai sót thông tin, hãy liên hệ nhân viên!</i>
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
    },
    copyIdToClipboard() {
        const idInput = document.getElementById("id");
        idInput.select(); // Chọn văn bản
        document.execCommand("copy"); // Copy vào clipboard
        alert("Sao chép thành công!");
    }
  },
  mounted() {
    this.id = localStorage.getItem("id_nv");
    this.hoten = localStorage.getItem("hoten_nv");
    this.email = localStorage.getItem("email_nv");
    this.chucvu = localStorage.getItem("chucvu");
    this.diachi = localStorage.getItem("diachi_nv");
    this.dienthoai = localStorage.getItem("dienthoai_nv");
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

.id-container {
  display: flex;
  align-items: center;
}

.copy-btn {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #34a853;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

.copy-btn:hover {
  background-color: #0f9d58;
}
</style>
