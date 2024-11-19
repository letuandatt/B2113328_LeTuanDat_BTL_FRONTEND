<template>
    <div>
        <SachForm :book="book" @submit:book="addBook" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import SachForm from '@/components/SachForm.vue';
import SachService from '@/services/Sach.service';

export default {
    components: {
        SachForm,
    },
    data() {
        return {
            book: {
                ten: "",
                tacgia: "",
                dongia: "",
                soquyen: "",
                namxuatban: "",
                nhaxuatban: "",
            },
            message: "",
        };
    },
    methods: {
        async addBook(data) {
            try {
                await SachService.createSach(data);
                alert("Tạo sách thành công");
                this.$router.push({ name: 'sachview' });
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.message = "";
    }
}
</script>

<style scoped>
</style>