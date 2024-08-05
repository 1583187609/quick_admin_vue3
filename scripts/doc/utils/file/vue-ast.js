import fs from "fs";
import path from "path";
import compiler from "@vue/compiler-sfc";
import parser from "@typescript-eslint/parser";
import tsCompiler from "typescript";
// import parser from "@typescript-eslint/typescript-estree";
const { parseForESLint } = parser;

/**
 * 获取Vue的Ts类型的Ast语法树
 * @param {*} readPath
 * @returns
 */
export function getVueTsAst(readPath = "/src/components/form/BaseForm.vue") {
  readPath = path.join(process.cwd(), readPath);
  const vueContent = fs.readFileSync(readPath, "utf-8");

  const sfc = compiler.parse(vueContent, {
    filename: "example.vue", // 用于错误报告
    sourceMap: false, // 是否生成source map
  });
  const { filename, source, template, script, scriptSetup, styles, customBlocks, cssVars, slotted, shouldForceReload } =
    sfc.descriptor;

  // 假设我们关注的是<script>标签中的TypeScript代码
  const scriptContent = scriptSetup.content;
  // console.log(scriptContent, "sc------------");
  // console.log(tsCompiler);

  // 从Vue文件中提取TypeScript代码
  // const tsContent = vueContent.match(/<script[^>]*>([\s\S]*?)<\/script>/i)?.[1];
  // const tsContent = scriptContent;

  // // 创建一个TS编译器宿主
  // const host = createLanguageServiceHost({ fileNames: ["./temp.ts"] }, tsContent);

  // // 创建编译器实例
  // const system = createSystem(host);
  // const service = ts.createLanguageService(host);

  // // 获取AST
  // const ast = service.getEmitOutput("./temp.ts").outputFiles[0];

  // // 打印AST
  // console.log(ast);
  // return ast;
  // return tsCompiler;

  // 使用@typescript-eslint/parser解析TypeScript AST
  // const tsAst = parseForESLint(scriptContent, {
  //   // parserOptions可以根据需要进行配置
  //   parserOptions: {
  //     sourceType: "module",
  //     ecmaVersion: 2018,
  //   },
  // });

  // // 打印解析后的AST
  // console.log(JSON.stringify(tsAst), "ddddddd----------");
  // console.log(tsAst, "tsAst----------");
  // console.log(tsAst.ast.body[10].declarations[0], "tsAst.ast----------");
  // const item = tsAst.ast.body[10].declarations[0].init.arguments[0].typeArguments.params[0].members;
  // const itemType = item[0].typeAnnotation.typeAnnotation;
  // console.log(item, "params----------");
  // return tsAst;
}

// function tsCompiler() {}

function compileAst(vueContent = "") {
  const result = compiler.compile(
    vueContent
    //   {
    //   filename: vueFilePath,
    // }
  );

  // 提取script部分
  const scriptAst = result.descriptor.script;

  // 检查scriptAst是否存在setup返回的props对象
  if (scriptAst && scriptAst.content) {
    const definePropsNode = scriptAst.content.find(node => {
      return (
        node.type === 1 && // 1 代表元素节点
        node.children &&
        node.children.length > 0 &&
        node.children[0].type === 3 && // 3 代表文本节点
        node.children[0].text.trim() === "defineProps"
      );
    });

    if (definePropsNode) {
      // 使用typescript AST查看器来解析类型
      const typeAnnotation = definePropsNode.typeAnnotation;
      // 假设你的类型是一个简单的对象类型，例如：{ name: string, age: number }
      // 你需要根据实际的类型来解析和转换
      const types = typeAnnotation.typeAnnotation.types.reduce((acc, type) => {
        acc[type.name.name] = type.typeAnnotation.type;
        return acc;
      }, {});

      // 输出类型信息
      console.log(types, "types---------");

      // 处理默认值
      const defaultValues = definePropsNode.defaults.reduce((acc, defaultNode) => {
        acc[defaultNode.name.name] = defaultNode.value;
        return acc;
      }, {});

      // 输出默认值信息
      console.log(defaultValues, "def-vals------------");
    }
  }
}
