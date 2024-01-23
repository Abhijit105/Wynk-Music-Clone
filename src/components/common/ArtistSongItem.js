import React, { useEffect } from 'react'
import { Grid, Box, Typography, IconButton } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { useState } from 'react'
import { BASEURL } from '../../config/config'
import LoginModal from '../../components/LoginModal'
import { useContext } from 'react'
import { AuthContext } from '../AuthProvider'

function ArtistSongItem({
  i,
  item,
  onPlaylistUpdate,
  onTrackUpdate,
  songItems,
}) {
  const [artists, setArtists] = useState([])
  const [album, setAlbum] = useState(null)
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(false)
  const [isLoadingArtists, setIsLoadingArtists] = useState(false)
  const [openLoginModal, setOpenLoginModal] = React.useState(false)

  const { webToken } = useContext(AuthContext)

  const clickHandler = function (i) {
    onPlaylistUpdate(songItems)
    onTrackUpdate(i)
  }

  const handleOpenLoginModal = e => {
    e.preventDefault()
    setOpenLoginModal(true)
  }

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false)
  }

  const fetchDataAlbum = async () => {
    try {
      setIsLoadingAlbum(true)
      const response = await fetch(`${BASEURL}/album/${item.album}`, {
        headers: { projectId: 'g2l7ypns0olm' },
      })
      console.log(response)
      if (!response.ok) {
        throw new Error('Something went wrong while fetching songs for you.')
      }
      const data = await response.json()
      console.log(data)
      const result = data.data
      setAlbum(result)
    } catch (err) {
      console.error(err.message)
    } finally {
      setIsLoadingAlbum(false)
    }
  }

  useEffect(() => {
    fetchDataAlbum()
  }, [])

  const fetchDataArtists = async () => {
    for await (const artistId of item.artist) {
      try {
        setIsLoadingArtists(true)
        const response = await fetch(`${BASEURL}/artist/${artistId}`, {
          headers: { projectId: 'g2l7ypns0olm' },
        })
        console.log(response)
        if (!response.ok) {
          throw new Error('Something went wrong while fetching songs for you.')
        }
        const data = await response.json()
        console.log(data)
        const result = data.data
        setArtists(artists => [...artists, result])
      } catch (err) {
        console.error(err.message)
      } finally {
        setIsLoadingArtists(false)
      }
    }
  }

  useEffect(() => {
    fetchDataArtists()
  }, [])

  console.log(item)
  console.log(album)

  return (
    <>
      <Grid
        container
        marginBottom='1em'
        sx={{ cursor: 'pointer' }}
        onClick={e => (webToken ? clickHandler(i) : handleOpenLoginModal(e))}
      >
        <Grid xl={'auto'} marginRight='1em'>
          <Typography>{i + 1}</Typography>
        </Grid>
        <Grid xl={4}>
          <Box display='flex' alignItems='center' gap='0.5em'>
            <Box
              component={'img'}
              src={item?.thumbnail}
              alt={item?.title}
              maxWidth='3em'
              borderRadius='0.375em'
            />
            <Typography>{item?.title}</Typography>
          </Box>
        </Grid>
        <Grid xl={3}>
          <Typography color='rgba(255, 255, 255, 0.7)'>
            {artists.map(a => a.name).join(', ')}
          </Typography>
        </Grid>
        <Grid xl={3}>
          <Typography color='rgba(255, 255, 255, 0.7)'>
            {album?.title}
          </Typography>
        </Grid>
        <Grid xl={1}>
          <IconButton
            sx={{
              background: 'linear-gradient(to bottom, #ff8c76, #ff0d55)',
            }}
          >
            <Favorite fontSize='small' />
          </IconButton>
        </Grid>
      </Grid>
      <LoginModal open={openLoginModal} handleClose={handleCloseLoginModal} />
    </>
  )
}

export default ArtistSongItem
