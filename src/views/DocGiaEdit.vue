<template>
    <div v-if="reader">
        <DocGiaForm :reader="reader" @submit:reader="updateReader" @delete:reader="deleteReader"/>
    </div>
</template>

<script>
import DocGiaForm from '@/components/DocGiaForm.vue';
import DocGiaService from '@/services/DocGia.service';

export default {
    components: {
        DocGiaForm,
    },
    props: {
        id: { type: Object, required: true },
    },
    data() {
        return {
            reader: null,
        }
    },
    methods: {
        async getReader(id) {
            try {
                this.reader = await DocGiaService.getDocGiaByID(id);
            } catch (error) {
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1),
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateReader(data) {
            try {
                await DocGiaService.updateDocGia(this.reader._id, data);
                alert("Cập nhật độc giả thành công");
                this.$router.push({ name: "docgiaview" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteReader() {
            if(confirm("Bạn có muốn xóa độc giả này?")) {
                try {
                    await DocGiaService.deleteDocGia(this.reader._id);
                    this.$router.push({ name: "docgiaview" });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
    created() {
        this.getReader(this.id);
    }
}
</script>
