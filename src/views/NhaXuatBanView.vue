<template>
  <div class="dashboard-container">
      <div class="content">
        <!-- Nội dung của từng trang sẽ hiển thị ở đây -->
        <router-view></router-view>
        <div class="nha-xuat-ban-list-container">
          <NhaXuatBanList v-if="filterPublishersCount > 0" :publishers="filteredPublishers" v-model:activeIndex="activeIndex" />
          <p v-else>Không có nhà xuất bản nào</p>
        </div>

        <div class="feature-selection button-group">
            <button class="feature-button refresh" @click="refreshList">
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="feature-button add" @click="goToAddPublisher">
              <i class="fas fa-add"></i> Thêm mới
            </button>
            <div v-if="activePublisher">
              <NhaXuatBanCard :publisher="activePublisher"/>
              <router-link :to="{ 
                  name: 'hieuchinhnhaxuatban', 
                  params: { id: activePublisher._id } 
                }">
                <button class="feature-button edit">
                  <i class="fas fa-edit"></i> Hiệu chỉnh
                </button>
              </router-link>
            </div>
            <button class="feature-button removeall" @click="removeAll">
             <i class="fas fa-trash"></i> Xóa tất cả
            </button>
        </div>
      </div>
  </div>
</template>

<script>
import NhaXuatBanList from '@/components/NhaXuatBanList.vue';
import NhaXuatBanService from '@/services/NhaXuatBan.service';
import NhaXuatBanCard from '@/components/NhaXuatBanCard.vue';

export default {
  components: {
    NhaXuatBanList,
  },
  data() {
    return {
      publishers: [],
      activeIndex: -1
    };
  },
  watch: {

  },
  computed: {
    publisherStrings(){
      return this.publishers.map((publisher) => {
        const { ten, diachi } = publisher;
        return [ten, diachi].join("");
      });
    },
    filteredPublishers() {
      return this.publishers;
    },
    activePublisher() {
      if (this.activeIndex < 0) return null;
      return this.filteredPublishers[this.activeIndex];
    },
    filterPublishersCount() {
      return this.filteredPublishers.length;
    }
  },
  methods: {
    async retrievePublishers() {
      try {
        this.publishers = await NhaXuatBanService.getAllNXB();
        console.log(this.publishers);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrievePublishers();
      this.activeIndex = -1;
    },
    async removeAll() {
      try {
        const publishers = await NhaXuatBanService.getAllNXB();
        for (const publisher of publishers) {
          await NhaXuatBanService.deleteNXB(publisher._id);
        }
        alert("Đã xóa toàn bộ nhà xuất bản");
        this.refreshList();
      } catch (error) {
        console.log(error);
      }
    },
    goToAddPublisher() {
      this.$router.push({ name: "themnhaxuatban" });
    }
  },
  mounted() {
    this.refreshList();
  }

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.dashboard-container {
  display: flex;
  height: 89vh; /* Sử dụng toàn bộ chiều cao của cửa sổ */
  font-family: 'Roboto', sans-serif;
  overflow: hidden; /* Tránh thanh cuộn */
  max-height: calc(100vh - 80px);
}

.sidebar {
  width: 270px;
  background-color: #2c3e50;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ để tạo chiều sâu */
  height: 100vh; /* Sidebar cố định chiếm toàn bộ chiều cao */
  overflow-y: auto; /* Cho phép cuộn nội dung sidebar nếu quá dài */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin-bottom: 20px;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 10px;
  display: block;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.sidebar ul li a:hover {
  background-color: #34495e; /* Đổi màu nền khi hover */
}

.content {
  flex-grow: 1;
  padding: 30px;
  background-color: #ecf0f1;
  overflow-y: auto; /* Chỉ hiển thị thanh cuộn trong content nếu nội dung quá dài */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05); /* Đổ bóng nhẹ bên trong để tạo cảm giác gọn gàng */
  height: calc(100vh - 80px); /* Chiều cao cố định cho content */
}

/* Đảm bảo nội dung không bị kéo giãn */
.content h1, .content p {
  margin: 0;
}

.content h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

.content p {
  font-size: 16px;
  line-height: 1.6;
  color: #7f8c8d;
}

.nha-xuat-ban-list-container {
  width: 100%;
  border-collapse: collapse;
}

.feature-selection {
    display: flex;
    justify-content: center; /* Căn giữa các nút */
    align-items: center;
    gap: 20px; /* Khoảng cách giữa các nút */
    width: 100%;
    max-width: 400px; /* Giới hạn kích thước của container nút */
    margin: 0 auto; /* Đảm bảo nó nằm chính giữa khung */
    margin-top: 5px;
}

.feature-button {
    background: linear-gradient(90deg, #34a853, #0f9d58);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    flex: 1;
    min-width: 200px; /* Đặt kích thước tối thiểu cho nút */
    max-width: 300px; /* Giới hạn kích thước tối đa của mỗi nút */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.feature-button.refresh{
    background: linear-gradient(90deg, #fbbc05, #f29900);
    font-size: 1.1rem;
}

.feature-button.removeall{
    background: linear-gradient(90deg, #dc3545, #dc3545);
    font-size: 1.1rem;
}

.feature-button.edit{
  background: linear-gradient(90deg, #007bff, #0056b3);
  font-size: 1.1rem;
}

.feature-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.feature-button:active {
    transform: scale(0.95);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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