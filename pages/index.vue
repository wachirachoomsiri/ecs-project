<template>
  <section>
    <br>
    <div>
      <h1 class="text-5xl text-gray-500" style="font-family: Silpakorn;">ทดสอบ นายไม่อ่านหนังสือ นายจะรู้อะไร</h1>
      <br>
      <h1 class="text-5xl text-gray-500" style="font-family: Silpakorn70yr;">ทดสอบ นายไม่อ่านหนังสือ นายจะรู้อะไร</h1>
    </div>
    <br>
    <br>
    <NuxtLink class="text-5xl" to="/auth/login" style="font-family: Silpakorn;">เข้าสู่ระบบ</NuxtLink> <font class="text-5xl">|</font> <NuxtLink class="text-5xl" to="/auth/register" style="font-family: Silpakorn;">ลงทะเบียน</NuxtLink>
  </section>
</template>

<script>
// import Card from '~/components/Card'

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
