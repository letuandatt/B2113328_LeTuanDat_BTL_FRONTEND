<template>
  <div class="content">
    <div>
      <button class="back-button" @click="goBack">Trở về</button>
    </div>
    <h1 style="text-align: center;">DANH SÁCH MƯỢN SÁCH THEO SÁCH</h1>
    <hr style="margin-left: 500px; margin-right: 500px"><br>
    <div class="filter">
      <label for="sach" style="margin-right: 15px;">Chọn sách:</label>
      <input
        type="text"
        id="sach"
        v-model="sachId"
        placeholder="Nhập ID sách"
      />
      <button @click="fetchBySach" style="margin-left: 15px;">Xem danh sách</button>
    </div>
    <div style="margin-bottom: 10px;">
        <strong>Những độc giả đã mượn sách <i>{{ sach.ten }}</i> là: </strong>
    </div>
    <table v-if="borrowings.length > 0" class="custom-table">
      <thead>
        <tr>
          <th scope="col" style="text-align: center;">STT</th>
          <th scope="col" style="text-align: center;">Độc giả</th>
          <th scope="col" style="text-align: center;">Ngày mượn</th>
          <th scope="col" style="text-align: center;">Ngày trả</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(borrowing, index) in borrowings" :key="borrowing._id">
          <td scope="col" style="text-align: center;">{{ index + 1 }}</td>
          <td scope="col" style="text-align: center;">{{ borrowing.docgia.hoten }}</td>
          <td scope="col" style="text-align: center;">{{ formatDate(borrowing.ngaymuon) }}</td>
          <td scope="col" style="text-align: center;">{{ !borrowing.ngaytra ? "Chưa trả" : formatDate(borrowing.ngaytra) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Không có dữ liệu mượn sách cho sách này.</p>
  </div>
</template>

<script>
import TheoDoiMuonSachService from '@/services/TheoDoiMuonSach.service';
import moment from 'moment';
import SachService from '@/services/Sach.service';

export default {
  data() {
    return {
      sachId: "",
      sach: "",
      borrowings: [],
    };
  },
  methods: {
    async fetchBySach() {
      if (!this.sachId) {
        alert("Vui lòng nhập ID sách.");
        return;
      }
      try {
        this.borrowings = await TheoDoiMuonSachService.getAllTDMSBySach(
          this.sachId
        );
        this.sach = await SachService.getSachById(this.sachId);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        alert("Không tìm thấy dữ liệu cho sách này.");
      }
    },
    goBack() {
      this.$router.push({ name: "theodoimuonsachview" });
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.content {
  padding: 30px;
  background-color: #ecf0f1;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
  height: calc(100vh - 80px);
}

h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

.filter {
  margin-bottom: 20px;
  text-align: center;
}

.filter input {
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.filter button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.filter button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Bảng theo phong cách mới */
.custom-table {
  width: 100%;
  margin-top: 2px;
  border-collapse: separate;
  border-spacing: 0 10px;
}

thead th {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  text-align: left;
}

tbody tr {
  background-color: white;
  transition: background-color 0.3s;
  cursor: pointer;
}

tbody tr:hover {
  background-color: #f0f4f8;
}

tbody tr.active {
  background-color: #d1ecf1;
}

td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

button {
  font-size: 0.9rem;
  padding: 5px 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

button i {
  margin-right: 5px;
}

/* Màu sắc và hiệu ứng hover cho các nút */
.btn-warning {
  background-color: #ffcc00;
  border-color: #ffcc00;
  color: #fff;
}

.btn-warning:hover {
  background-color: #e6b800;
  border-color: #e6b800;
}

@media (max-width: 768px) {
  table {
    font-size: 0.9rem;
  }
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
</style>
