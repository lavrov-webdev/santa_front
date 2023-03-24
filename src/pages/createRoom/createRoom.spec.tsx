import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { getUrlToTest, renderWithProviders } from '../../../test/utils'
import { CreateRoom } from './index'
import { cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const handlers = [
  rest.post(getUrlToTest('api/room/create'), (_, res, ctx) => {
    const result = {
      room_id: 'test_room_id',
      room_root_password: 'test_room_password',
    }
    return res(ctx.json(result), ctx.delay(150))
  }),
]

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => {
  cleanup()
  server.resetHandlers()
})
afterAll(() => server.close())

describe('create room page', async () => {
  test('add and delete a new user', async () => {
    const { getAllByRole, getByText, getAllByText } = renderWithProviders(
      <CreateRoom />
    )
    const startInputsLen = getAllByRole('textbox').length
    expect(startInputsLen).toBeGreaterThanOrEqual(3)
    fireEvent.click(getByText(/Добавить участника/i))
    expect(getAllByRole('textbox').length).toBe(startInputsLen + 1)
    const deleteButton = getAllByText(/Удалить/i)[0]
    fireEvent.click(deleteButton)
    expect(getAllByRole('textbox').length).toBe(startInputsLen)
  })

  test('create room/failed - same names', async () => {
    const { getByTestId, getByText } = renderWithProviders(<CreateRoom />)
    const users = ['1', '1', '2']
    for (let i = 0; i < 3; i++) {
      const input = getByTestId(`users.${i}.name`)
      await userEvent.type(input, users[i])
    }
    const submitButton = getByText(/Создать комнату/i)
    await userEvent.click(submitButton)
    getByText(/Имена не могут быть одинаковыми/i)
  })

  test('create room/failed - empty name', async () => {
    const { getByTestId, queryByText, getAllByText, getByText } =
      renderWithProviders(<CreateRoom />)
    const users = ['1', '2']
    for (let i = 0; i < 2; i++) {
      const input = getByTestId(`users.${i}.name`)
      await userEvent.type(input, users[i])
    }
    const submitButton = getByText(/Создать комнату/i)
    await userEvent.click(submitButton)
    expect(queryByText(/Имена не могут быть одинаковыми/i)).toBeNull()
    expect(getAllByText(/Имя не может быть пустым/i).length).toBe(1)
  })

  test('create room/success', async () => {
    const wrapper = renderWithProviders(<CreateRoom />)
    for (let i = 0; i < 3; i++) {
      const input = wrapper.getByTestId(`users.${i}.name`)
      await userEvent.type(input, i.toString())
    }
    const submitButton = wrapper.getByText(/Создать комнату/i)
    await userEvent.click(submitButton)
    await wrapper.findByText(/Комната создана!/i)
  })
})
