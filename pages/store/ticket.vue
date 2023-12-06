<template>
    <section>
        <!-- {{ this.$auth.user }} -->
        <div class="flex flex-col items-center mx-auto">
            <div v-show="row" class="flex flex-col items-center bg-white h-auto w-fit p-4 mt-6 rounded-md shadow-3xl">
                <div>
                    <div class="grid grid-cols-4 gap-4 sm:gap-6 w-fit mx-auto">
                        <div v-for="i of this.row?.slice(0, 4)" :key="i.id">
                            <div @mouseover="mouseover" @mouseout="mouseout" @click="event_tk"
                                :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} ${(i.mouse_state==1)? 'ring ring-amber-400': '' } h-10 w-10 sm:h-14 sm:w-14 rounded-full shadow-md hover:ring`">
                                <span :id="i.id"
                                    class="flex flex-col items-center normal-nums justify-center mx-auto h-full text-black font-bold select-none font-silpakorn">
                                    {{ i.ismy ? "❌" : `${i.id + 1}` }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-8 gap-4 sm:gap-6 w-fit mx-auto mt-4">
                        <div v-for="i of this.row?.slice(4, this.row.length + 1)" :key="i.id">
                            <div @mouseover="mouseover" @mouseout="mouseout" @click="event_tk"
                                :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} ${(i.mouse_state==1)? 'ring ring-amber-400': '' } h-10 w-10 sm:h-14 sm:w-14 rounded-full shadow-md hover:ring`">
                                <span :id="i.id"
                                    class="flex flex-col items-center normal-nums justify-center mx-auto h-full text-black font-bold select-none font-silpakorn">
                                    {{ i.ismy ? "❌" : `${i.id + 1}` }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center bg-white h-auto w-fit p-4 mt-3 rounded-full">
                <span
                    class="shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 sm:h-14 sm:w-14 rounded-full hover:ring">
                </span>
                <p class="text-xl px-3 font-bold">ว่าง</p>
                <span
                    class="shadow-md bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed h-10 w-10 sm:h-14 sm:w-14 rounded-full hover:ring">
                </span>
                <p class="text-xl px-3 font-bold">กำลังจอง</p>
                <span
                    class="shadow-md bg-gray-500 hover:bg-gray-600 cursor-not-allowed h-10 w-10 sm:h-14 sm:w-14 rounded-full hover:ring">
                </span>
                <p class="text-xl px-3 font-bold">
                    จองแล้ว
                </p>
            </div>
            <!-- <div v-show="row" class="flex flex-col items-center bg-white h-screen w-screen p-4 mt-6 rounded-md shadow-2xl">
                <div class="rotate-[60deg]">
                    <div class="translate-x-52 translate-y-1 shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 sm:h-14 sm:w-14 rounded-full hover:ring">1</div>
                </div>
                <div class="rotate-[80deg]">
                    <div class="translate-x-48 translate-y-2 shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 sm:h-14 sm:w-14 rounded-full hover:ring">2</div>
                </div>
                <div class="rotate-[100deg]">
                    <div class="translate-x-44 translate-y-3 shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 sm:h-14 sm:w-14 rounded-full hover:ring">3</div>
                </div>
                <div class="rotate-[120deg]">
                    <div class="translate-x-40 translate-y-4 shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 sm:h-14 sm:w-14 rounded-full hover:ring">4</div>
                </div>
           </div> -->
            <!-- <div class="ring rounded-full relative m-80 mt-0">
                    <div class="absolute m-[-15px] top-[50%] left-[50%] block translate-x-[130px] translate-y-[130px] rotate-[60deg] overflow-hidden shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 rounded-full hover:ring">
                    </div>
                    <div class="absolute m-[-15px] top-[50%] left-[50%] block translate-x-[130px] translate-y-[130px] rotate-[80deg] overflow-hidden shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 rounded-full hover:ring">
                    </div>
                    <div class="absolute m-[-15px] top-[50%] left-[50%] block translate-x-[130px] translate-y-[130px] rotate-[100deg] overflow-hidden shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 rounded-full hover:ring">
                    </div>
                    <div class="absolute m-[-15px] top-[50%] left-[50%] block translate-x-[130px] translate-y-[130px] rotate-[120deg] overflow-hidden shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-10 w-10 rounded-full hover:ring">
                    </div>
                </div> -->
            <!-- <div class="grid grid-cols-4 gap-4 sm:gap-6 w-fit mx-auto">
                        <div v-for="i of this.row?.slice(0, 4)" :key="i.id">
                            <div @click="event_tk"
                                :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} h-10 w-10 sm:h-14 sm:w-14 rounded-md shadow-md hover:ring`">
                                <span :id="i.id"
                                    class="flex flex-col items-center normal-nums justify-center mx-auto h-full text-black font-bold select-none font-silpakorn">
                                    {{ i.ismy ? "❌" : `${i.id + 1}` }}
                                </span>
                            </div>
                        </div>
                    </div> -->
            <!-- <div class="grid grid-cols-8 gap-4 sm:gap-6 w-fit mx-auto mt-4">
                        <div v-for="i of this.row?.slice(4, this.row.length + 1)" :key="i.id">
                            <div @click="event_tk"
                                :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} h-10 w-10 sm:h-14 sm:w-14 rounded-md shadow-md hover:ring`">
                                <span :id="i.id"
                                    class="flex flex-col items-center normal-nums justify-center mx-auto h-full text-black font-bold select-none font-silpakorn">
                                    {{ i.ismy ? "❌" : `${i.id + 1}` }}
                                </span>
                            </div>
                        </div>
                    </div> -->

        </div>
        <div class="flex flex-col items-center mx-auto h-20 mt-5">
            <div class="grid grid-cols-2 gap-4">
                <a @click="gotostore"
                    class="drop-shadow-xl select-none bg-gradient-to-r from-neutral-800 to-gray-600 hover:brightness-125 hover:ring rounded-md py-3 px-8 text-white hover:text-white text-center font-bold">ย้อนกลับ</a>
                <a
                    class="drop-shadow-xl select-none hover:ring bg-gradient-to-r from-orange-600 to-orange-400 rounded-md py-3 px-8 text-white hover:text-white text-center font-bold">จอง</a>
            </div>
        </div>




        <!-- <div>
            <div>
                <div class="deg-0">
                    Lor
                </div>
                <div class="deg-45">
                    Lore
                </div>
                <div class="deg-90">
                    Lore
                </div>
                <div class="deg-135">
                    Lorem
                </div>
                <div class="deg-180">
                    Lorem
                </div>
            </div>
        </div> -->

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
                return { ...d, ismy: (d.claim == this.$auth.user), mouse_state: 0 }
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
    },
    methods: {
        gotostore() {
            this.$router.push('/store')
        },
        reconnect() {
            setTimeout(() => {
                this.socket.connect()
            }, 1000);
        },
        mouseover(el){
            let b_data = this.row[el.target.id];
            // console.log("mouseover",b_data.id);
            this.socket.emit("table_mouseover", { id: b_data.id, user: this.$auth.user });
        },
        mouseout(el){
            let b_data = this.row[el.target.id];
            // console.log("mouseout",b_data.id);
            this.socket.emit("table_mouseout", { id: b_data.id , user: this.$auth.user });
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
<!-- <style scoped>
.circle-big {
    position: relative;
    height: 180px;
    width: 180px;
    padding: 21px;
    border-radius: 50% 50%;
    margin: 100px;
}

.circle-big:before {
    position: absolute;
    height: 90px;
    width: 180px;
    border-radius: 90px 90px 0 0;
    content:""; 
}

.circle {
    display: block;
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    margin: -15px;
}

.two { transform: rotate(60deg) translate(130px); }
.three { transform: rotate(80deg) translate(130px); }
.four { transform: rotate(100deg) translate(130px); }
.five { transform: rotate(120deg) translate(130px); }
</style> -->