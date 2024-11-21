<template>
    <div class="dashboard-container">
        <div class="content">
            <button class="back-button" @click="goBack">Trở về</button>
            <div class="tdms-list-container">
                <TheoDoiMuonSachList v-if="filteredTDMSCount > 0"
                    :watchings="filteredTDMS"
                    v-model:activeIndex="activeIndex" />
                <p v-else>Không có lượt mượn sách nào</p>
            </div>

            <div class="feature-selection button-group">
                <button class="feature-button refresh" @click="refreshList">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import TheoDoiMuonSachCard from '@/components/TheoDoiMuonSachCard.vue';
import TheoDoiMuonSachList from '@/components/TheoDoiMuonSachList.vue';
import TheoDoiMuonSachService from '@/services/TheoDoiMuonSach.service';

export default {
    components: {
        TheoDoiMuonSachList,
    },
    data() {
        return {
            watchings: [],
            activeIndex: -1,
        }
    },
    computed: {
        watchingsStrings() {
            return this.watchings.map((watching) => {
                const { docgia, sach, ngaymuon, ngaytra } = watching;
                return [docgia, sach, ngaymuon, ngaytra].join("");
            })
        },
        filteredTDMS() {
            return this.watchings;
        },
        activeTDMS(){
           if (this.activeIndex < 0) return null;
           return this.filteredTDMS[this.activeIndex];
        },
        filteredTDMSCount() {
            return this.filteredTDMS.length;
        }
    },
    methods: {
        async retrieveTDMS() {
            try {
                const id = localStorage.getItem("id");
                this.watchings = await TheoDoiMuonSachService.getAllTDMSByDocGia(id);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveTDMS();
            this.activeIndex = -1;
        },
        goBack() {
            this.$router.push({ name: "dashboard_docgia" });
        },
    },
    mounted() {
      this.refreshList();
    }
}
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
  overflow-y: auto; /* Chỉ hiển thị thanh cuộn trong content nếu nội dung quá dài */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05); /* Đổ bóng nhẹ bên trong để tạo cảm giác gọn gàng */
  height: calc(100vh - 80px); /* Chiều cao cố định cho content */
}

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

.tdms-list-container {
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
    min-width: 250px; /* Đặt kích thước tối thiểu cho nút */
    max-width: 300px; /* Giới hạn kích thước tối đa của mỗi nút */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
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

.feature-button.reader {
  background: linear-gradient(90deg, #007bff, #0056b3);
}

.feature-button.book {
  background: linear-gradient(90deg, #dc3545, #dc3545);
}

.feature-button.available {
  background: linear-gradient(90deg, #28a745, #34d058);
}

.feature-button.refresh {
    background: linear-gradient(90deg, #fbbc05, #f29900);
}

.second {
    margin-top: 20px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .feature-selection {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .feature-button {
    width: 100%; /* Đảm bảo nút chiếm toàn bộ chiều rộng màn hình trên thiết bị nhỏ */
    max-width: 100%; /* Đảm bảo không có giới hạn kích thước tối đa trên thiết bị nhỏ */
  }

  .content {
    padding: 20px; /* Giảm padding cho content khi trên thiết bị nhỏ */
  }
}

</style>