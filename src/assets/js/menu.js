const menu = [
  {
    icon: "el-icon-menu",
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
    icon: "el-icon-menu",
    path: "enterjump",
    title: "enterJump",
  },
  {
    icon: "el-icon-menu",
    path: "verificationCode",
    title: "verificationCode",
  },
  {
    icon: "el-icon-menu",
    path: "simulationVuex",
    title: "simulationVuex",
  },
  {
    icon: "el-icon-menu",
    path: "ws",
    title: "webSocket",
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