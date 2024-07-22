/**
 * directiveName: {
 *   created(el, binding, vnode, prevVnode) {}, // 新增 在元素的 attribute 或事件监听器被应用之前调用。
 *   beforeMount() {},  //原vue2 中的 bind
 *   mounted() {},   //原vue2 中的  inserted
 *   beforeUpdate() {}, // 新增  在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
 *   updated() {},  //原vue2 中的 componentUpdated
 *   beforeUnmount() {}, // 新增  与组件的生命周期钩子类似，它将在元素被卸载之前调用。
 *   unmounted() {}   //原vue2 中的 unbind
 * }
 */

/**
 * 指令钩子函数会被传入以下参数：
 * el：指令所绑定的元素，可以用来直接操作 DOM。
 * 一个对象，包含以下 property：
 * binding：{
 *    name：指令名，不包括 v- 前缀。
 *    value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
 *    oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
 *    expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
 *    arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
 *    modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
 * }
 * vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
 * oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
 * 注意：除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
 */

/**
 * 自定义指令（v-copy、v-longpress、v-debounce、v-emoji、v-Lazy、v-permission、vue-waterMarker、v-draggable）
 * 8个常用自定义指令参考博客：https://segmentfault.com/a/1190000038475001
 */

import { debounce, throttle, copyText, typeOf } from "@/utils";
interface EleType extends HTMLElement {
  parentNode: any;
}
export default {
  //created() {},
  methods: {},
  directives: {
    /**
     * 获取焦点
     * @example v-focus
     */
    focus: {
      mounted(el: HTMLElement, binding: any, vnode: any, oldVnode: any) {
        const name = el.localName;
        if (["input", "textarea"].includes(name)) {
          el.focus();
        } else {
          const inpDom = el.querySelector("input") || el.querySelector("textarea");
          setTimeout(() => {
            inpDom?.focus();
          }, 0);
        }
      },
    },
    /**
     * 一键复制文本
     * @example v-copy="text"
     */
    copy: {
      mounted(el: HTMLElement, binding: any) {
        el.addEventListener("click", () => {
          copyText(binding.value);
        });
      },
    },
    /**
     * 拖拽
     * @example v-drag
     */
    drag: {
      mounted(ele: HTMLElement) {
        ele.style.cursor = "move";
        ele.style.position = "fixed";
        document.onmousedown = e => {
          let downX = e.x;
          let downY = e.y;
          // let wH = window.innerHeight;
          // let wW = window.innerWidth;
          document.onmousemove = eve => {
            const top = ele.offsetTop + (eve.y - downY);
            // top >= wH - 40 && (top = wH - 40);
            // top <= -20 && (top = -20);
            const left = ele.offsetLeft + (eve.x - downX);
            // left <= -40 && (left = -40);
            // left >= wW - 60 && (left = wW - 60);
            ele.style.left = left + "px";
            ele.style.top = top + "px";
            downX = eve.x;
            downY = eve.y;
          };
          document.onmouseup = () => {
            document.onmouseup = document.onmousemove = null;
          };
        };
      },
    },
    // drag: {
    //   mounted: function (el: EleType) {
    //     el.style.cursor = "move";
    //     el.style.position = "absolute";
    //     el.onmousedown = function (e) {
    //       const disX = e.pageX - el.offsetLeft;
    //       const disY = e.pageY - el.offsetTop;
    //       document.onmousemove = function (e) {
    //         let x = e.pageX - disX;
    //         let y = e.pageY - disY;
    //         let maxX = el.parentNode.offsetWidth - el.offsetWidth;
    //         let maxY = el.parentNode.offsetHeight - el.offsetHeight;
    //         if (x < 0) {
    //           x = 0;
    //         } else if (x > maxX) {
    //           x = maxX;
    //         }

    //         if (y < 0) {
    //           y = 0;
    //         } else if (y > maxY) {
    //           y = maxY;
    //         }
    //         el.style.left = x + "px";
    //         el.style.top = y + "px";
    //       };
    //       document.onmouseup = function () {
    //         document.onmousemove = document.onmouseup = null;
    //       };
    //     };
    //   },
    // },
    /**
     * 防抖
     * @link 参考博客：https://www.cnblogs.com/coder--wang/p/15505323.html
     * @example v-debounce:click.immediate="onSubmit", 默认click，可省略不写 v-debounce="onSubmit"；v-debounce:scroll.immediate="[handleScroll, 500]"
     */
    debounce: {
      mounted(el: HTMLElement, binding: any) {
        let fn: any;
        let delay = 1000;
        const { value, arg: eventName = "click", modifiers = {} } = binding;
        const { immediate = false } = modifiers;
        const type = typeOf(value);
        if (type === "Function") {
          fn = value;
        } else if (type === "Array") {
          [fn, delay] = value;
        } else {
          throw new Error("value必须是Array或Function类型");
        }
        el.addEventListener(eventName, debounce(fn, immediate, delay as number));
      },
      beforeUnmount(el: HTMLElement, binding: any) {
        const { value: fn, arg: eventName } = binding;
        el.removeEventListener(eventName, fn);
      },
    },
    /**
     * 节流
     * @example v-throttle:click.immediate="onSubmit", 默认click，可省略不写 v-debounce="onSubmit"；v-throttle:scroll.immediate="[handleScroll, 500]"
     */
    throttle: {
      mounted(el: HTMLElement, binding: any) {
        let fn: any;
        let delay = 1000;
        const { value, arg: eventName = "click", modifiers = {} } = binding;
        const { immediate = true } = modifiers;
        const type = typeOf(value);
        if (type === "Function") {
          fn = value;
        } else if (type === "Array") {
          [fn, delay] = value;
        } else {
          throw new Error("value必须是Array或Function类型");
        }
        // const delay = 1000;
        // if (typeof fn !== "function") {
        //   throw new Error("v-throttle expects a function as its value");
        // }
        el.addEventListener(eventName, throttle(fn, immediate, delay as number));
      },
      beforeUnmount(el: HTMLElement, binding: any) {
        const { value: fn, arg: eventName } = binding;
        el.removeEventListener(eventName, fn);
      },
    },
    /**
     * 懒加载
     * @link 参考地址：https://segmentfault.com/a/1190000038475001
     * @example v-lazy
     */
    lazy: {
      // beforeMount(el, binding) {
      //   const { value } = binding;
      //   const isInVisiableArea = ele.getBoundingClientRect().top <= window.innerHeight;  //是否在可视区域内
      // },
      beforeMount(el: HTMLElement, binding: any) {
        const { value } = binding;
        el.setAttribute("data-src", el.src);
        el.setAttribute("src", "");
        // el.setAttribute('src', require(`@/mock/img/avatar/${item}.jpg`))
      },
      mounted(el: HTMLElement) {
        function load() {
          const windowHeight = document.documentElement.clientHeight;
          const elTop = el.getBoundingClientRect().top;
          const elBtm = el.getBoundingClientRect().bottom;
          const realSrc = el.dataset.src;
          if (elTop - windowHeight < 0 && elBtm > 0) {
            if (realSrc) {
              el.src = realSrc;
              el.removeAttribute("data-src");
            }
          }
        }
        if (IntersectionObserver) {
          const io = new IntersectionObserver(entries => {
            const realSrc = el.dataset.src;
            if (entries[0].isIntersecting) {
              if (realSrc) {
                el.src = realSrc;
                el.removeAttribute("data-src");
              }
            }
          });
          io.observe(el);
        } else {
          load();
          window.addEventListener("scroll", () => {
            throttle(load);
          });
        }
      },

      // install方法
      // install(Vue, options) {
      //   const defaultSrc = options.default
      //   Vue.directive('lazy', {
      //     beforeMount(el, binding) {
      //       LazyLoad.init(el, binding.value, defaultSrc)
      //     },
      //     mounted(el) {
      //       if (IntersectionObserver) {
      //         LazyLoad.observe(el)
      //       } else {
      //         LazyLoad.listenerScroll(el)
      //       }
      //     },
      //   })
      // },
      // // 初始化
      // init(el, val, def) {
      //   el.setAttribute('data-src', val)
      //   el.setAttribute('src', def)
      // },
      // // 利用IntersectionObserver监听el
      // observe(el) {
      //   var io = new IntersectionObserver((entries) => {
      //     const realSrc = el.dataset.src
      //     if (entries[0].isIntersecting) {
      //       if (realSrc) {
      //         el.src = realSrc
      //         el.removeAttribute('data-src')
      //       }
      //     }
      //   })
      //   io.observe(el)
      // },
      // // 监听scroll事件
      // listenerScroll(el) {
      //   const handler = LazyLoad.throttle(LazyLoad.load, 300)
      //   LazyLoad.load(el)
      //   window.addEventListener('scroll', () => {
      //     handler(el)
      //   })
      // },
      // // 加载真实图片
      // load(el) {
      //   const windowHeight = document.documentElement.clientHeight
      //   const elTop = el.getBoundingClientRect().top
      //   const elBtm = el.getBoundingClientRect().bottom
      //   const realSrc = el.dataset.src
      //   if (elTop - windowHeight < 0 && elBtm > 0) {
      //     if (realSrc) {
      //       el.src = realSrc
      //       el.removeAttribute('data-src')
      //     }
      //   }
      // },
      // // 节流
    },
    /**
     * 权限控制（是否显示该dom节点）
     * @example v-auth="[0,1,2]" 或 v-auth="0"
     * 所有权限类型：数字类型：0, 1, 2, 3 （以后可能用到：字符串类型："superAdmin", "commonAdmin", "editor"）
     */
    auth: {
      mounted(el: HTMLElement, binding: any) {
        const { value, modifiers } = binding;
        // const { every = false, some = false } = modifiers;
        if (!value) return;
        const valType = typeOf(value);
        const vals = ["Number"].includes(valType) ? [value] : value;
        const hasAuth = true;
        // const hasAuth = vals.includes(user.type);
        if (!hasAuth) {
          el.parentNode?.removeChild(el);
        }
      },
    },
    /**
     * 水印
     * @example v-watermark="{text:'水印文字',font: '', textColor: '#ccc',width: 200, height: 150}"
     * @link 如果需要防伪功能（不允许用户在控制台删除元素或更改样式），则需要用到MutationObserver。参考地址：https://segmentfault.com/a/1190000041408450
     */
    watermark: {
      beforeMount(el: HTMLElement, binding: any) {
        const { value = {} } = binding;
        const degree = Math.PI / 180;
        const set: any = {
          text: "水印文字",
          font: "16px Microsoft JhengHei",
          textColor: "#ddd",
          width: 200,
          height: 150,
        };
        for (const key in value) {
          set[key] = value[key];
        }
        const { text, font, textColor } = set;
        const canvas = document.createElement("canvas");
        canvas.width = set.width;
        canvas.height = set.height;
        canvas.style.display = "none";
        el.appendChild(canvas);
        const pen: any = canvas.getContext("2d");
        pen.rotate(-30 * degree);
        pen.font = font;
        pen.fillStyle = textColor;
        pen.textAlign = "left";
        pen.textBaseline = "Middle";
        pen.fillText(text, set.width / 10, set.height / 2);
        el.style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
      },
    },
    /**
     * 加载动效遮罩（element-ui自带）
     * @example v-loading="true"
     */
    // loading: {
    //   beforeMount(el, binding) {
    //     const { value: show } = binding;
    //     const mask = document.createElement('div');
    //     const load = document.createElement("div");
    //     el.style.position = 'relative';
    //     mask.style.cssText = `
    //       display: ${show ? 'flex' : 'none'};
    //       justify-content: center;
    //       align-items: center;
    //       position: absolute;
    //       left:0;
    //       top:0;
    //       height: 100%;
    //       width: 100%;
    //       background: rgba(0,0,0,.5);
    //     `
    //     load.classList = "f-c-c-c color-theme";
    //     load.innerHTML = `
    //       <i class="el-icon-loading" style="font-size: 30px;margin-bottom: 8px;"></i>
    //       <span>玩命加载中……</span>
    //     `
    //     mask.appendChild(load);
    //     el.appendChild(mask);
    //   },
    //   componentUpdated(el, { value: show }) {
    //     el.lastChild.style.display = show ? 'flex' : "none";
    //   },
    // },
    // 限制 input 只能输入数字或小数
    number: {
      mounted(el: HTMLElement) {
        el.oninput = (event: any) => {
          event.target.value = event.target.value.replace(/[^\d.]/g, "");
        };
      },
    },
    // //只允许输入数字
    // number: {
    //   mounted(el: HTMLElement) {
    //     el.addEventListener("keydown", (event) => {
    //       if (
    //         ![8, 9, 37, 39, 46].includes(event.keyCode) &&
    //         !/[0-9]/.test(event.key)
    //       ) {
    //         event.preventDefault();
    //       }
    //     });
    //   },
    // },
  },
};
