import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { Box, IconButton, Slide } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'

function BannerCarousel({ items }) {
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)

  let intervalTimer

  useEffect(() => {
    if (index < 50) {
      intervalTimer = setInterval(() => {
        setIndex(index => index + 1)
      }, 8000)
    }

    return () => {
      clearTimeout(intervalTimer)
    }
  }, [index])

  useEffect(() => {
    setCards([...items, ...items])
  }, [])

  console.log(index)

  const handleBefore = function () {
    setIndex(index + 1)
  }

  const handleAfter = function () {
    setIndex(index - 1)
  }

  useEffect(() => {
    if (index % 16 === 15) {
      setCards(cards => [...cards, ...cards])
    }
    if (index % 16 === -0 && index !== 0) {
      setCards(cards => [...cards, ...cards])
    }
  }, [index])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        width: '100%',
        height: { sm: '210px', md: '280px' },
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '5em',
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translate(0, -50%)',
          zIndex: '1',
          backdropFilter: 'brightness(0.2)',
        }}
        onClick={handleBefore}
      >
        <NavigateBefore />
      </IconButton>
      {cards.map((card, i) => (
        <Box
          key={i}
          component={'img'}
          src={card}
          alt='banner'
          sx={{
            objectFit: { xs: 'contain' },
            objectPosition: { xs: 'center' },
            height: '100%',
            borderRadius: '1rem',
            transform: {
              xs: `translate(${index * 100}%, 0)`,
              sm: `translate(${index * 100 + 50}%, 0)`,
            },
            transition: 'transform 0.3s linear',
          }}
        />
      ))}
      <IconButton
        sx={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translate(0, -50%)',
          zIndex: '1',
          backdropFilter: 'brightness(0.2)',
        }}
        onClick={handleAfter}
      >
        <NavigateNext />
      </IconButton>
    </Box>
  )
}

export default BannerCarousel
