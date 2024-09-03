import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTitle from '../SharedComponents/BaseTitle.vue'

describe('render-title', () => {
    it('should be vue instance', () => {
        const wrapper = mount(BaseTitle, {
            propsData: {
                title: 'Bem vindo'
            }
        })
        expect(wrapper.vm).toBeDefined()
    })
})
