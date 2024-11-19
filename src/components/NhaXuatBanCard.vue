<script>
export default {
    props: {
        publisher: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ publisher.ten }}
        </div>
        <div class="p-1">
            <strong>Email:</strong>
            {{ publisher.diachi }}
        </div>
    </div>
</template>