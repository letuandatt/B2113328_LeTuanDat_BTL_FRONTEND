<template>
    <div class="home-container">
      <div class="form-container">
          <h2>{{ publisherLocal && publisherLocal._id ? `Hiệu chỉnh` : "Thêm Nhà Xuất Bản" }}</h2>
            <form @submit.prevent="submitPublisher">
                <div class="form-group">
                    <label for="ten">Tên Nhà Xuất Bản:</label>
                    <input
                        v-model="publisherLocal.ten"
                        type="text"
                        id="ten"
                        class="form-control"
                        placeholder="Nhập tên nhà xuất bản"/>
                    <ErrorMessage name="ten" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="diachi">Địa Chỉ:</label>
                    <input
                        v-model="publisherLocal.diachi"
                        type="text"
                        id="diachi"
                        class="form-control"
                        placeholder="Nhập địa chỉ"/>
                    <ErrorMessage name="diachi" class="error-feedback" />
                </div>

                <div class="button-group">
                    <button type="submit" class="btn btn-primary">Lưu</button>
                    <button
                        v-if="publisherLocal._id"
                        type="button"
                        class="btn btn-danger"
                        @click="deletePublisher">
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
        ErrorMessage
    },
    emits: ['submit:publisher', 'delete:publisher'],
    props: {
        publisher: { type: Object, required: true }
    },
    data() {
        const publisherFormSchema = yup.object().shape({
            ten: yup.string().required('Tên Nhà xuất bản không được để trống.'),
            diachi: yup.string().required('Địa chỉ không được để trống.')
        })
        return {
            publisherLocal: this.publisher,
            publisherFormSchema,
        }
    },
    methods: {
        submitPublisher() {
            this.$emit('submit:publisher', this.publisherLocal);
        },
        deletePublisher() {
            this.$emit('delete:publisher', this.publisherLocal._id)
        },
        Cancel() {
            const reply = window.confirm('You have unsaved changes! Do you want to leave?')
            if (!reply) {
                return false
            } else {
                this.$router.push({ name: 'nhaxuatbanview' })
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
    height: calc(73.1vh - 80px); /* Chiều cao toàn màn hình trừ đi chiều cao navbar */
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
