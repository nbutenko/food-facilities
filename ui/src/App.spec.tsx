import { render, screen } from '@testing-library/react'
import App from './App'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getApiUrl } from './test-utils/get-api-url'


const server = setupServer(
  rest.get(getApiUrl(`/food-facilities`), (_req, res, ctx) => {
    return res(ctx.json([]))
  })
)

describe('App component', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())

  it('food facilities table should exist', async () => {
    render(<App />)
    const table = await screen.findByRole('table')
    expect(table).toBeInTheDocument()
  })
})
