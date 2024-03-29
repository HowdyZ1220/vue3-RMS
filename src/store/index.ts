import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderwhy',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      //请求菜单数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      const { list: roleList } = roleResult.data
      //2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },

  getters: {},
  modules: { login, system, dashboard }
})
//调用解决vuex刷新不保存的方法
export function setupStore() {
  store.dispatch('loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
