// export const isProd = import.meta.env.PROD; //是否是生产环境，此方式会有问题，故弃用
export const isProd = import.meta.env.MODE === "prod"; //是否是生产环境，因为import.meta.env.PROD在生产环境中不为true，所以暂时这样处理。本来应该是'production'，但是package.json中指定了 --mode prod
export const isDev = import.meta.env.MODE === "dev"; //是否是开发环境，本来应该是'development'，但是package.json中指定了 --mode dev

export const popupCloseAnimationDuration = 300; // 弹出层dialog、drawer关闭时的动画持续时间，单位：毫秒
export const propsJoinChar = ","; //双props的连接符号
export const emptyVals: ["", null, undefined] = ["", null, undefined]; //空值，凡遇此空值，则用“-”进行占位填充。看后期是否要考虑将 "undefined", "null" 这两个加入其中
