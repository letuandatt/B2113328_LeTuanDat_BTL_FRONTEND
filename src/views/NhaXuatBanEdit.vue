<template>
    <div v-if="publisher">
        <NhaXuatBan_Form :publisher="publisher" @submit:publisher="updatePublisher" @delete:publisher="deletePublisher"/>
    </div>
</template>

<script>
import NhaXuatBan_Form from '@/components/NhaXuatBan_Form.vue';
import NhaXuatBanService from '@/services/NhaXuatBan.service';

export default {
    components: {
        NhaXuatBan_Form,
    },

    props: {
        id: { type: String, required: true },
    },

    data() {
        return {
            publisher: null,
        }
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = await NhaXuatBanService.getNXBByID(id);
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
        async updatePublisher(data) {
            try {
                await NhaXuatBanService.updateNXB(this.publisher._id, data);
                alert("Cập nhật nhà xuất bản thành công");
                this.$router.push({ name: "nhaxuatbanview" });
            } catch (error) {
                console.log(error);
            }
        },
        async deletePublisher() {
            if (confirm("Bạn có muốn xóa nhà xuất bản này?")) {
                try {
                    await NhaXuatBanService.deleteNXB(this.publisher._id);
                    this.$router.push({ name: "nhaxuatbanview" });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
    created() {
        this.getPublisher(this.id);
    }
}


</script>