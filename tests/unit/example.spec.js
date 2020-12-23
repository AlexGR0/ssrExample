import { shallowMount } from '@vue/test-utils'
import index from '@/components/index.vue'

describe('index.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'index page'
    const wrapper = shallowMount(index, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
