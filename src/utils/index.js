import store from "@/store";
let utils = {
  isFilterBtn(api) {
    const btnList = store.state.user.btnList;
    if (btnList.length == 1 && btnList[0] == '*:*:*') {
      return true
    }
    const index = btnList.indexOf(api);
    return index != -1
  }
}
export default utils;