import _ from 'lodash'
export const uniqueArray = (values: any[]) => {
  return values.length === _.uniq(values).length
}

export const uniqueNames = (
  users: { name: string }[],
  message = 'Имена не могут быть одинаковыми'
) => {
  return uniqueArray(users.map((u) => u.name)) || message
}

export const isNumber = (value: string | number) => {
  if (typeof value === 'number') value = value.toString()
  const regNum = new RegExp(/^\d*((\.|,)\d{1,2})?$/)
  return !regNum.test(value)
}
