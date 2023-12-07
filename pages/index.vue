<template>
  <section class="flex items-center justify-center h-screen">
    <div class="text-center">
      <img src="/gear.gif" alt="image" class="mx-auto mb-4 w-64 h-64">
      <h1 class="text-5xl text-gray-500 font-silpakorn mb-8 shadow-orange-300 [text-shadow:_0_0_22px_var(--tw-shadow-color)]">EE XVII HOMECOMING</h1>
      <!-- <h1 class="">Hello</h1> -->
      <div>
        <NuxtLink to="/auth/login" class="text-5xl font-silpakorn mb-4">เข้าสู่ระบบ</NuxtLink>
        <span class="text-5xl text-gray-500">|</span>
        <NuxtLink to="/auth/register" class="text-5xl font-silpakorn mb-4">ลงทะเบียน</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  name: 'IndexPage',
  data() {
    return {
      data: null
    }
  },
  mounted() {
    // this.socket = this.$nuxtSocket({
    //   channel: '/',
    //   reconnection: true,
    //   autoConnect: true,
    //   reconnectionDelay: 1000,
    //   reconnectionDelayMax: 1000,
    //   timeout: 10000
    // })


    // this.socket.on('connect_error', (error) => {
    //   this.data = error;
    //   // setTimeout(() => {
    //   //   this.socket.connect()
    //   // }, 1000);
    // });

    // this.socket.on('disconnect', (reason) => {
    //   this.data = reason;
    //   // setTimeout(() => {
    //   //   this.socket.connect()
    //   // }, 1000);
    // });

    // this.socket.on('data', (msg, cb) => {
    //   this.data = msg;
    // });
    // this.socket.disconnect((error) => {
    //   // this.data = msg;
    //   console.log("DISCONNECT",error)
    // })
  },
}
</script>
