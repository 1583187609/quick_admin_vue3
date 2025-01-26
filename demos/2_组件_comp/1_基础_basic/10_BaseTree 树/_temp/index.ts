import type Node from "element-plus/es/components/tree/src/model/node";

let count = 1;
export interface Tree {
  //   name: string;
  [key: string]: any;
}
export const treeProps = {
  label: "name",
  children: "zones",
};
export const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) return resolve([{ name: "Root1" }, { name: "Root2" }]);
  if (node.level > 3) return resolve([]);
  let hasChild = false;
  if (node.data.name === "region1") {
    hasChild = true;
  } else if (node.data.name === "region2") {
    hasChild = false;
  } else {
    hasChild = Math.random() > 0.5;
  }
  setTimeout(() => {
    const data: Tree[] = hasChild ? [{ name: `zone${count++}` }, { name: `zone${count++}` }] : [];
    resolve(data);
  }, 500);
};

export const treeData: Tree[] = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
];
