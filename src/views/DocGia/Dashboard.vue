<template>
    <div id="app" class="app">
      <div class="home-container">
        <button class="logout-button" @click="goOut"><i class="fa fa-sign-out-alt"></i> Đăng xuất</button>
        <div class="features">
            <h1 style="text-align: center;">CHỌN CHỨC NĂNG MUỐN THỰC HIỆN</h1>
            <hr style="margin-left: 270px; margin-right: 270px;">
            <br>
            <div class="role-selection">
                <router-link :to="{ name: '' }">
                    <button class="role-btn ">Xem sách có sẵn</button>
                </router-link>
                <router-link :to="{ name: '' }">
                    <button class="role-btn borrow" >Mượn sách</button>
                </router-link>
                <router-link :to="{ name: '' }">
                    <button class="role-btn giveback">Trả sách</button>
                </router-link>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    methods: {
        goOut() {
            if(confirm("Bạn chắc chắn muốn thoát?")) {
            this.$router.push({ name: 'home' });
            }
        }
    }
  
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 69vh;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(80vh - 80px); /* Chiều cao toàn màn hình trừ đi chiều cao navbar */
  background-color: #f0f4f8;
  padding: 20px; 
  box-sizing: border-box;
  flex: 1;
}

.logout-button {
  position: absolute; /* Đặt vị trí tuyệt đối */
  top: 20px; /* Cách trên một khoảng */
  right: 20px; /* Cách phải một khoảng */
  background-color: #ff4b5c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.logout-button:active {
  transform: scale(0.95);
}

.features {
    text-align: center;
    background-color: white;
    padding: 30px;
    border-radius: 13px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    max-width: 900px; /* Tăng kích thước tối đa để khung rộng hơn */
    width: 150%; /* Mở rộng khung theo toàn bộ màn hình */
    margin: 0 10px;
}

.features h1 {
  font-size: 1.5rem; /* Tăng kích thước font chữ tiêu đề */
  margin-bottom: 15px;
}

.features p {
  font-size: 1.1rem;
  margin-bottom: 25px;
}

@media (min-width: 650px) {
  .role-selection {
    flex-direction: row; /* Khi màn hình đủ lớn, các nút sẽ xếp ngang */
  }
}

.role-selection {
    display: flex;
    justify-content: center; /* Căn giữa các nút */
    align-items: center;
    gap: 20px; /* Khoảng cách giữa các nút */
    width: 100%;
    max-width: 400px; /* Giới hạn kích thước của container nút */
    margin: 0 auto; /* Đảm bảo nó nằm chính giữa khung */
    margin-top: 5px;
}

.role-btn {
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

.role-btn.borrow {
    background: linear-gradient(90deg, #fbbc05, #f29900);
    font-size: 1.1rem;
}

.role-btn.giveback {
    background: linear-gradient(90deg, #dc3545, #dc3545);
    font-size: 1.1rem;
}

.role-btn.reader {
  background: linear-gradient(90deg, #007bff, #0056b3);
  font-size: 1.1rem;
}

.role-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.role-btn:active {
    transform: scale(0.95);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .role-selection {
    flex-direction: column; /* Các nút sẽ xếp dọc khi màn hình nhỏ hơn 768px */
    gap: 15px;
  }
}

</style>