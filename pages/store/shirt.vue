<template>
    <section>
        <div>
            <div class="flex flex-col items-center mx-auto mb-8">
                <div class="grid grid-cols-2 gap-4 w-96 mt-4 mb-0 ">
                    <b-button @click="$router.push('/store')" type="is-dark">ย้อนกลับ</b-button>
                    <b-button @click="$router.push('/history/shirt')" type="is-dark">ประวัติการซื้อเสื้อ</b-button>
                </div>
                <div class="text-center">
                    <br>
                    <div>
                        <div class="flex flex-col items-center justify-center mx-4 h-auto ">
                            <div class="box-border bg-white w-auto p-16 rounded-xl shadow-orange-300 shadow-2xl py-4">
                                <div>
                                    <img src="/shirt.svg" alt="image" class="mx-auto mb-auto w-auto h-auto py-4">
                                    <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">อะไรวะงงวะ555</h1>
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
            title: "จองโต๊ะ - EE XVII HOMECOMING",
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