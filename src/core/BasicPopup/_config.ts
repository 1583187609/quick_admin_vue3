export const defaultDialogAttrs = {
  width: "fit-content",
  style: "max-width: 94vw;min-width:200px;overflow:hidden;",
  closeOnClickModal: false,
  appendToBody: true,
  destroyOnClose: true, // 当关闭 Dialog 时，销毁其中的元素
  draggable: true,
};

export const defaultDrawerAttrs = {
  size: "none",
  style: "max-width: 94vw;min-width:200px;",
  closeOnClickModal: false,
  appendToBody: true,
  destroyOnClose: true, // 是否在关闭 Drawer 之后将子元素全部销毁
};
