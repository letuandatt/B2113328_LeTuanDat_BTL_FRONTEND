<script>
export default {
    props: {
        reader: { type: Object, required: true },
    },
}
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Họ tên:</strong>
            {{ reader.hoten }}
        </div>
        <div class="p-1">
            <strong>Email:</strong>
            {{ reader.email }}
        </div>
        <div class="p-1">
            <strong>Mật khẩu:</strong>
            {{ '*********' }}
        </div>
        <div class="p-1">
            <strong>Phái:</strong>
            {{ reader.phai }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ</strong>
            {{ reader.diachi }}
        </div>
        <div class="p-1">
            <strong>Điện thoại</strong>
            {{ reader.dienthoai }}
        </div>
    </div>
</template>
