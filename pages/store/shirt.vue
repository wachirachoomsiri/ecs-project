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
                            <div class="box-border bg-white w-full p-16 rounded-xl shadow-orange-300 shadow-2xl py-4">
                                <div>
                                    <img src="/shirt.svg" alt="image" class="mx-auto mb-auto w-auto h-auto py-4">
                                    <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">ซื้อเสื้อ</h1>
                                    <form>
                                        <div class="mb-4">
                                            <label for="shirt-size"
                                                class="block text-gray-700 text-sm font-bold mb-2">จำนวน:</label>
                                            <select id="shirt-size" name="shirt-size" class="w-full border p-2 rounded">
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
                                            <label for="shirt-size"
                                                class="block text-gray-700 text-sm font-bold mb-2">ไซส์เสื้อ:</label>
                                            <select id="shirt-size" name="shirt-size" class="w-full border p-2 rounded">
                                                <option value="s">S</option>
                                                <option value="m">M</option>
                                                <option value="l">L</option>
                                                <option value="xl">XL</option>
                                                <option value="2xl">2XL</option>
                                                <option value="3xl">3XL</option>
                                                <option value="4xl">4XL</option>
                                            </select>
                                        </div>

                                        <div class="mb-4">
                                            <label for="name"
                                                class="block text-gray-700 text-sm font-bold mb-2">ชื่อ:</label>
                                            <input type="text" id="name" name="name" class="w-full border p-2 rounded">
                                        </div>

                                        <div class="mb-4">
                                            <label for="address"
                                                class="block text-gray-700 text-sm font-bold mb-2">ที่อยู่:</label>
                                            <textarea id="address" name="address" rows="3"
                                                class="w-full border p-2 rounded"></textarea>
                                        </div>

                                        <div class="mb-4">
                                            <label for="phone"
                                                class="block text-gray-700 text-sm font-bold mb-2">เบอร์โทร:</label>
                                            <input type="tel" id="phone" name="phone" class="w-full border p-2 rounded">
                                        </div>

                                        <button type="submit" class="bg-blue-500 text-white p-2 rounded">สั่งซื้อ</button>
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
import QrScanner from 'qr-scanner';
export default {
    auth: true,
    head() {
        return {
            title: "ซื้อเสื้อ - EE XVII HOMECOMING",
        }
    },
    name: 'ticket',
    data() {
        return {
            file: null,
            upload: {
                qrcode: null
            },
            activeStep: 0,
            loading_screen: null,
            row: null,
            user_type: null,
            claim_by_me: [],
            timeout: null,
            stopwatch: null,
            stw_intv: null
        }
    },
    async mounted() {
        clearInterval(this.stw_intv);

        this.socket = this.$nuxtSocket({
            // channel: '/',
            reconnection: false,
            autoConnect: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 1000,
            timeout: 10000,
            auth: {
                token: this.$auth.strategy.token.get()
            }
        });

        this.socket.on('table_list', (msg) => {
            let maped = msg.data.map((d) => {
                return { ...d, ismy: (d.claim == this.$auth.user), mouse_state: 0 }
            })
            this.row = maped;
            this.myclaim();
        });


        this.socket.on('table_update', (msg) => {
            this.activeStep = 0;
            this.row[msg.id]['status'] = msg.status;
            this.row[msg.id]['claim'] = msg.claim;
            this.row[msg.id]['ex_claim_date_time'] = msg.ex_claim_date_time;
            if ((msg.claim == this.$auth.user) && msg.status != 2) {
                this.row[msg.id]['ismy'] = true;
            } else {
                this.row[msg.id]['ismy'] = false;
            }
            this.myclaim();
        });

        this.socket.on("connect", () => {
            this.socket.emit("table_list");
        });


        this.socket.on("noti", (data) => {
            try {
                this.loading_screen.close();
            } catch (error) { }
            if (data.status == "success") {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${data?.message}`,
                    type: 'is-success',
                    hasIcon: true,
                    closable: true,
                    // queue: false,
                })
            } else if (data.status == "fail") {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${data?.message}`,
                    type: 'is-danger',
                    hasIcon: true,
                    closable: true,
                    queue: false,
                })
            }
        });

        this.socket.on('connect_error', (error) => {
            this.row = null;
            this.reconnect();
        });

        this.socket.on('disconnect', (reason) => {
            this.row = null;
            this.reconnect();
        });

        this.socket.on('table_mouseover', (data) => {
            if (data.user != this.$auth.user) {
                this.row[data.id]['mouse_state'] = 1;
            }
        });

        this.socket.on('table_mouseout', (data) => {
            if (data.user != this.$auth.user) {
                this.row[data.id]['mouse_state'] = 0;
            }
        });

        let { data } = await this.$auth.fetchUser();
        this.user_type = data.type;
    },
    methods: {
        copytokip() {
            navigator.clipboard.writeText('6527078072');
            this.$buefy.toast.open('คัดลอกแล้ว')
        },
        async upload_slip_func() {
            const loadingComponent = this.$buefy.loading.open({ container: null });
            try {
                let { data } = await QrScanner.scanImage(this.file, { returnDetailedScanResult: true })
                this.upload.qrcode = data;
                try {
                    const response = await this.$axios.post("/api/socket/ticket/upload", { ...this.upload });
                    console.log(response);
                } catch (error) {
                    this.$buefy.notification.open({
                        duration: 5000,
                        message: `${error?.response?.data?.message || error}`,
                        type: 'is-danger',
                        hasIcon: true,
                        closable: false,
                        queue: true,
                    })
                }
            } catch (error) {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${error}`,
                    type: 'is-danger',
                    hasIcon: true,
                    closable: true,
                    queue: false,
                })
            } finally {
                loadingComponent.close()
            }
        },
        next_step() {
            if (this.activeStep < 1) {
                this.activeStep++;
            }
        },
        async myclaim() {
            this.claim_by_me = await this.row.filter((data) => {
                if (data.ismy && data.status == 1) {
                    return true
                }
            });
            var min = Math.min(...this.claim_by_me.map(item => {
                return new Date(item.ex_claim_date_time).getTime()
            }));
            if (min != Infinity) {
                this.timeout = min;
                this.tick_watch();
                clearInterval(this.stw_intv);
                this.stw_intv = setInterval(() => {
                    this.tick_watch();
                }, 100);
            }
        },
        tick_watch() {
            let timenow = new Date().getTime();
            let mSeconds = this.timeout - timenow;
            let minutes = Math.floor((((mSeconds % 31536000000) % 86400000) % 3600000) / 60000);
            let seconds = Math.floor(((((mSeconds % 31536000000) % 86400000) % 3600000) % 60000) / 1000);
            let f = '';
            if (minutes) {
                f += `${minutes} นาที `
            }
            if (seconds) {
                f += `${seconds} วินาที`
            }
            this.stopwatch = f;
        },
        gotostore() {
            this.$router.push('/store');
        },
        reconnect() {
            setTimeout(() => {
                this.socket.connect()
            }, 1000);
        },
        mouseover(el) {
            let b_data = this.row[el.target.id];
            this.socket.emit("table_mouseover", { id: b_data.id, user: this.$auth.user });
        },
        mouseout(el) {
            let b_data = this.row[el.target.id];
            this.socket.emit("table_mouseout", { id: b_data.id, user: this.$auth.user });
        },
        // remove_list_class(classList, list) {
        //     list.forEach(element => {
        //         classList.remove(element)
        //     });
        // },
        // add_list_class(classList, list) {
        //     list.forEach(element => {
        //         classList.add(element)
        //     });
        // },
        event_tk(el) {
            let b_data = this.row[el.target.id];
            if (b_data.status == 0) {
                this.loading_screen = this.$buefy.loading.open({ container: null });
                this.socket.emit("table_click", { id: b_data._id });
                this.clear_loading();
            } else if (b_data.status == 1 && b_data.ismy) {
                this.loading_screen = this.$buefy.loading.open({ container: null });
                this.socket.emit("table_unclick", { id: b_data._id });
                this.clear_loading();
            } else {
                return
            }
        },
        clear_loading() {
            setTimeout(() => {
                try {
                    this.loading_screen.close();
                } catch (error) { }
            }, 10000);
        },
        // get_table_list() {
        //     // this.socket.emit("table_list")
        //     // console.log()
        // }
    },
    destroyed() {
        clearInterval(this.stw_intv)
    }
}
</script>