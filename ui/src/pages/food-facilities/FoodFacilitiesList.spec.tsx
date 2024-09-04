import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getApiUrl } from './../../test-utils/get-api-url'
import { mockFoodFacilities } from '../../test-utils/mocks'
import FoodFacilitiesList, { TABLE_HEADERS } from './FoodFacilitiesList'

const ROUTE = getApiUrl(`/food-facilities`)
const server = setupServer(
  rest.get(ROUTE, (_req, res, ctx) => {
    return res(ctx.json(mockFoodFacilities))
  })
)

const renderFoodFacilitiesList = () => {
  const utils = render(
    <Router>
      <FoodFacilitiesList />
    </Router>
  )

  return {
    ...utils,
    waitForLoading: async () =>
      await waitForElementToBeRemoved(screen.queryByRole('progressbar')), // MUI CircularProgress
    getButtonByName: (name: string | RegExp) =>
      screen.getByRole('button', { name }),
    getRandomizerButton: () => screen.getByTestId('randomizer-button'),
    queryDialog: () => screen.queryByRole('dialog')
  }
}

describe('FoodFacilitiesList component', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  it('renders error if fetching food facilities data fails', async () => {
    server.use(
      rest.get(ROUTE, (_req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const { waitForLoading } = renderFoodFacilitiesList()
    await waitForLoading()

    expect(
      screen.getByText('Error fetching food facilities data - try again later.')
    ).toBeInTheDocument()
  })

  it('renders empty table if no food facilities returned from api', async () => {
    server.use(
      rest.get(ROUTE, (_req, res, ctx) => {
        return res(ctx.json([]))
      })
    )
    const { waitForLoading } = renderFoodFacilitiesList()
    await waitForLoading()

    expect(screen.queryByTestId('food-facility-row')).not.toBeInTheDocument()
    expect(
      screen.getByText('No food faicilities to display')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('randomizer-button')).not.toBeInTheDocument()
  })

  it('renders content correctly when api successfully returns data', async () => {
    const { waitForLoading, getRandomizerButton } = renderFoodFacilitiesList()
    await waitForLoading()

    // table
    TABLE_HEADERS.map((header) => {
      expect(screen.getByText(header)).toBeInTheDocument()
    })
    expect(screen.getAllByTestId('food-facility-row').length).toBe(
      mockFoodFacilities.length
    )

    // table content
    mockFoodFacilities.map((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument()
      expect(screen.getByText(item.type)).toBeInTheDocument()
      expect(screen.getByText(item.address)).toBeInTheDocument()
      expect(screen.getByText(item.foodItems)).toBeInTheDocument()
    })
    expect(screen.getAllByText('Find on map').length).toBe(
      mockFoodFacilities.length
    )

    // randomizer button & tooltip
    await userEvent.hover(getRandomizerButton())
    await waitFor(() => {
      expect(
        screen.getByText(
          "Can't decide where to eat? Click to let us pick a food facility for you!"
        )
      ).toBeInTheDocument()
    })
  })

  it('randomizer functionality works correctly', async () => {
    const {
      waitForLoading,
      getRandomizerButton,
      queryDialog,
      getButtonByName
    } = renderFoodFacilitiesList()
    await waitForLoading()

    // open dialog
    await userEvent.click(getRandomizerButton())
    await waitFor(() => {
      expect(queryDialog()).toBeInTheDocument()
    })

    // close dialog
    await userEvent.click(getButtonByName(/cancel/i))
    await waitFor(() => {
      expect(queryDialog()).not.toBeInTheDocument()
    })

    // open dialog and trigger randomizer
    await userEvent.click(getRandomizerButton())
    await waitFor(() => {
      expect(
        screen.getByText('Random Food Facility Selector')
      ).toBeInTheDocument()
    })
    expect(screen.queryByTestId('selection-name')).not.toBeInTheDocument()

    await userEvent.click(getButtonByName(/randomize/i))
    await waitFor(() => {
      expect(
        screen.getByText("Today's Food Facility Pick!")
      ).toBeInTheDocument()
    })
    expect(screen.getByTestId('selection-name')).toBeInTheDocument()

    // close dialog => tooltip should be changed
    await userEvent.click(getButtonByName(/got it/i))
    await waitFor(() => {
      expect(queryDialog()).not.toBeInTheDocument()
    })
    await userEvent.hover(getRandomizerButton())
    await waitFor(() => {
      expect(
        screen.getByText(
          'Your food facility has been chosen! Click here to view the details of your selected spot.'
        )
      ).toBeInTheDocument()
    })

    // re-open dialog => selection should be presented
    await userEvent.click(getRandomizerButton())
    await waitFor(() => {
      expect(
        screen.getByText("Today's Food Facility Pick!")
      ).toBeInTheDocument()
    })
    expect(screen.getByTestId('selection-name')).toBeInTheDocument()
  })
})
