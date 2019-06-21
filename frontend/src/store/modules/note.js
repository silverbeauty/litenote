const state = {
  discount: 0,
}

const mutations = {
  setDiscount (discount) {
  	state.discount = discount;
  },
}

export default {
  namespaced: true,
  state,
  mutations
}
