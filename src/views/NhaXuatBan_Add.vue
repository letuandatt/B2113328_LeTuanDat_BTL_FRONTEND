<template>
    <div>
        <NhaXuatBan_Form :publisher="publisher" @submit:publisher="addPublisher"/>
        <p> {{ message }}</p>
    </div>
</template>

<script>
import NhaXuatBan_Form from '@/components/NhaXuatBan_Form.vue';
import NhaXuatBanService from '@/services/NhaXuatBan.service';

export default {
    components: {
        NhaXuatBan_Form
    },

    data() {
        return {
            publisher: {
                ten: "",
                diachi: "",
            },
            message: "",
        }
    },

    methods: {
        async addPublisher(data) {
            try {
                await NhaXuatBanService.createNXB(data);
                alert("Tạo nhà xuất bản thành công");
                this.$router.push({ name: "nhaxuatbanview" });
            } catch (error) {
                console.log(error);
            };
        } 
    },

    created() {
        this.message = "";
    }
}

</script>

<style scoped>

</style>