import Vue from 'vue'
import HomePage from 'src/pages/HomePage'

describe('HomePage.vue', () => {
  it('should render home page contents', () => {
    const Constructor = Vue.extend(HomePage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.home h1').textContent)
      .to.equal('最新区块')
  })
})
