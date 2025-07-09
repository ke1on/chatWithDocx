<template>
    <div class=" tooltips" ref="tooltip" @mouseenter="stopHide" @mouseleave="hide" hidden @click="copy">
        <div>
            {{ text }}
        </div>
        <p></p>
    </div>
</template>

<script setup lang='ts'>
const text: Ref<string> = ref('')
const tooltip = ref<HTMLElement>()
const t = ref(50);
const l = ref(50);
const m = ref(20);
const top = computed(() => t.value + "px")
const left = computed(() => l.value + "px")
const margin = computed(() => m.value + "px")
let timer: any;
let localCtx = ''
const stopHide = () => {
    clearTimeout(timer);
}
const hide = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (text.value != "已复制") {
            (tooltip.value as HTMLElement).className = 'tooltips hide';
            setTimeout(() => {
                text.value = '';
                (tooltip.value as HTMLElement).hidden = true;
            }, 150);
        } else {
            (tooltip.value as HTMLElement).className = 'tooltips hide';
            text.value = '';
            (tooltip.value as HTMLElement).hidden = true;
        }

    }, 800);

}
const show = (e: MouseEvent, ctx: string) => {

    let target = e.target as HTMLElement;
    const range = document.createRange();
    range.selectNodeContents(target);
    const textWidth = range.getBoundingClientRect().width;
    const containerWidth = target.clientWidth;
    //检测溢出，+10是为了展示阴影覆盖的部分
    if (textWidth + 10 > containerWidth) {
        text.value = ctx;
        localCtx = ctx;
        //m值等于target的宽度的一半 
        m.value = target.offsetWidth / 2;
        nextTick(() => {
            (tooltip.value as HTMLElement).hidden = false;
            (tooltip.value as HTMLElement).className = "tooltips show";
            t.value = target.getBoundingClientRect().y - (tooltip.value?.clientHeight || 0) + 20;
            l.value = target.getBoundingClientRect().x;
        });


    } else {

    }
}
const copy = () => {
    //复制text到粘贴板
    navigator.clipboard.writeText(text.value);
    Message("已复制");
}
const Message = (ctx: string) => {
    let w: number = (tooltip.value as HTMLElement).offsetWidth;
    (tooltip.value as HTMLElement).style = `width:${w}px; `;
    text.value = ctx;

    setTimeout(() => {
        text.value = localCtx;
        (tooltip.value as HTMLElement).style = '';
    }, 1000);
}

defineExpose({ hide, show, text, })
</script>
<style scoped lang='scss'>
.tooltips {
    position: absolute;
    top: v-bind(top);
    left: v-bind(left);
    z-index: 9999;
    text-align: center;

    div {
        background-color: #333;
        color: white;
        padding: .375rem .5rem;
        border-radius: .375rem;

    }

    p {
        margin-top: -3px;
        margin-left: v-bind(margin);
        width: 1rem;
        -webkit-aspect-ratio: 1/1;
        aspect-ratio: 1/1;
        background-color: #333;
        //裁剪倒三角  
        clip-path: polygon(0 0, 100% 0, 60% 60%, 40% 60%);
        top: 100%;
        left: 50%;

    }
}

.show {
    animation: show 0.3s ease-in-out;
}

.hide {
    animation: hide 0.2s ease-in-out forwards;
}



@keyframes show {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes hide {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>