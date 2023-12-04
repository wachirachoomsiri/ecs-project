<template>
    <section>
        {{ this.$auth.user }}
    </section>
</template>
<script>
export default {
    auth: true,
    name: 'IndexPage',
    data() {
        return {
            data: null
        }
    },
    mounted() {

    },
}
</script>