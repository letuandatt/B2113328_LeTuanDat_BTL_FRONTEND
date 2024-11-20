<template>
    <div>
        <DocGiaForm :reader="reader" @submit:reader="addReader" />
        <p> {{ message }}</p>
    </div>
</template>

<script>
import DocGiaForm from '@/components/DocGiaForm.vue';
import DocGiaService from '@/services/DocGia.service';

export default{
    components: {
        DocGiaForm,
    },
    data() {
        return {
            reader: {
                hoten: "",
                email: "",
                matkhau: "",
                phai: "",
                diachi: "",
                dienthoai: "",
            },
            message: "",
        }
    },
    methods: {
        async addReader(data) {
            try {
                await DocGiaService.createDocGia(data);
                alert("Tạo độc giả thành công");
                this.$router.push({ name: "home" });
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