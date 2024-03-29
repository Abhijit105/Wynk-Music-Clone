import { Box } from '@mui/material'
import React, { useContext, useState } from 'react'
import LoginRecommendation from '../common/LoginRecommendation'
import BestWay from '../common/BestWay'
import MoodSongs from '../common/MoodSongs'
import AudioPlayerComponent from '../common/AudioPlayerComponent'
import { PlayerContext } from '../../contexts/PlayerProvider'

function ExcitedSongs() {
  const { setPlaylist, setTrack } = useContext(PlayerContext)

  return (
    <Box
      padding='6em'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <MoodSongs
        title='Excited Songs'
        type='excited'
        numberOfSongs={200}
        onPlaylistUpdate={setPlaylist}
        onTrackUpdate={setTrack}
      />
      <LoginRecommendation />
      <BestWay />
    </Box>
  )
}

export default ExcitedSongs
