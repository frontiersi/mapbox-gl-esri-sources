<template>
    <a-row>
        <slot name="content"></slot>
    </a-row>
</template>

<script>

export default {
    name: 'DefaultLayout'
}

</script>

<style>
table {
    width: 100%;
}

thead th {
    padding: 10px 30px 10px 0px;
}

tbody td {
    padding: 6px 30px 6px 0px;
    border-bottom: 1px solid rgb(240, 240, 240);
    border-top: 1px solid rgb(240, 240, 240);
}
</style>