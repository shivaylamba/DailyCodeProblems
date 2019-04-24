const given = [10, 15, 3, 7];
const wanted = 17;
console.log(findPairSum(given, wanted));

function findPairSum(array, number) {
  let map = new Map();
  for (let x = 0, length = array.length; x < length; x++) {
    if (map.has(array[x])) {
      return true;
    } else {
      map.set(number - array[x], array[x]);
    }
  }
  return false;
}
