<script>
export default {
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 }
    },
    emits: ['update:activeIndex'],
    methods: {
        updateActiveIndex(index) {
            this.$emit('update:activeIndex', index);
        }
    }
}
</script>

<template>
    <table class="table table-striped table-hover custom-table">
        <thead>
            <tr>
                <th scope="col" style="text-align: center;">STT</th>
                <th scope="col" style="text-align: center;">Tên Sách</th>
                <th scope="col" style="text-align: center;">Tác giả</th>
                <th scope="col" style="text-align: center;">Đơn giá</th>
                <th scope="col" style="text-align: center;">Số quyển</th>
                <th scope="col" style="text-align: center;">Năm xuất bản</th>
                <th scope="col" style="text-align: center;">Nhà xuất bản</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(book, index) in books" :key="book._id" 
                @click="updateActiveIndex(index)"
                :class="{ active: activeIndex === index }">
                <td>{{ index + 1 }}</td>
                <td>{{ book.ten }}</td>
                <td>{{ book.tacgia}}</td>
                <td>{{ book.dongia }}</td>
                <td>{{ book.soquyen }}</td>
                <td>{{ book.namxuatban }}</td>
                <td>{{ book.nhaxuatban.ten }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
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
</style>