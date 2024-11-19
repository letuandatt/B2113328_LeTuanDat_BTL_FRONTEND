<template>
    <div v-if="book">
        <SachForm :book="book" @submit:book="updateBook" @delete:book="deleteBook"/>
    </div>
</template>

<script>
import SachForm from '@/components/SachForm.vue';
import SachService from '@/services/Sach.service';

export default {
    components: {
        SachForm,
    },
    props: {
        id: { type: String, requied: true },
    },
    data() {
        return {
            book: null,
        }
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await SachService.getSachById(id);
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
        async updateBook(data) {
            try {
                await SachService.updateSach(this.book._id, data);
                alert("Cập nhật sách thành công");
                this.$router.push({ name: "sachview" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook() {
            if(confirm("Bạn có muốn xóa sách này?")) {
                try {
                    await SachService.deleteSach(this.book._id);
                    this.$router.push({ name: "sachview" });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
    created() {
        this.getBook(this.id);
    }
}

</script>