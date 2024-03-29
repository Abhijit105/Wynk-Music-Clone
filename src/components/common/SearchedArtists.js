import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import SearchedArtistItem from './SearchedArtistItem'

function SearchedArtists({ searchTerm }) {
  const [isLoading, setIsLoading] = useState(false)
  const [searchedArtists, setSearchedArtists] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/music/artist?search={"name":"${searchTerm}"}&page=${page}&limit=20`,
          {
            headers: { projectId: 'g2l7ypns0olm' },
          },
          { signal: controller.signal }
        )
        if (!response.ok)
          throw new Error('Something went wrong while fetching songs for you.')
        const data = await response.json()
        console.log(data)
        const artists = data.data
        setSearchedArtists(searchedArtists => [...searchedArtists, ...artists])
      } catch (err) {
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()

    return () => {
      controller.abort()
    }
  }, [searchTerm, page])

  return (
    <Box display='flex' flexDirection='column'>
      <Box padding='1.25em'>
        {searchedArtists.map((item, i) => (
          <SearchedArtistItem key={i} item={item} />
        ))}
      </Box>
      <Button variant='contained' onClick={() => setPage(page => page + 1)} sx={{
          alignSelf: 'center',
          backgroundColor: '#272727',
        }}
        color='inherit'>
        Show More
      </Button>
    </Box>
  )
}

export default SearchedArtists
