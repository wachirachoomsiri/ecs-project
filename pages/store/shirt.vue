<template>
    <section>
        <div>
            <div class="flex flex-col items-center mx-auto mb-8">
                <div class="grid grid-cols-2 gap-4 w-96 mt-4 mb-0">
                    <b-button @click="$router.push('/store')" type="is-dark">ย้อนกลับ</b-button>
                    <b-button @click="$router.push('/history/shirt')" type="is-dark">ประวัติการซื้อเสื้อ</b-button>
                </div>
                <div class="text-center">
                    <br />
                    <div>
                        <div class="flex flex-col items-center justify-center mx-4 h-auto">
                            <div
                                class="box-border rounded-full bg-cover bg-white w-full md:w-[48rem] rounded-xl shadow-orange-300 shadow-2xl mx-10 px-10">
                                <div>
                                    <img src="/shirt.svg" alt="image" class="mx-auto mb-auto w-fit h-fit py-4">
                                    <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">ซื้อเสื้อ</h1>
                                    <form>
                                        <div class="mb-4">
                                            <label for="count"
                                                class="block text-gray-700 text-sm font-bold mb-2">จำนวน:</label>
                                            <select id="count" name="count" class="w-full border py-2 rounded">
                                                <option value="1">1 ตัว</option>
                                                <option value="2">2 ตัว</option>
                                                <option value="3">3 ตัว</option>
                                                <option value="4">4 ตัว</option>
                                                <option value="5">5 ตัว</option>
                                                <option value="6">6 ตัว</option>
                                                <option value="7">7 ตัว</option>
                                                <option value="8">8 ตัว</option>
                                                <option value="9">9 ตัว</option>
                                                <option value="10">10 ตัว</option>
                                            </select>
                                        </div>

                                        <div class="mb-4">
                                            <label for="size"
                                                class="block text-gray-700 text-sm font-bold mb-2">ไซส์เสื้อ:</label>
                                            <select id="size" name="size" class="w-full border py-2 rounded">
                                                <option value="" disabled selected>Select Size</option>

                                                <option v-for="item in getprovinces" :key="item.value" :value="item.value">
                                                    {{ item.label }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="mb-4">
                                            <label for="name"
                                                class="block text-gray-700 text-sm font-bold mb-2">ชื่อ:</label>
                                            <input type="text" id="name" name="name" class="w-full border py-2 rounded">
                                        </div>

                                        <div class="mb-4">
                                            <label for="address"
                                                class="block text-gray-700 text-sm font-bold mb-2">ที่อยู่:</label>
                                            <textarea id="address" name="address" rows="3"
                                                class="w-full border py-2 rounded"></textarea>
                                        </div>

                                        <div class="mb-4">
                                            <label for="phone"
                                                class="block text-gray-700 text-sm font-bold mb-2">เบอร์โทร:</label>
                                            <input type="tel" id="phone" name="phone" class="w-full border py-2 rounded">
                                        </div>

                                        <button type="submit" class="bg-blue-500 text-white py-2 rounded">สั่งซื้อ</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  



<script>
export default {
    auth: true,
    head() {
        return {
            title: "สั่งเสื้อ - EE XVII HOMECOMING",
        }
    },
    name: 'shirt',
    data() {
        return {
            getprovinces: [
                { value: 's', label: 'S' },
                { value: 'm', label: 'M' },
                { value: 'l', label: 'L' },
                { value: 'xl', label: 'XL' },
                { value: '2xl', label: '2XL' },
                { value: '3xl', label: '3XL' },
                { value: '4xl', label: '4XL' }
            ],
            loadingstate: true
        }
    },
    async mounted() {
        try {
            let response = await this.$axios.get("/api/socket/shirt/getprovinces")

            this.getprovinces = await response.data.province.map(data => {
                console.log(data.PROVINCE_ID, data.PROVINCE_NAME)
                return {
                    value: data.PROVINCE_ID, label: data.PROVINCE_NAME
                }
            })
            console.log(this.getprovinces)
        } catch (error) {

        } finally {
            this.loadingstate = false
        }

    },
    methods: {
    },
    destroyed() {

    },
}
</script>