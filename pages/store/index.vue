<template>
    <section class="flex items-center justify-center h-screen">
        <div>
            <b-button @click="$router.push('/store/ticket')" type="is-dark">จองโต๊ะ</b-button>
            <b-button @click="$router.push('/store/shirt')" type="is-dark">จองเสื้อ</b-button>
        </div>
    </section>
</template>
<script>
export default {
    head() {
        return {
            title: "STORE - EE XVII HOMECOMING",
        }
    },
    auth: true,
    name: 'storeIndex',
    data() {
        return {
            data: null
        }
    },
    async mounted() {
        // let {data} = await this.$auth.fetchUser()
        // console.log(data.type)
    },
}
</script>