import { useSelector } from "react-redux";
import { useState } from "react";

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

const pages = ["Products", "Home", "Turismo"];
const paths = ["/products", "/", "/turismo"];

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
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <Container maxWidth={false} sx={{ height: "80px", width: "100%", margin: 0 }}>
        <Toolbar disableGutters sx={{ height: "100%", width: "100%" }}>
          <Box
            component={Link}
            to="/"
            edge="start"
            sx={{
              display: { xs: "none", md: "flex" },
              margin: "0 24px",
              width: "150px",
            }}
          >
            <MyLogo fill="black" stroke="white" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, idx) => (
              <Button
                component={Link}
                to={paths[idx]}
                key={page}
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
          <Box 
          component={Link}
          to="/"
           sx={{
            display: { xs: "flex", md: "none"},
            flexGrow: 1
          }}>
            <MyLogo fill="black" stroke="white" width={150} />
          </Box>
          <IconButton
            aria-label="cart"
            component={Link}
            to="/cart"
            color="inherit"
            sx={{ pr: "10px"}}
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
