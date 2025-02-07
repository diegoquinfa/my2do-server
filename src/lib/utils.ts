export const sum = (...nums: number[]) => {
  let result = 0
  nums.forEach((n) => {
    result += n
  })

  return result
}
