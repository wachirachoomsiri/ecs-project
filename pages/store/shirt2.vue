<template>
    <div>
        <img src="/shirt.svg" alt="image" class="w-full h-auto">
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            selectedSize: 'S',
            quantity: 1,
            shippingAddress: ''
        };
    },
    methods: {
        submitOrder() {
            // ทำอย่างไรก็ตามที่คุณต้องการเมื่อฟอร์มถูกส่ง
            console.log('Order submitted:', {
                size: this.selectedSize,
                quantity: this.quantity,
                shippingAddress: this.shippingAddress
            });
        }
    }
};
</script>
  
<style scoped>
/* สไตล์ CSS ที่เฉพาะกับ component นี้ */
</style>
  