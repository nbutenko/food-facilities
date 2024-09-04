import React, { useState, useEffect } from 'react'
import { httpClient } from '../../api/axios-client'
import {
  CircularProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Box,
  Fab,
  Tooltip,
  Alert
} from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import DoneIcon from '@mui/icons-material/Done'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import RandomizerDialog from './components/RandomizerDialog'
import { FoodFacility } from '../../interfaces/FoodFacility'

export const TABLE_HEADERS = [
  'Name',
  'Type',
  'Address',
  'Food Items',
  'Schedule'
]

const FoodFacilitiesList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingError, setLoadingError] = useState<string>('')
  const [foodFacilities, setFoodFacilities] = useState<FoodFacility[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selection, setSelection] = useState<FoodFacility | null>(null)

  useEffect(() => {
    const fetchFoodFacilities = async () => {
      if (loadingError) setLoadingError('')

      try {
        const { data } = await httpClient.get(`food-facilities`)
        setFoodFacilities(data)
      } catch (error) {
        setLoadingError(
          'Error fetching food facilities data - try again later.'
        )
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchFoodFacilities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = () => {
    if (!foodFacilities.length) return null

    const randomSelection =
      foodFacilities[Math.floor(Math.random() * foodFacilities.length)]
    setSelection(randomSelection)
  }

  const createData = (
    name: string,
    type: string,
    address: string,
    items: string,
    location: string
  ) => ({ name, type, address, items, location })

  const rows = foodFacilities.map((el) =>
    createData(el.name, el.type, el.address, el.foodItems, el.locationUrl)
  )

  return loading ? (
    <Box className='text-center mt-40'>
      <CircularProgress size={50} />
    </Box>
  ) : loadingError ? (
    <Alert severity='error'>{loadingError}</Alert>
  ) : (
    <>
      <Paper sx={{ width: '100%' }}>
        <TableContainer className='max-h-screen'>
          <Table sx={{ minWidth: 700 }} stickyHeader>
            <TableHead>
              <TableRow>
                {TABLE_HEADERS.map((header, i) => (
                  <StyledTableCell key={i} align={i ? 'right' : 'left'}>
                    {header}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {foodFacilities.length ? (
                rows.map((row) => (
                  <StyledTableRow
                    key={row.name}
                    data-testid='food-facility-row'
                  >
                    <StyledTableCell component='th' scope='row'>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align='right' width='10%'>
                      {row.type}
                    </StyledTableCell>
                    <StyledTableCell align='right' width='25%'>
                      {row.address}
                    </StyledTableCell>
                    <StyledTableCell align='right' width='40%'>
                      {row.items}
                    </StyledTableCell>
                    <StyledTableCell align='right' width='10%'>
                      <Link href={row.location} variant='body2' target='_blank'>
                        <PlaceIcon /> Find on map
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow className='italic'>
                  <TableCell className='bg-white'>
                    No food faicilities to display
                  </TableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {foodFacilities.length ? (
        <Tooltip
          data-testid='randomizer-tooltip'
          title={
            selection
              ? 'Your food facility has been chosen! Click here to view the details of your selected spot.'
              : "Can't decide where to eat? Click to let us pick a food facility for you!"
          }
          placement='top-start'
        >
          <Fab
            data-testid='randomizer-button'
            color='success'
            sx={(theme) => ({
              position: 'absolute',
              bottom: theme.spacing(4),
              right: theme.spacing(4)
            })}
            onClick={() => setIsDialogOpen(true)}
          >
            {selection ? <DoneIcon /> : <RestaurantIcon />}
          </Fab>
        </Tooltip>
      ) : null}

      <RandomizerDialog
        isOpen={!!isDialogOpen}
        selection={selection}
        handleSelect={handleSelect}
        handleClose={() => setIsDialogOpen(false)}
      />
    </>
  )
}

export default FoodFacilitiesList

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  }
}))
