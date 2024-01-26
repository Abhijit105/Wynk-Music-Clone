import React from 'react'
import { useContext } from 'react'
import { AllContext } from '../../contexts/AllProvider'
import AlbumsPage from '../common/AlbumsPage'
import BestWay from '../common/BestWay'
import { Box } from '@mui/material'

function AlbumsBhojpuri() {
  const { allAlbums } = useContext(AllContext)

  function mergeLanguage(x) {
    const L = new Set()
    for (let a in Object.keys(x.artists)) {
      for (let l in x.artists[a].languages) {
        L.add(x.artists[a].languages[l])
      }
    }

    return L
  }

  function filterLanguage(lang, x) {
    return x.has(lang)
  }

  const albumsBhojpuri = allAlbums.filter(row =>
    filterLanguage('hindi', mergeLanguage(row))
  )

  const displayedAlbums = albumsBhojpuri.slice(0, 8)

  // console.log(albumsBhojpuri)

  return (
    <Box
      padding='6em'
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <AlbumsPage title='Top Bhojpuri Albums' albumItems={displayedAlbums} />
      <BestWay />
    </Box>
  )
}

export default AlbumsBhojpuri
