<template>
  <div>
    <h3>Kiểm tra tình trạng sách có sẵn</h3>
    <!-- Form nhập ID sách -->
    <div class="form-group">
        <label for="bookId">Nhập ID sách:</label>
        <input v-model="bookId" type="text" class="form-control" id="bookId" placeholder="Nhập ID sách" />
    </div>

    <!-- Nút kiểm tra -->
    <button @click="checkBookAvailability" class="btn btn-primary mt-3">Kiểm tra sách có sẵn</button>

    <!-- Hiển thị kết quả -->
    <div v-if="bookStatus !== null" class="mt-3">
      <p v-if="bookStatus.available">
        <span class="text-success">Sách còn {{ bookStatus.sachConlai }} cuốn</span>
      </p>
      <p v-else>
        <span class="text-danger">Rất tiếc, sách đã hết</span>
      </p>
    </div>

    <!-- Hiển thị thông báo lỗi -->
    <div v-if="errorMessage" class="mt-3 text-danger">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import TheoDoiMuonSachService from '@/services/TheoDoiMuonSach.service';

export default {
  data() {
    return {
      bookId: '',          // ID sách nhập vào
      bookStatus: null,    // Trạng thái có sẵn của sách
      errorMessage: null,  // Thông báo lỗi (nếu có)
    };
  },
  methods: {
    async checkBookAvailability() {
      // Reset thông báo lỗi mỗi khi người dùng nhấn nút kiểm tra
      this.errorMessage = null;

      if (!this.bookId) {
        this.errorMessage = "Vui lòng nhập ID sách.";
        return;
      }

      try {
        // Gọi API checkSachAvailable với ID sách
        const response = await TheoDoiMuonSachService.checkSachAvailable(this.bookId);

        // Cập nhật trạng thái sách
        this.bookStatus = response;
      } catch (error) {
        // Nếu có lỗi trong quá trình gọi API, hiển thị thông báo lỗi
        console.error("Lỗi khi kiểm tra sách:", error);
        this.errorMessage = "Không thể kiểm tra tình trạng sách. Vui lòng thử lại sau.";
      }
    },
  },
};
</script>

<style scoped>
/* Thêm kiểu dáng cho form */
.form-group {
  max-width: 400px;
  margin: 0 auto;
}

button {
  width: 100%;
}

.text-success {
  color: #28a745;
}

.text-danger {
  color: #dc3545;
}
</style>
