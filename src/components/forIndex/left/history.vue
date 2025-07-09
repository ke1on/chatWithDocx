<template>
    <div class='history flex gap-2 flex-col flex-grow overflow-y-auto'>
        <template v-for="item in labeledChatInfo">
            <div class="flex   flex-col relative" v-if="item.list.length">
                <div class="dateTitle py-1.5 px-2 font-[600] text-[13px] sticky top-0 bg-[var(--bgColorDeeper)] z-5">
                    {{ item.dateName }}</div>
                <div class="container flex  flex-col">
                    <div :class="!i.isSelected ? 'items' : 'items itemSeleced'" v-for="i in item.list"
                        @click="selectChat(i)" @mouseenter="mousemove($event, i.title)"
                        @mouseleave.st@mousemove="mouseleave($event, i.title)">
                        <div class="itemContent flex relative  ">
                            <p class="overflow-hidden   whitespace-nowrap   ">{{ i.title }}</p>
                            <div class="musk absolute  h-full right-0 top-0 w-fit flex items-center">
                                <div class=" h-full w-12"></div>
                                <p
                                    class=" bg-[var(--bgColorDeeper)] leading-none hidden hover:bg-white p-1.5 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="14" width="14"
                                        viewBox="0 0 24 24">
                                        <path fill="currentColor" fill-rule="evenodd"
                                            d="M3 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

    </div>
</template>

<script setup lang="ts">

interface chatInfo {
    date: string;
    title: string;
}
interface localChatInfo extends chatInfo {
    isSelected: boolean;
}
interface chatInfoList {
    dateName: string;
    list: localChatInfo[];
}
const chatInfo = [
    { date: '2025-07-01', title: '此时候孤王才把这宽心放，' },
    { date: '2025-07-02', title: '问贤弟你为何面带惆怅？' },
    { date: '2025-07-03', title: '你杀那公主是为何故，忘恩负义是为哪桩？' },
    { date: '2025-07-01', title: '大丈夫岂容那妇人犟，于是我拔剑斩河阳。' },
    { date: '2025-06-01', title: '文言怒发三千丈，太阳头上冒火光' },
    { date: '2025-04-01', title: ' 可惜三十六员将，东逃西奔各一方。' },
    { date: '2025-02-01', title: '单单剩下王伯当，大胆保你来降唐。' },
    { date: '2025-01-01', title: '此去借来兵与将，封你个一字并肩王。' },
]
function filterDate() {
    //分类
    let today = new Date();
    let todayList: localChatInfo[] = [];
    let yesterdayList: localChatInfo[] = [];
    let bf7dayList: localChatInfo[] = [];
    let bf30dayList: localChatInfo[] = [];
    let beforeList: localChatInfo[] = [];
    let localChatInfo: localChatInfo[] = chatInfo.map(i => Object.assign(i, { "isSelected": false }));
    localChatInfo.forEach((item, index) => {
        let diffTime = Math.abs(Number(today) - Number(new Date(item.date)));
        let diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)); //相差天数
        if (diffDay === 0) {
            todayList.push(item);
        } else if (diffDay === 1) {
            yesterdayList.push(item);
        } else if (diffDay < 7) {
            bf7dayList.push(item);
        } else if (diffDay < 30) {
            bf30dayList.push(item);
        } else {
            beforeList.push(item);
        }
    })

    let filterDate: chatInfoList[] = [
        { dateName: '今天', list: todayList },
        { dateName: '昨天', list: yesterdayList },
        { dateName: '近7天', list: bf7dayList },
        { dateName: '近30天', list: bf30dayList },
        { dateName: '更早', list: beforeList }
    ]
    return filterDate;
}
let labeledChatInfo: Ref<chatInfoList[]> = ref([]);
onMounted(() => {
    labeledChatInfo.value = filterDate()
})

const selectChat = (chatInfo: localChatInfo) => {
    labeledChatInfo.value.forEach(item => {
        item.list.forEach(e => {
            e.isSelected = false;
        })
    })
    chatInfo.isSelected = !chatInfo.isSelected

}
const tooltip: Ref<any> | null | undefined = inject("tooltip");
let timer: any = null;
const mousemove = (e: MouseEvent, ctx: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        console.log(1)
        tooltip?.value.show(e, ctx)
    }, 200);


}

const mouseleave = (e: MouseEvent, ctx: string) => {
    const element = e.currentTarget as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement | null;

    // 如果鼠标移入子元素，则不触发
    if (relatedTarget && element.contains(relatedTarget)) {
        return;
    }
    tooltip?.value.hide(e, ctx)

}
</script>
<style scoped lang='scss'>
.musk>div {
    background: linear-gradient(-90deg, var(--bgColorDeeper) 0%, var(--bgColorDeeperT) 100%);
}

.items {
    position: relative;
    user-select: none;
    cursor: pointer;
    padding: .375rem .5rem;
    border-radius: 0.75rem;

    &:hover {
        background: var(--bule2);
        --bgColorDeeper: var(--bule2);
        --bgColorDeeperT: var(--bule2T);

    }

}

.itemSeleced {
    background: var(--bule3);
    --bgColorDeeper: var(--bule3);
    --bgColorDeeperT: var(--bule3T);

    &:hover {
        background: var(--bule3);
        --bgColorDeeper: var(--bule3);
        --bgColorDeeperT: var(--bule3T);
    }

}
</style>