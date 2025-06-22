<template>
    <div class='w-full h-full flex flex-col items-center justify-between relative'>
        <div class="flex justify-center">
            <input type="file" id="selectFile" hidden @change="fileLoad">
            <label for="selectFile" v-if="!fileName" class="flex items-center">
                <span>选择文件</span>
                <Icon name="vscode-icons:default-file"></Icon>
            </label>
            <p v-else class="flex items-center">
                <span>{{ fileName }}</span>
                <Icon name="material-symbols:back-hand" @click.stop="fileClear" style="color: red;"></Icon>
            </p>
        </div>
        <div v-html="responseMessage">
            
        </div>
        <div class="flex justify-center">
            <input type="text" v-model="content" placeholder="输入内容" class="outline-0 border-b">
            <button @click="start">发送</button>
        </div>
        <div class="absolute top-0 right-0 p-4 text-2xl bg-gray-100 rounded-lg">
            <p>{{ messages }}</p>
        </div>
    </div>
</template>

<script setup>
const content = ref('');
const fileName = ref(null);
const messages = ref("等待操作...");
const responseMessage = ref("");    
const formData = new FormData();
const fileLoad = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    fileName.value = file.name;
    formData.append('file', file);
    messages.value = "已选择文件";
}
const start = async () => {
    formData.append('content', content.value); 
    messages.value = "等待回复"
    const ctx = await $fetch("api/start", { method: "POST", body: formData }) 
    const response = await $fetch("api/linkChat", { method: "POST", body: { ctx } })
    messages.value = '已收到！！！'
    responseMessage.value=response
    setTimeout(() => {
        messages.value = "等待操作..."
    }, 2000);
    console.log(response)
}
const fileClear = () => {
    fileName.value = ''
    formData.delete('file')
    messages.value = "已清空文件"
    setTimeout(() => {
        messages.value = '等待操作...'
    }, 3000)

}
</script>
<style scoped lang='scss'></style>