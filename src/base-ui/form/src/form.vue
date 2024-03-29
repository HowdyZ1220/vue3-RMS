<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <div class="grid-content bg-purple-dark">
              <el-form-item
                v-if="!item.isHidden"
                :label="item.label"
                :rules="item.rules"
                :style="formStyle"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
                <template
                  v-if="item.type === 'input' || item.type === 'password'"
                >
                  <el-input
                    :placeholder="item.placeholder"
                    v-bind="item.otherOptions"
                    :show-password="item.type === 'password'"
                    :model-value="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                  >
                  </el-input>
                </template>

                <template v-if="item.type === 'select'">
                  <el-select
                    :placeholder="item.placeholder"
                    style="width: 100%"
                    v-bind="item.otherOptions"
                    :model-value="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                  >
                    <el-option
                      v-for="option in item.options"
                      :key="option.value"
                      :value="option.value"
                      >{{ option.lable }}
                    </el-option>
                  </el-select>
                </template>

                <template v-if="item.type === 'datepicker'">
                  <el-date-picker
                    style="width: 100%"
                    v-bind="item.otherOptions"
                    :model-value="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                  >
                  </el-date-picker>
                </template>
              </el-form-item>
            </div>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../type'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    formStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        sx: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return { handleValueChange }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
  .form-item {
    padding: 10px 30px;
  }
}
</style>
