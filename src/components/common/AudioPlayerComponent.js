import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '../../custom.css'
import { RHAP_UI } from 'react-h5-audio-player'
import { PlaylistPlay } from '@mui/icons-material'
import React, { useContext, useEffect } from 'react'
import { Box, Paper, Typography, IconButton } from '@mui/material'
import { useState } from 'react'
import { BASEURL } from '../../config/config'
import { darkTheme } from '../App'
import { AuthContext } from '../../contexts/AuthProvider'
import { PlayerContext } from '../../contexts/PlayerProvider'

function AudioPlayerComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [album, setAlbum] = useState({})

  const { playlist, track, setTrack } = useContext(PlayerContext)

  const { webToken } = useContext(AuthContext)

  const handleEnd = function () {
    setTrack(track < playlist.length - 1 ? track + 1 : 0)
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BASEURL}/album/${playlist.at(track)?.album}`,
        {
          headers: { projectId: 'g2l7ypns0olm' },
        }
      )
      console.log(response)
      if (!response.ok) {
        throw new Error('Something went wrong while fetching songs for you.')
      }
      const data = await response.json()
      console.log(data)
      const result = data.data
      setAlbum(result)
    } catch (err) {
      console.log(err)
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [track])

  console.log(playlist)
  console.log(album)
  console.log(webToken)

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: '2',
        bottom: '0',
        width: '100%',
        left: '0',
      }}
    >
      <AudioPlayer
        customProgressBarSection={[
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.CURRENT_TIME,
          <div className='rhap_time rhap_slash'>/</div>,
          RHAP_UI.DURATION,
        ]}
        customControlsSection={[
          <Paper
            sx={{
              backgroundColor: '#272727',
              marginLeft: '1em',
              display: 'flex',
              gap: '0.75em',
              padding: '0.5em',
              borderRadius: '1em',
            }}
          >
            <Box
              component={'img'}
              src={playlist?.at(track)?.thumbnail}
              alt={playlist?.at(track)?.title}
              width='3em'
              borderRadius='0.5em'
            />
            <Box display='flex' flexDirection='column' justifyContent='center'>
              <Typography fontSize='1em'>
                {playlist?.at(track)?.title}
              </Typography>
              <Typography
                fontSize='0.75em'
                color={darkTheme.palette.text.secondary}
              >
                {album?.title}
              </Typography>
            </Box>
          </Paper>,
          RHAP_UI.ADDITIONAL_CONTROLS,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
          <IconButton
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              backgroundColor: '#272727',
              padding: '0 !important',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            <PlaylistPlay />
          </IconButton>,
        ]}
        showSkipControls={true}
        showJumpControls={false}
        src={webToken && playlist?.at(track)?.audio_url}
        volume={0.8}
        onEnded={handleEnd}
        onClickNext={() =>
          setTrack(track => (track !== playlist.length - 1 ? track + 1 : 0))
        }
        onClickPrevious={() =>
          setTrack(track => (track !== 0 ? track - 1 : playlist.length - 1))
        }
      />
    </Box>
  )
}

export default AudioPlayerComponent
