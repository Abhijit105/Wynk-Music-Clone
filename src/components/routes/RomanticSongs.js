import { Box } from '@mui/material'
import React from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import MoodSongs from '../common/MoodSongs'

function RomanticSongs() {
  return (
    <Box
      padding='100px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <MoodSongs title='Romantic Songs' type='romantic' numberOfSongs={200} />
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default RomanticSongs
