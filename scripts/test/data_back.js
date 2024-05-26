// import {
//   defineComponent as _defineComponent,
//   toDisplayString as _toDisplayString,
//   openBlock as _openBlock,
//   createElementBlock as _createElementBlock,
// } from "vue";

const {
  ref,
  defineComponent: _defineComponent,
  toDisplayString: _toDisplayString,
  openBlock: _openBlock,
  createElementBlock: _createElementBlock,
} = Vue;

export default /*#__PURE__*/ _defineComponent({
  setup(__props, { expose }) {
    expose();

    const msg = ref("Hello World!");

    const __returned__ = { msg };
    Object.defineProperty(__returned__, "__isScriptSetup", {
      enumerable: false,
      value: true,
    });
    return __returned__;
  },
});

const _hoisted_1 = { class: "message" };

export function render(_ctx, _cache) {
  return (
    _openBlock(),
    _createElementBlock(
      "div",
      _hoisted_1,
      _toDisplayString(_ctx.msg),
      1 /* TEXT */
    )
  );
}
