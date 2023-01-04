import React from "react";
import { useSelector } from "react-redux";

import { ReactComponent as MyLogo } from "../../assets/logosvg.svg";
import { Link } from "react-router-dom";
import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Container } from "@mui/system";

const pages = ["Products", "Home", "Contact"];
const paths = ["/products", "/", "/contact"];

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "black",
          color: "white",
          height: "10vh",
        }}
      >
        <Toolbar disableGutters sx={{ height: "100%", width: "100%" }}>
          <IconButton
            component={Link}
            to="/"
            edge="start"
            sx={{
              width: "20vh",
              display: { xs: "none", md: "flex" },
              margin: "0 10px",
            }}
          >
            <MyLogo fill="black" stroke="white" />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, idx) => (
                <MenuItem
                  component={Link}
                  to={paths[idx]}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton component={Link} to="/" sx={{ width: "20vh" }}>
              <MyLogo fill="black" stroke="white" />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, idx) => (
              <Button
                component={Link}
                to={paths[idx]}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton
            aria-label="cart"
            component={Link}
            to="/cart"
            edge="end"
            sx={{ color: "white" }}
          >
            <Badge
              badgeContent={totalItems}
              color="secondary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
