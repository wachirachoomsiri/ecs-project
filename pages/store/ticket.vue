<template>
    <section>
        <!-- {{ this.$auth.user }} -->
        <div class="flex flex-col items-center mx-auto h-screen">
            <div v-show="row" class="flex flex-col items-center bg-white h-auto w-fit p-4 mt-6 rounded-md shadow-2xl">
                <div class="grid grid-cols-4 auto-cols-max gap-4 sm:gap-6">
                    <a v-for="i of row?.slice(0, 4)" @click="event_tk" :ref="`b_${i.id}`"
                        :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} h-10 w-10 sm:h-14 sm:w-14 rounded-md shadow hover:ring`">
                        <span :id="i.id"
                            class="flex flex-col items-center justify-center mx-auto h-full text-black font-bold">
                            {{ i.id + 1 }}
                        </span>
                    </a>
                </div>
                <div class="grid grid-cols-8 gap-4 sm:gap-6 pt-4">
                    <a v-for="i of row?.slice(4, row.length + 1)" @click="event_tk" :ref="`b_${i.id}`"
                        :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} h-10 w-10 sm:h-14 sm:w-14 rounded-md shadow hover:ring`">
                        <span :id="i.id"
                            class="flex flex-col items-center justify-center mx-auto h-full text-black font-bold">
                            {{ i.id + 1 }}
                        </span>
                    </a>
                </div>
            </div>
            <div class="flex items-center bg-white h-auto w-fit p-4 mt-3 rounded-md shadow-2xl">
                <!-- <div class="grid grid-cols-2 gap-4 sm:gap-6"> -->
                <span
                    class="bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 sm:h-14 sm:w-14 rounded-md shadow hover:ring">
                </span>
                <p class="text-xl px-3">ว่าง</p>
                <span
                    class="bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed h-10 w-10 sm:h-14 sm:w-14 rounded-md shadow hover:ring">
                </span>
                <p class="text-xl px-3">กำลังจอง</p>
                <span
                    class="bg-gray-500 hover:bg-gray-600 cursor-not-allowed h-10 w-10 sm:h-14 sm:w-14 rounded-md shadow hover:ring">
                </span>
                <p class="text-xl px-3">
                    จองแล้ว
                </p>
                <!-- </div> -->
            </div>
            <!-- {{ this.row }} -->
            <!-- <b-button @click="get_table_list" type="is-primary">ลงทะเบียน</b-button>
             -->
        </div>
    </section>
</template>
<script>
export default {
    auth: true,
    name: 'IndexPage',
    data() {
        return {
            loading_screen: null,
            row: null
            // row: [
            //     { id: 0, status: 0 }, { id: 1, status: 0 }, { id: 2, status: 0 },
            //     { id: 3, status: 0 }, { id: 4, status: 0 }, { id: 5, status: 0 },
            //     { id: 6, status: 0 }, { id: 7, status: 0 }, { id: 8, status: 0 },
            //     { id: 9, status: 0 }, { id: 10, status: 0 }, { id: 11, status: 0 },
            //     { id: 12, status: 0 }, { id: 13, status: 0 }, { id: 14, status: 0 },
            //     { id: 15, status: 0 }, { id: 16, status: 0 }, { id: 17, status: 0 },
            //     { id: 18, status: 0 }, { id: 19, status: 0 }, { id: 20, status: 0 },
            //     { id: 21, status: 0 }, { id: 22, status: 0 }, { id: 23, status: 0 },
            //     { id: 24, status: 0 }, { id: 25, status: 0 }, { id: 26, status: 0 },
            //     { id: 27, status: 0 }, { id: 28, status: 0 }, { id: 29, status: 0 },
            //     { id: 30, status: 0 }, { id: 31, status: 0 }, { id: 32, status: 0 },
            //     { id: 33, status: 0 }, { id: 34, status: 0 }, { id: 35, status: 0 },
            //     { id: 36, status: 0 }, { id: 37, status: 0 }, { id: 38, status: 0 },
            //     { id: 39, status: 0 }, { id: 40, status: 0 }, { id: 41, status: 0 },
            //     { id: 42, status: 0 }, { id: 43, status: 0 }, { id: 44, status: 0 },
            //     { id: 45, status: 0 }, { id: 46, status: 0 }, { id: 47, status: 0 },
            //     { id: 48, status: 0 }, { id: 49, status: 0 }, { id: 50, status: 0 },
            //     { id: 51, status: 0 }, { id: 52, status: 0 }, { id: 53, status: 0 },
            //     { id: 54, status: 0 }, { id: 55, status: 0 }, { id: 56, status: 0 },
            //     { id: 57, status: 0 }, { id: 58, status: 0 }, { id: 59, status: 0 }
            // ],
        }
    },
    mounted() {
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
        })

        this.socket.on('table_list', (msg) => {
            this.row = msg.data;
        });

        this.socket.on('table_update', (msg) => {
            this.row[msg.id].status = msg.status;
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
                    closable: false,
                    queue: false,
                })
            } else if (data.status == "fail") {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${data?.message}`,
                    type: 'is-danger',
                    hasIcon: true,
                    closable: false,
                    queue: false,
                })
            }
        });

        this.socket.on('connect_error', (error) => {
            this.row = null;
            setTimeout(() => {
                this.socket.connect()
            }, 1000);
        });

        this.socket.on('disconnect', (reason) => {
            this.row = null;
            setTimeout(() => {
                this.socket.connect()
            }, 1000);
        });

    },
    methods: {
        remove_list_class(classList, list) {
            list.forEach(element => {
                classList.remove(element)
            });
        },
        add_list_class(classList, list) {
            list.forEach(element => {
                classList.add(element)
            });
        },
        event_tk(el) {
            let b_data = this.row[el.target.id];
            if (b_data.status == 0) {
                this.loading_screen = this.$buefy.loading.open({ container: null });
                this.socket.emit("table_click", { id: b_data._id })
                setTimeout(() => {
                    try {
                        this.loading_screen.close();
                    } catch (error) { }
                }, 10000);
            }
        },
        // set_by_id() {
        //     // let id = 0;
        //     // let classList = this.$refs[`b_${id}`][0].classList;
        //     // this.remove_list_class(classList, ['bg-orange-500', 'hover:bg-orange-600', 'cursor-pointer']);
        //     // this.add_list_class(classList, ['bg-gray-500', 'hover:bg-gray-600', 'cursor-not-allowed']);
        // },
        get_table_list() {
            // this.socket.emit("table_list")
            console.log()
        }
    }
}
</script>