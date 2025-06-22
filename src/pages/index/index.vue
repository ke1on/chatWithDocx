<template>
    <div class='w-full flex justify-center'>
        <button class="text-[15rem]" @click="start">解析</button>
    </div>
</template>

<script setup>
const start=async ()=>{
    const res=await $fetch("api/start")
    console.log(res)
}
</script>
<style scoped lang='scss'>

</style>