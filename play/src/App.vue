<script setup lang="ts">
import { LIcon } from '@liquor-ui/components'
import { LButton } from '@liquor-ui/components'
</script>

<template>
  <div>
    <l-icon name="icon-home" />
  </div>
  <br />
  <l-button round>
    <template #prepend="scoped">{{ scoped }}前端</template> 按钮 <template #append>后端</template>
  </l-button>
</template>

<style scoped lang="scss"></style>
