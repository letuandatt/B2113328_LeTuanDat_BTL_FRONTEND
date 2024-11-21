<script>
export default {
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 }
    },
    data() {
        return {
            sortKey: '', // Column currently being sorted
            sortAsc: true // Sorting order: ascending (true) or descending (false)
        };
    },
    emits: ['update:activeIndex'],
    computed: {
        sortedBooks() {
            let sorted = [...this.books];
            if (this.sortKey) {
                sorted.sort((a, b) => {
                    let compareA = a[this.sortKey];
                    let compareB = b[this.sortKey];
                    
                    // Handle if it's a string or number
                    if (typeof compareA === 'string') {
                        compareA = compareA.toLowerCase();
                        compareB = compareB.toLowerCase();
                    }
                    
                    if (this.sortAsc) {
                        return compareA > compareB ? 1 : compareA < compareB ? -1 : 0;
                    } else {
                        return compareA < compareB ? 1 : compareA > compareB ? -1 : 0;
                    }
                });
            }
            return sorted;
        }
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit('update:activeIndex', index);
        },
        sortBy(key) {
            if (this.sortKey === key) {
                this.sortAsc = !this.sortAsc; // Toggle sorting order
            } else {
                this.sortKey = key;
                this.sortAsc = true; // Default sorting ascending when selecting a new column
            }
        }
    }
}
</script>

<template>
    <table class="table table-striped table-hover custom-table">
        <thead>
            <tr>
                <th scope="col" style="text-align: center;">STT</th>
                <th scope="col" style="text-align: center;">ID</th>
                <th scope="col" style="text-align: center;">Tên Sách</th>
                <th scope="col" style="text-align: center;">Tác giả</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(book, index) in sortedBooks" :key="book._id" 
                @click="updateActiveIndex(index)"
                :class="{ active: activeIndex === index }">
                <td>{{ index + 1 }}</td>
                <td>{{ book._id }}</td>
                <td>{{ book.ten }}</td>
                <td>{{ book.tacgia }}</td>
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
