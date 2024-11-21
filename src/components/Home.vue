<template>
    <div id="app" class="app">
      <div class="home-container">
        <div class="welcome-box">
            <h1>Welcome to Book Management System</h1>
            <hr style="margin-left: 70px; margin-right: 70px;">
            <p>Please choose your role and log in</p>
            <div class="role-selection">
                <router-link :to="{ name: 'docgia_login' }">
                    <button class="role-btn">Độc giả</button>
                </router-link>

                <router-link :to="{ name: 'nhanvien_login' }">
                    <button class="role-btn staff">Nhân viên</button>
                </router-link>
            </div>
        </div>
      </div>
    </div>
</template>

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
  height: calc(100vh - 80px);
  background-color: #f0f4f8;
  padding: 20px; 
  box-sizing: border-box;
  flex: 1;
}

.welcome-box {
  text-align: center;
  background-color: white;
  padding: 30px;
  border-radius: 13px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px; /* Giới hạn kích thước tối đa rộng hơn */
  width: 100%; /* Khung mở rộng hết cỡ có thể */
  margin: 0 10px; /* Đảm bảo khoảng cách giữa khung và mép màn hình */
}

.welcome-box h1 {
  font-size: 1.5rem; /* Tăng kích thước font chữ tiêu đề */
  margin-bottom: 15px;
}

.welcome-box p {
  font-size: 1.1rem;
  margin-bottom: 25px;
}

.role-selection {
  display: flex;
  flex-direction: column;
  gap: 35px; /* Khoảng cách giữa các nút lớn hơn một chút */
}

@media (min-width: 640px) {
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
}

.role-btn {
    background: linear-gradient(90deg, #34a853, #0f9d58);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1.2rem;
    flex: 1; /* Đảm bảo các nút có kích thước bằng nhau */
    max-width: 160px; /* Giới hạn tối đa chiều rộng của mỗi nút */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.role-btn.staff {
    background: linear-gradient(90deg, #fbbc05, #f29900);
}

.role-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.role-btn:active {
    transform: scale(0.95);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

</style>