<template>
    <div>
        <forIndex></forIndex>
        <Tooltip ref="tooltip"></Tooltip>
    </div>
</template>

<script setup lang="ts">
import Tooltip from '~/components/tooltip.vue';

const tooltip = ref(null);
provide('tooltip', tooltip);
</script>
<style scoped lang='scss'>

</style>