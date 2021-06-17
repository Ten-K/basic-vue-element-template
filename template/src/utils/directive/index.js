import Vue from 'vue'
//回车跳转
Vue.directive("enterJump", {
  bind: function (el, binding, vnode) {
    let element = vnode.elm.elements
    for (let i = 0; i < element.length; i++) {
      element[i].addEventListener('keyup', (ev) => {
        if (ev.keyCode === 13) {
          let index = i
          if (element[index].type == "text") {
            //如果是下拉选择框则需要添加相同的name和ref  
            if (element[index].getAttribute('readonly')) {
              //   //vnode.context相当于this
              if(Array.isArray(vnode.context.$refs[element[index].name])){
                setTimeout(() => {
                  vnode.context.$refs[element[index].name][0].blur()
                }, 100);
              }else{
                setTimeout(() => {
                  vnode.context.$refs[element[index].name].blur()
                }, 100);
              }
            }
            while (element[index].disabled) {
              index++
            }
            element[index + 1].focus()
          }

          if (element[index].type == "textarea" || element[index].type == "number") {
            while (element[index].disabled) {
              index++
            }
            element[index + 1].focus()
          }

          if (element[index].type == "radio" || element[index].type == "checkbox") {
            while (element[index].disabled) {
              index++
            }
            console.log(element[index]);
            if (element[index + 1] && typeof element[index + 1].focus === 'function') {
              if (element[index].type == "radio") {
                element[index].previousElementSibling.style.borderColor = ""
              }
              if (element[index + 1].type == "radio") {
                element[index + 1].previousElementSibling.style.borderColor = "#409EFF"
              }
              element[index + 1].focus()
              element[index + 1].select()
            } else if (!element[index + 1]) {
              element[index + 1].blur()
            }
          }
        }
      })
    }
  }
})

//用于聚焦到某一个输入框
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……聚焦
  inserted: function (el) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})