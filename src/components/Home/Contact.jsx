import React from 'react'

import { Box, Typography, IconButton, Icon } from "@mui/material";

// contact info
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CallIcon from '@mui/icons-material/Call';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import { bgcolor } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const Contact = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const phones = [
        "+57313-439-3173",
        "+57314-326-7025",
        "+57311-252-3386",
    ];
    return (
        <>
        <Typography variant="h2" component="h1" align="center">
          Contactanos
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          < IconButton
            href="https://www.instagram.com/thediamond_coffee/"
            target="_blank"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://wa.me/573112523386" target="_blank">
            <WhatsAppIcon />
          </IconButton>
          <IconButton href="https://www.youtube.com/channel/UCZ8Y8Z8Z8Z8Z8Z8Z8Z8Z8Z8" target="_blank">
            <YouTubeIcon />
          </IconButton>
          <IconButton onClick={handleClickOpen}>
            <ContactPhoneIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            keepMounted
            TransitionComponent={Transition}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-paper": {
                backgroundColor: "background.paper",
                color: "text.primary",
                padding: "8px 8px 0",
                borderRadius: "8px",
                border: "2px solid",
                borderColor: "background.cart",
              },
            }}

          >
            <DialogTitle>{"??Quieres llamar?"}</DialogTitle>
            <List sx={{ pt: 0 }}>
              {phones.map((phone) => (
                <ListItem disableGutters key={phone} >  
                  <ListItemButton href={`tel:${phone}`} onClick={handleClose}>
                    <ListItemAvatar>
                      <Avatar sx={{ color: "primary.main", bgcolor: "background.default", 
                      border: "1px solid", 
                      borderColor: "background.cart", 
                      }}>
                        <CallIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={phone.slice(-12).replace(/-/g, " ")} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <IconButton onClick={handleClose} sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "background.cart"
            }}>
                <CloseIcon />
            </IconButton>
          </Dialog>
          <IconButton href="mailto:thediamond.dbcoffee@gmail.com" >
            <EmailIcon />
          </IconButton>
        </Box>
        </>
    )
}
