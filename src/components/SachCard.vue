<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ book.ten }}
        </div>
        <div class="p-1">
            <strong>Tác giả</strong>
            {{ book.tacgia }}
        </div>
        <div>
            <strong>Đơn giá</strong>
            {{ book.dongia }}
        </div>
        <div>
            <strong>Số quyển</strong>
            {{ book.soquyen }}
        </div>
        <div>
            <strong>Năm xuất bản</strong>
            {{ book.namxuatban }}
        </div>
        <div>
            <strong>Nhà xuất bản</strong>
            {{ book.nhaxuatban }}
        </div>
    </div>
</template>