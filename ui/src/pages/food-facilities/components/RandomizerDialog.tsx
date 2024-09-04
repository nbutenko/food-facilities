import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Link
} from '@mui/material'
import { FoodFacility } from '../../../interfaces/FoodFacility'
import PlaceIcon from '@mui/icons-material/Place'

interface RandomizerDialogProps {
  isOpen: boolean
  selection: FoodFacility | null
  handleSelect: () => void
  handleClose: () => void
}

const RandomizerDialog: React.FC<RandomizerDialogProps> = ({
  isOpen,
  selection,
  handleSelect,
  handleClose
}) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    aria-labelledby='randomizer-dialog'
    aria-describedby='randomizer-dialog-description'
  >
    <DialogTitle id='delete-dialog'>
      {selection
        ? "Today's Food Facility Pick!"
        : 'Random Food Facility Selector'}
    </DialogTitle>
    <DialogContent>
      {selection ? (
        <>
          <DialogContentText id='selection-description'>
            Your selection is made for today! Here is the information about the
            food facility chosen just for you. Enjoy your meal!
          </DialogContentText>
          <Divider className='!my-4' />
          <Box className='text-center'>
            <Link
              href={selection.locationUrl}
              target='_blank'
              color='inherit'
              className='!text-xl !semi-bold'
              underline='none'
            >
              <Box data-testid='selection-name'>
                {selection.name} <PlaceIcon color='primary' />
              </Box>
              <Box className='text-sm'>{selection.foodItems}</Box>
            </Link>{' '}
          </Box>
        </>
      ) : (
        <DialogContentText id='randomizer-dialog-description'>
          Feeling indecisive? Our randomizer is here to help! It selects a food
          facility at random, making it easier for you to decide where to eat
          today. Perfect for when you're overwhelmed by choices or just in the
          mood for a surprise. Let's see where your next meal takes you!
        </DialogContentText>
      )}
    </DialogContent>
    <DialogActions>
      <Button variant='outlined' onClick={handleClose}>
        {selection ? 'Got it!' : 'Cancel'}
      </Button>
      {!selection && (
        <Button
          variant='contained'
          color='success'
          onClick={handleSelect}
          autoFocus
        >
          Randomize
        </Button>
      )}
    </DialogActions>
  </Dialog>
)

export default RandomizerDialog
