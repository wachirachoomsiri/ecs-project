<template>
    <section>
        <div>
            <div class="flex flex-col items-center mx-auto mb-8">

                <div class="text-center">
                    <br>
                    <div>
                        <div class="flex flex-col items-center justify-center mx-4 h-auto ">
                            <div class="box-border bg-white w-auto p-16 rounded-xl shadow-orange-300 shadow-xl py-4">
                                <div>
                                    <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">ยินดีต้อนรับเข้าสู่ EE XVII
                                        HOMECOMING</h1>
                                    <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">งานจัดขึ้นในวันที่ 24
                                        กุมภาพันธ์
                                        2566</h1>
                                    <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">ณ
                                        ศูนย์ศิลปวัฒนธรรมเฉลิมพระเกียรติ</h1>
                                    <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">6 รอบพระชนมพรรษา</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="grid grid-cols-3 gap-4 w-96 mt-4 mb-0 mt-6">
                    <b-button @click="$router.push('/store/ticket')" type="is-dark">จองโต๊ะ</b-button>
                    <b-button @click="$router.push('/store/shirt')" type="is-dark">ซื้อเสื้อ</b-button>
                    <b-button @click="$router.push('/store/shirt')" type="is-dark">ออกจากระบบ</b-button>
                </div> -->
            </div>
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