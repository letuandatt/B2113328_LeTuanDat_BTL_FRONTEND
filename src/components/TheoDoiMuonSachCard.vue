<script>
export default {
    props: {
        borrowing: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Độc giả:</strong>
            {{ borrowing.docgia.hoten }}
        </div>
        <div class="p-1">
            <strong>Sách</strong>
            {{ borrowing.sach.ten }}
        </div>
        <div class="p-1">
            <strong>Ngày mượn</strong>
            {{ borrowing.ngaymuon }}
        </div>
        <div class="p-1">
            <strong>Ngày trả</strong>
            {{ borrowing.ngaytra }}
        </div>
    </div>
</template>