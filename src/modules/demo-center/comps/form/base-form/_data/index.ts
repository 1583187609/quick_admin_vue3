import { OptionItem } from "@/core/_types";

export const treeData = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];

export const tempAddressOpts: OptionItem[] = [
  {
    label: "省1",
    value: "1",
    children: [
      {
        label: "市1-1",
        value: "1-1",
        children: [
          { label: "县1-1-1", value: "1-1-1" },
          { label: "县1-1-2", value: "1-1-2" },
        ],
      },
      {
        label: "市1-2",
        value: "1-2",
        children: [
          { label: "县1-2-1", value: "1-2-1" },
          { label: "县1-2-2", value: "1-2-2" },
        ],
      },
      {
        label: "市1-3",
        value: "1-3",
        children: [
          { label: "县1-3-1", value: "1-3-1" },
          { label: "县1-3-2", value: "1-3-2" },
        ],
      },
    ],
  },
  {
    label: "省2",
    value: "2",
    children: [
      { label: "市2-1", value: "2-1" },
      { label: "市2-2", value: "2-2" },
      { label: "市2-3", value: "2-3" },
    ],
  },
];
