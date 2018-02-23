// component/button/button.js
Component({
    relations: {
        '../textCom/textCom': {
            type: 'child',
            linked: function (target) { },  // target是组件b的实例，
            linkChanged: function (target) { },
            unlinked: function (target) { }
        }
    },
    options: {
         multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
  /**
   * 组件的属性列表
   */
  properties: {
        data:{
            type: Object
        },
        title:{
            type: String
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
        attr: [1,2,3,4]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    childrenTab: function(){
        console.log('子组件事件');
        this.triggerEvent('parentTab', 'children参数1')
    }
  }
})
