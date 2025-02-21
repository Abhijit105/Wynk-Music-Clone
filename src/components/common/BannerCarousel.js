import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function BannerCarousel({ items }) {
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)

  const navigate = useNavigate()

  const clickHandler = function () {
    navigate('/bannerlink')
  }

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

  // console.log(index)

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
        gap: '2em',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '5em',
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          left: '1em',
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
          width={{ xs: '100%' }}
          display={'flex'}
          flex={{ xs: '1 0 100%', lg: '1 0 50%' }}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{
            borderRadius: '1rem',
            transform: `translate(calc(${index * 100 + 50}% + ${
              index * 2
            }em + 1em), 0)`,

            transition: 'transform 0.3s linear',
            cursor: 'pointer',
          }}
          onClick={clickHandler}
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
