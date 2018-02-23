// components/textCom/textCom.js
Component({
    relations: {
        '../button/button': {
            type: 'parent',
            linked: function (target) {
             },  // target是组件b的实例，
            linkChanged: function (target) { },
            unlinked: function (target) { }
        }
    },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      changeParent: function(){
          var node = this.getRelationNodes('../button/button')[0];
          console.log(node.data.title)
          node.setData({
             title: "我是关联子组件改的 title"
          })
          console.log(node.data.title)
      }
  }
})
