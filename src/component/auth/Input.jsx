import { IconButton, TextField } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import { Grid } from '@material-ui/core'

import { Visibility, VisibilityOff } from '@material-ui/icons'
import React from 'react'

export default function Input({ name, handleChange, half, onChange, autoFocus, type, label, handleShowPassword }) {
    return (
         <Grid item xs={12}sm={ half ? 6 : 12 } >
        <TextField name={name}
        onChange={handleChange}
        variant = "outlined"
        required fullWidth label={label}
        autoFocus={ autoFocus }
        type={type}
        InputProps = {
            name === 'password' ? {
                endAdornment: (
                     <InputAdornment position = "end" >
                    <IconButton onClick = {handleShowPassword}>
                         {type === 'password' ? <Visibility/> : <VisibilityOff/> } 
                    </IconButton>
                      </InputAdornment>
                )
            } : null
        }



        />

        </Grid>
    )
}