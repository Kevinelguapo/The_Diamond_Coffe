import React from 'react'
import { Skeleton, Grid, Typography } from '@mui/material'
// import Grid from '@mui/material'

const FormSkeleton = () => {
    const inputs = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div>
            <Typography variant="h5" align='center' >
                Shipping Address
            </Typography>
            <br />
            <Grid container spacing={3}>
                {
                    inputs.map((item) => (
                        <Grid item xs={12} sm={6} key={item}>
                            <Skeleton variant="rounded" height={56} animation="wave" />
                        </Grid>
                    ))
                }
            </Grid>
        </div>

    )
}

export default FormSkeleton
