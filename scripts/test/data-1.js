import { defineComponent as _defineComponent } from 'vue'
import { ref, reactive, watch, computed } from "vue";

const __sfc_main__ = /*#__PURE__*/_defineComponent({
  setup(__props, { expose }) {
  expose();

const msg = ref("Hello World!");

const __returned__ = { msg }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

})
__sfc_main__.__scopeId='data-v-1680764065103'
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = { class: "message" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, _toDisplayString(_ctx.msg), 1 /* TEXT */))
}
__sfc_main__.render=render
export default __sfc_main__