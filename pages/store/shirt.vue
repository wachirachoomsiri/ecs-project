<template>
    <section>
        <div class="flex flex-col items-center mx-auto mb-8 mt-4">
            <div class="text-center">
                <div>
                    <div class="flex flex-col items-center justify-center mx-4 h-auto">
                        <div
                            class="box-border rounded-full bg-cover bg-white w-screen sm:w-[48rem] rounded-xl shadow-orange-300 shadow-2xl mx-10 px-10">
                            <div>
                                <img src="/shirt.svg" alt="image" class="my-4 rounded-xl">
                                <h1 class="text-4xl font-silpakorn mb-4">ซื้อเสื้อ</h1>
                                <form>
                                    <b-field label-position="on-border" label="จำนวน:">
                                        <b-select expanded required id="count" v-model="form_data.count" name="count">
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
                                        </b-select>
                                    </b-field>

                                    <b-field label-position="on-border" label="ไซส์เสื้อ:">
                                        <b-select expanded required id="count" v-model="form_data.size" name="count">
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="2XL">2XL</option>
                                            <option value="3XL">3XL</option>
                                            <option value="4XL">4XL</option>
                                        </b-select>
                                    </b-field>

                                    <b-field label-position="on-border" label="ชื่อ:">
                                        <b-input required type="text" v-model="form_data.name" name="name"></b-input>
                                    </b-field>

                                    <b-field label-position="on-border" label="ที่อยู่">
                                        <b-autocomplete required v-model="form_data.address_name" :data="result"
                                            placeholder="ค้นหาจากตำบล" icon="magnify" clearable
                                            @select="option => selected = option">
                                            <template #empty>ไม่พบตำบล</template>
                                        </b-autocomplete>
                                    </b-field>

                                    <b-field label-position="on-border" label="ที่อยู่เพิ่มเติม:">

                                        <b-input maxlength="200" type="textarea" required v-model="form_data.address_more"
                                            placeholder="บ้านเลขที่,หมู่,ซอย,ถนน" name="address" rows="3"></b-input>
                                    </b-field>

                                    <b-field label-position="on-border" label="เบอร์โทร:">
                                        <b-input required type="tel" v-model="form_data.phone_number" name="tel"></b-input>
                                    </b-field>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  



<script>
import { searchAddressByDistrict } from 'thai-address-database'

export default {
    name: 'app',
    data() {
        return {
            form_data: {
                count: null,
                size: null,
                name: null,
                address_name: null,
                address_more: null,
                phone_number: null
            },
            address: [],
            address_name: '',
            selected: null,
            q: '',
        }
    },
    async mounted() {
        try {
            let response = await this.$axios.get("/api/user/getnumber")
            this.form_data.phone_number = response.data.phone_number
        } catch (error) {

        } finally {
        }

    },
    computed: {
        result() {
            let result = searchAddressByDistrict(this.form_data.address_name || '')
            return result.map(data => {
                return `${data.zipcode} ${data.province} ${data.amphoe} ${data.district}`
            })
        }
    }
}
</script>