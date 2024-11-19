<template>
    <div class="home-container">
        <div class="form-container">
            <h2>{{ bookLocal && bookLocal._id ? `Hiệu chỉnh` : `Thêm Sách` }}</h2>
            <form @submit.prevent="submitBook">
                <div class="form-group">
                    <label for="ten">Tên Sách:</label>
                    <input v-model="bookLocal.ten"
                            type="text" id="ten" class="form-control"
                            placeholder="Nhập tên sách" />
                    <ErrorMessage name="ten" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="tacgia">Tác giả:</label>
                    <input v-model="bookLocal.tacgia"
                            type="text" id="tacgia" class="form-control"
                            placeholder="Nhập tác giả" />
                    <ErrorMessage name="tacgia" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="dongia">Đơn giá:</label>
                    <input v-model="bookLocal.dongia"
                            type="text" id="dongia" class="form-control"
                            placeholder="Nhập đơn giá" />
                    <ErrorMessage name="dongia" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="soquyen">Số quyển:</label>
                    <input v-model="bookLocal.soquyen"
                            type="text" id="soquyen" class="form-control"
                            placeholder="Nhập số quyển" />
                    <ErrorMessage name="soquyen" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="namxuatban">Năm xuất bản:</label>
                    <input v-model="bookLocal.namxuatban"
                            type="text" id="namxuatban" class="form-control"
                            placeholder="Nhập năm xuất bản" />
                    <ErrorMessage name="namxuatban" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="nhaxuatban">Nhà xuất bản:</label>
                    <input v-model="bookLocal.nhaxuatban"
                            type="text" id="nhaxuatban" class="form-control"
                            placeholder="Nhập ID nhà xuất bản" />
                    <ErrorMessage name="nhaxuatban" class="error-feedback" />
                </div>

                <div class="button-group">
                    <button type="submit" class="btn btn-primary">Lưu</button>
                    <button
                        v-if="bookLocal._id"
                        type="button"
                        class="btn btn-danger"
                        @click="deleteBook" >
                        Xóa
                    </button>
                    <button type="button" class="btn btn-secondary" @click="Cancel">Thoát</button>
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
    emits: ['submit:book', 'delete:book'],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            ten: yup.string().required("Tên sách không được trống"),
            tacgia: yup.string().required("Tên tác giả không được trống"),
            dongia: yup.string().required("Đơn giá không được trống"),
            soquyen: yup.string().required("Số quyển không được trống"),
            namxuatban: yup.string().required("Năm xuất bản không được trống"),
            nhaxuatban: yup.string().required("Nhà xuất bản không được trống")
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
        };
    },
    methods: {
        submitBook() {
            this.$emit('submit:book', this.bookLocal);
        },
        deleteBook() {
            this.$emit('delete:book', this.bookLocal._id);
        },
        Cancel() {
            const reply = window.confirm('You have unsaved changes! Do you want to leave?')
            if (!reply) {
                return false;
            } else {
                this.$router.push({ name: 'sachview' });
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
    height: 100vh; /* Chiều cao toàn màn hình trừ đi chiều cao navbar */
    background-color: #f0f4f8;
    padding: 30px; 
    box-sizing: border-box;
    flex: 1;
    margin-bottom: 50px;
}

.form-container {
  background-color: #fff;
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
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