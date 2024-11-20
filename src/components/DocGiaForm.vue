<template>
    <div class="home-container">
        <div class="form-container">
            <h2>{{ readerLocal && readerLocal._id ? `Hiệu  chỉnh` : `Thêm độc giả` }}</h2>
            <form @submit.prevent="submitReader">
                <div class="form-group">
                    <label for="hoten">Họ tên:</label>
                    <input v-model="readerLocal.hoten"
                            type="text" id="hoten" class="form-control"
                            placeholder="Nhập họ tên">
                    <ErrorMessage name="hoten" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input v-model="readerLocal.email"
                            type="text" id="email" class="form-control"
                            placeholder="Nhập email">
                    <ErrorMessage name="email" class="error-feedback" />
                </div>

                <div class="form-group" v-if="!readerLocal._id">
                    <label for="matkhau">Mật khẩu:</label>
                    <input v-model="password"
                            type="password" id="password" class="form-control"
                            placeholder="Nhập mật khẩu"
                            @input="handlePasswordInput">
                    <ErrorMessage name="matkhau" class="error-feedback" />
                </div>

                <div class="form-group" v-if="showConfirmPassword">
                  <label for="confirmPassword">Nhập lại mật khẩu:</label>
                  <input v-model="confirmPassword"
                        type="password" id="confirmPassword" class="form-control"
                        placeholder="Nhập lại mật khẩu">
                  <ErrorMessage name="confirmPassword" class="error-feedback" />
              </div>

                <div class="form-group">
                    <label for="phai">Giới tính:</label>
                    <input v-model="readerLocal.phai"
                            type="text" id="phai" class="form-control"
                            placeholder="Nhập giới tính">
                    <ErrorMessage name="phai" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="diachi">Địa chỉ:</label>
                    <input v-model="readerLocal.diachi"
                            type="text" id="diachi" class="form-control"
                            placeholder="Nhập địa chỉ">
                    <ErrorMessage name="diachi" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="dienthoai">Số điện thoại:</label>
                    <input v-model="readerLocal.dienthoai"
                            type="text" id="dienthoai" class="form-control"
                            placeholder="Nhập điện thoại">
                    <ErrorMessage name="dienthoai" class="error-feedback" />
                </div>

                <div class="button-group">
                    <button type="submit" class="btn btn-primary">Lưu</button>
                    <button v-if="readerLocal._id" type="button"
                            class="btn btn-danger" @click="deleteReader">
                        Xóa
                    </button>
                    <button type="button" class="btn btn-secondary" @click="Cancel" v-if="readerLocal._id">Thoát</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['submit:reader', 'delete:reader'],
    props: {
        reader: { type: Object, required: true },
    },
    data() {
        const readerFormSchema = yup.object().shape({
            hoten: yup.string().required("Họ tên không được để trống"),
            email: yup.string().required("Email không được để trống"),
            matkhau: yup.string().when('$isAdding', {
                is: true,
                then: yup.string().required("Mật khẩu không được để trống"),
                otherwise: yup.string(),
            }),
            confirmPassword: yup.string().oneOf(
                [yup.ref('matkhau'), null],
                "Nhập lại mật khẩu không khớp"
            ),
            phai: yup.string().required("Giới tính khó để chọn quá ha?"),
            diachi: yup.string().required("Địa chĩ không được để trống"),
            dienthoai: yup.string().required("Điện thoại không được để trống")
        });
        return {
            readerLocal: this.reader,
            readerFormSchema,
            password: "",
            confirmPassword: "",
            showConfirmPassword: false
        };
    },
    methods: {
        handlePasswordInput() {
          if (!this.showConfirmPassword) {
              this.showConfirmPassword = true
          }
        },
        submitReader() {
            if (!this.readerLocal._id && this.password != this.confirmPassword) {
              alert("Mật khẩu nhập lại không khớp");
              return;
            }
            this.readerLocal.matkhau = this.password;
            this.$emit('submit:reader', this.readerLocal);
        },
        deleteReader() {
            this.$emit('delete:reader', this.readerLocal._id);
        },
        Cancel() {
            const reply = window.confirm('You have unsaved changes! Do you want to leave?')
            if (!reply) {
                return false;
            } else {
                this.$router.push({ name: 'docgiaview' });
            }
        }
    }
}
</script>

<style scoped>
.home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: (100vh - 80px); /* Chiều cao toàn màn hình trừ đi chiều cao navbar */
    background-color: #f0f4f8;
    padding: 30px; 
    box-sizing: border-box;
    flex: 1;
}

.form-container {
  background-color: #fff;
  padding: 20px;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 90%;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.error-feedback {
  color: red;
  font-size: 0.9rem;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px; /* Khoảng cách giữa các nút */
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 100px; /* Đặt chiều rộng tối thiểu cho các nút để chúng đều nhau */
}

button:focus {
  outline: none;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  button {
    width: 100%; /* Đảm bảo nút chiếm toàn bộ chiều rộng màn hình trên thiết bị nhỏ */
  }
}
</style>