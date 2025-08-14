let uuid = 0
export default function uniqueID() {
  const getID = () => {
    uuid++
    return uuid
  }

  return {
    getID
  }
}
