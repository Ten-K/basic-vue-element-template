const menu = [
  {
    icon: "el-icon-platform-eleme",
    path: "components",
    title: "components",
    children: [
      {
        icon: "",
        path: "table",
        title: "Table",
      },
      {
        icon: "",
        path: "form",
        title: "Form",
      },
    ],
  },
  {
    icon: "el-icon-location",
    path: "log",
    title: "log",
  },
  {
    icon: "el-icon-setting",
    path: "test",
    title: "test",
  },
]

menu.forEach((item) => {
  const split = '/'
  item.href = `${split}${item.path}`
  if (item.children) {
    const menuHref = item.path ? `${item.href}/` : item.href
    item.children.forEach((itm) => {
      itm.href = `${menuHref}${itm.path}`
      if (itm.children) {
        const tplHref = `${itm.href}/`
        itm.children.forEach((cItm) => {
          cItm.href = `${tplHref}${cItm.path}`
        })
      }
    })
  }
})

export default menu