import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

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

const pages = ["Products", "Home", "Contact", "Turismo"];
const paths = ["/products", "/", "/contact", "/turismo"];

const Navbar = () => {
  const { total_items } = useSelector((state) => state.cart.cart);
  const { isLoadingCart } = useSelector((state) => state.cart);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "background.appBar",
        color: "white",
      }}
    >
      <Container sx={{ height: "80px" }}>
        <Toolbar disableGutters sx={{ height: "100%", width: "100%" }}>
          <IconButton
            component={Link}
            to="/"
            edge="start"
            sx={{
              display: { xs: "none", md: "flex" },
              margin: "0 24px 0 0",
              width: "170px",
            }}
          >
            <MyLogo fill="black" stroke="white" />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, idx) => (
              <Button
                component={Link}
                to={paths[idx]}
                key={page}
                hoverEffect="true"
                sx={{
                  m: "16px 8px",
                  color: "white",
                  "&:hover": {
                    bgcolor: "background.appBar2",
                  },
                }}
              >
                <Typography variant="h6">{page}</Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
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
            <IconButton component={Link} to="/" sx={{ width: "170px" }}>
              <MyLogo fill="black" stroke="white" />
            </IconButton>
          </Box>
          <IconButton
            aria-label="cart"
            component={Link}
            to="/cart"
            color="inherit"
            sx={{ pr: 1 }}
            disabled={isLoadingCart}
          >
            <Badge
              badgeContent={total_items}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              color="secondary"
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
