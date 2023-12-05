<template>
    <section>
        <!-- {{ this.$auth.user }} -->
        <div class="flex flex-col items-center mx-auto h-fit">
            <div v-show="row" class="flex flex-col items-center bg-white h-auto w-fit p-4 mt-6 rounded-md shadow-2xl">
                <div class="grid grid-cols-4 auto-cols-max gap-4 sm:gap-6">
                    <a v-for="i of this.row?.slice(0, 4)" @click="event_tk" :ref="`b_${i.id}`"
                        :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} h-10 w-10 sm:h-14 sm:w-14 rounded-md shadow-md hover:ring`">
                        <span :id="i.id"
                            class="flex flex-col items-center justify-center mx-auto h-full text-black font-bold select-none font-silpakorn">
                            {{ i.ismy ? "❌" : `${i.id + 1}` }}
                        </span>
                    </a>
                </div>
                <div class="grid grid-cols-8 gap-4 sm:gap-6 pt-4">
                    <a v-for="i of this.row?.slice(4, this.row.length + 1)" @click="event_tk" :ref="`b_${i.id}`"
                        :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} h-10 w-10 sm:h-14 sm:w-14 rounded-md shadow-md hover:ring`">
                        <span :id="i.id"
                            class="flex flex-col items-center justify-center mx-auto h-full text-black font-bold select-none font-silpakorn">
                            {{ i.ismy ? "❌" : `${i.id + 1}` }}
                        </span>
                    </a>
                </div>
            </div>
            <div class="flex items-center bg-white h-auto w-fit p-4 mt-3 rounded-md">
                <!-- <div class="grid grid-cols-2 gap-4 sm:gap-6"> -->
                <span
                    class="shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 sm:h-14 sm:w-14 rounded-md hover:ring">
                </span>
                <p class="text-xl px-3 font-bold">ว่าง</p>
                <span
                    class="shadow-md bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed h-10 w-10 sm:h-14 sm:w-14 rounded-md hover:ring">
                </span>
                <p class="text-xl px-3 font-bold">กำลังจอง</p>
                <span
                    class="shadow-md bg-gray-500 hover:bg-gray-600 cursor-not-allowed h-10 w-10 sm:h-14 sm:w-14 rounded-md hover:ring">
                </span>
                <p class="text-xl px-3 font-bold">
                    จองแล้ว
                </p>
            </div>
            <!-- {{ this.row }} -->
            <!-- 
             -->
            <!-- <div class="flex flex-col items-center bg-white h-auto w-fit p-4 mt-3 rounded-md shadow-2xl">
                
            </div> -->
        </div>
        <div class="flex flex-col items-center mx-auto h-20 mt-5">
            <div class="grid grid-cols-2 gap-4">
                <a @click="$router.push('/store')" class="drop-shadow-xl select-none bg-gradient-to-r from-neutral-800 to-gray-600 hover:brightness-125 hover:ring rounded-md py-3 px-8 text-white hover:text-white text-center font-bold">ย้อนกลับ</a>
                <a class="drop-shadow-xl select-none hover:ring bg-gradient-to-r from-orange-600 to-orange-400 rounded-md py-3 px-8 text-white hover:text-white text-center font-bold">จอง</a>
            </div>
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
        });

        this.socket.on('table_list', (msg) => {
            let maped = msg.data.map((d) => {
                return { ...d, ismy: (d.claim == this.$auth.user) }
            })
            this.row = maped;
        });

        this.socket.on('table_update', (msg) => {
            this.row[msg.id]['status'] = msg.status;
            if (msg.claim == this.$auth.user) {
                this.row[msg.id]['ismy'] = true;
            } else {
                this.row[msg.id]['ismy'] = false;
            }
            // console.log(this.row[msg.id]['ismy'])
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
                    queue: false,
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

    },
    methods: {
        reconnect(){
            setTimeout(() => {
                this.socket.connect()
            }, 1000);
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
            } else if (b_data.status == 1) {
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
    }
}
</script>
