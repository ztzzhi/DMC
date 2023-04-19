/* eslint-disable prefer-const */
function adressFind(list: any, id: number | string) {
  console.log("123456")
  if (!list || !id) {
    return ""
  }
  let arr: any = []
  let findParent = (data: any, nodeId: any, parentId?: any) => {
    for (let i = 0, length = data.length; i < length; i++) {
      let node = data[i]
      if (node.id === nodeId.toString()) {
        arr.unshift(data[i])
        if (nodeId.toString() === list[0].id) {
          break
        }
        findParent(list, parentId)
        break
      } else {
        if (node.children) {
          findParent(node.children, nodeId, node.id)
        }
        continue
      }
    }
    return arr
  }
  return findParent(list, id)
}
export default adressFind
