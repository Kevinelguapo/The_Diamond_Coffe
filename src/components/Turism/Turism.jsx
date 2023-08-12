import React from 'react'
import { Box, Typography } from '@mui/material'
import { CoffeeDivider } from '../../App'
import { Link, useParams } from 'react-router-dom'

// testing dynamic routes

const turismoPlaces = [
    {
        id: 1,
        name: "Casa de la cultura",
        description: "Casa de la cultura de la ciudad de Armenia",
        image: "https://www.culturarmenia.gov.co/wp-content/uploads/2020/08/IMG_20200819_111724_1.jpg",
    },
    {
        id: 2,
        name: "Parque de la vida",
        description: "Parque de la vida de la ciudad de Armenia",
        image: "https://www.culturarmenia.gov.co/wp-content/uploads/2020/08/IMG_20200819_111724_1.jpg",
    },
    {
        id: 3,
        name: "Parque del cafe",
        description: "Parque del cafe de la ciudad de Armenia",
        image: "https://www.culturarmenia.gov.co/wp-content/uploads/2020/08/IMG_20200819_111724_1.jpg",
    },
];

const sxStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }

export const Tourism = () => {
    return (
        <Box sx={sxStyle}>
            <Typography variant="h5" sx={{
                my: "16px",
            }}>
                *This is testing, it's not real*
            </Typography>
            <Typography variant="h1" sx={{
                my: "16px",
            }}>
                Turismo
            </Typography>
            <CoffeeDivider />
            <ul>
                {turismoPlaces.map((place) => (
                    <li key={place.id}>
                        <Link to={`/turismo/${place.id}`}>
                            {place.name}
                        </Link>
                    </li>
                ))}
            </ul>

        </Box>
    )
}

export const TourismPlace = () => {
    const { turismoId } = useParams();
    return (
        <>
            <Box sx={sxStyle}>

                <h1>TurismoPlace</h1>
                <CoffeeDivider />
                <h2>{turismoId}</h2>
                <h2>{turismoPlaces.find((place) => place.id === Number(turismoId)).name}</h2>

                {turismoPlaces.find((place) => place.id === Number(turismoId)).description}

                <img
                    src={turismoPlaces.find((place) => place.id === Number(turismoId)).image}
                    alt={turismoPlaces.find((place) => place.id === Number(turismoId)).name}
                />
            </Box>
        </>
    );
}

export default Tourism

