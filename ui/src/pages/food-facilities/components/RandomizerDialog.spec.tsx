import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockFoodFacilities } from '../../../test-utils/mocks'
import RandomizerDialog from './RandomizerDialog'
import { FoodFacility } from '../../../interfaces/FoodFacility'

const mockHandleSelect = jest.fn()
const mockHandleClose = jest.fn()

const renderRandomizerDialog = (
  {
    isOpen,
    selection
  }: {
    isOpen: boolean
    selection: FoodFacility | null
  } = { isOpen: true, selection: null }
) => {
  const utils = render(
    <RandomizerDialog
      isOpen={isOpen}
      selection={selection}
      handleSelect={mockHandleSelect}
      handleClose={mockHandleClose}
    />
  )

  return {
    ...utils,
    queryDialog: () => screen.queryByRole('dialog'),
    getButtonByName: (name: string | RegExp) =>
      screen.getByRole('button', { name })
  }
}

describe('RandomizerDialog component', () => {
  it('does not render if isOpen prop is false', async () => {
    const { queryDialog } = renderRandomizerDialog({
      isOpen: false,
      selection: null
    })

    expect(queryDialog()).not.toBeInTheDocument()
  })

  it('renders dialog, its title and content if isOpen prop is true and calls handlers on click', async () => {
    const { queryDialog, getButtonByName } = renderRandomizerDialog()

    expect(queryDialog()).toBeInTheDocument()
    expect(
      screen.getByText(/random food facility selector/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Feeling indecisive? Our randomizer is here to help! It selects a food facility at random, making it easier for you to decide where to eat today. Perfect for when you're overwhelmed by choices or just in the mood for a surprise. Let's see where your next meal takes you!"
      )
    ).toBeInTheDocument()

    await userEvent.click(getButtonByName(/cancel/i))
    expect(mockHandleClose).toHaveBeenCalledTimes(1)

    await userEvent.click(getButtonByName(/randomize/i))
    expect(mockHandleSelect).toHaveBeenCalledTimes(1)
  })

  it('renders selection and different content, if selection has been made; Randomize button should be hided', async () => {
    const { getButtonByName } = renderRandomizerDialog({
      isOpen: true,
      selection: mockFoodFacilities[0]
    })

    expect(screen.getByText(/today's food facility pick/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        'Your selection is made for today! Here is the information about the food facility chosen just for you. Enjoy your meal!'
      )
    ).toBeInTheDocument()
    expect(screen.getByText(mockFoodFacilities[0].name)).toBeInTheDocument()
    expect(screen.getByText(mockFoodFacilities[0].foodItems)).toBeInTheDocument()

    await userEvent.click(getButtonByName(/got it/i))
    expect(mockHandleClose).toHaveBeenCalledTimes(1)
  })
})
