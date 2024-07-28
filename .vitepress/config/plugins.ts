import path from "path";
import fs from "fs";
import mdContainer from "markdown-it-container";
import headers from "../plugins/headers";
import externalLinkIcon from "../plugins/external-link-icon";
import tableWrapper from "../plugins/table-wrapper";
import tooltip from "../plugins/tooltip";
import tag from "../plugins/tag";
import { ApiTableContainer } from "../plugins/api-table";
import type Token from "markdown-it/lib/token";
import type Renderer from "markdown-it/lib/renderer";
import type MarkdownIt from "markdown-it";
import { getVueApiInfo } from "../../scripts/out/utils";
// import { docRoot } from "@element-plus/build-utils";

interface ContainerOpts {
  marker?: string | undefined;
  validate?(params: string): boolean;
  render?(tokens: Token[], index: number, options: any, env: any, self: Renderer): string;
}
// const docRoot = path.resolve(__dirname, "..", ".."); //项目目录
export default (md: MarkdownIt) => {
  md.use(headers);
  md.use(externalLinkIcon);
  md.use(tableWrapper);
  md.use(tooltip);
  md.use(tag);
  md.use(mdContainer, "demo", {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      /* means the tag is opening */
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : "";
        const sourceFileToken = tokens[idx + 2];
        let source = "";
        const sourceFile = sourceFileToken.children?.[0].content ?? "";

        if (sourceFileToken.type === "inline") {
          const pathStr = path.join(process.cwd(), sourceFile);
          // source = fs.readFileSync(pathStr, "utf-8");
          const { file, infos } = getVueApiInfo(pathStr);
          source = file;
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);
        return `<Demo source="${encodeURIComponent(md.render(`\`\`\` vue\n${source}\`\`\``))}" path="${sourceFile.replace(
          "/examples/",
          ""
        )}" raw-source="${encodeURIComponent(source)}" description="${encodeURIComponent(md.render(description))}">`;
      } else {
        return "</Demo>";
      }
    },
  } as ContainerOpts);

  md.use(ApiTableContainer);
};
