<template>
  <div class="dashboard-container">
    <div class="content">
      <button class="back-button" @click="goBack">Trở về</button>
      <strong><h5 style="margin-bottom: 30px;">KIỂM TRA SÁCH CÒN LẠI</h5></strong>
      <div>
        <i style="font-size: 0.8rem;">(*) Nhấn vào một dòng cụ thể và kết quả hiện ở bên dưới</i>
      </div>
      <div class="sach-list-container">
        <SachList v-if="filteredBooksCount > 0"
                  :books="filteredBooks"
                  v-model:activeIndex="activeIndex"
                  @update:activeIndex="onBookSelection" />
        <p v-else>Không có sách nào</p>
      </div>
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      <hr style="margin-left: 250px; margin-right: 250px;" />
      <div v-if="activeBook">
        <div style="text-align: center; margin-top: 20px;">
          <strong style="font-size: 1.4rem;">Hiện tại, số quyển còn lại của sách {{ activeBook.ten }} là: </strong>
          <strong><span style="color: green; font-size: 1.4em;">{{ soSachConLai }} </span><span style="color: black; font-size: 1.4rem;"> sách.</span></strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SachList from '@/components/DocGia/SachList.vue';
import SachService from '@/services/Sach.service';
import TheoDoiMuonSachService from '@/services/TheoDoiMuonSach.service';

export default {
  components: {
    SachList,
  },
  data() {
    return {
      books: [],
      activeIndex: -1,
      error: null,
      soSachConLai: '',
    };
  },
  computed: {
    filteredBooks() {
      return this.books;
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        // Fetch the list of books from the SachService
        const booksData = await SachService.getAllSach();
        
        // Update books with availability data
        this.books = await Promise.all(
          booksData.map(async (book) => {
            const availability = await TheoDoiMuonSachService.checkSachAvailable(book._id);
            return {
              ...book,
              soSachConLai: availability.sachConlai,
            };
          })
        );
      } catch (error) {
        console.log(error);
        this.error = 'Không thể tải dữ liệu sách.';
      }
    },
    refreshList() {
      this.retrieveBooks();
      this.activeIndex = -1;
    },
    goBack() {
      this.$router.go(-1);
    },
    async sachCoSan() {
      if (this.activeBook) {
        try {
          const sachId = this.activeBook._id;
          const availability = await TheoDoiMuonSachService.checkSachAvailable(sachId);
          this.soSachConLai = availability.sachConlai || 'Không có dữ liệu';
        } catch (error) {
          console.log(`Lỗi: ${error.response ? error.response.data.message : error.message}`);
          this.error = `Lỗi: ${error.response ? error.response.data.message : error.message}`;
        }
      }
    },
    onBookSelection() {
      this.sachCoSan();
    }
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 89vh;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  max-height: calc(100vh - 80px);
}

.back-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.content {
  flex-grow: 1;
  padding: 30px;
  background-color: #ecf0f1;
  overflow-y: auto;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
  height: calc(100vh - 80px);
}

.sach-list-container {
  width: 100%;
  border-collapse: collapse;
}

.error {
  color: red;
  margin-top: 20px;
}

.book-availability {
  margin-top: 20px;
}

.borrow-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;

}

.borrow-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

strong h5 {
  font-size: 1.5em; /* Make the text larger for prominence */
  font-weight: bold; /* Ensure the text is bold */
  color: #2c3e50; /* Darker color for a professional and readable look */
  text-align: center; /* Center align the heading */
  margin-bottom: 40px; /* Increased bottom margin for better spacing */
  text-transform: uppercase; /* Make the text all caps for a strong emphasis */
  letter-spacing: 1px; /* Add some spacing between letters for better readability */
  padding: 10px 0; /* Add vertical padding for better spacing */
  /* background: linear-gradient(90deg, #007bff, #00c6ff); */
  color: black; /* Ensure the text is white for contrast */
  border-radius: 5px; /* Rounded corners for a softer look */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  margin-left: 450px;
  margin-right: 450px;
}
</style>
