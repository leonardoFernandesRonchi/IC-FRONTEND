import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usersService } from "@/services";
import { useAuth } from "@/hooks/useAuth";

const Main = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleCloseMenu();
    await logout();
    navigate("/");
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#bb1212" }}>
        <Toolbar sx>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sistema
          </Typography>

          {/* Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Início
            </Button>

            <Button color="inherit" component={Link} to="/analises">
              Análises
            </Button>

            <Button color="inherit" onClick={handleLogout}>
              Deslogar
            </Button>
          </Box>

          {/* Mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseMenu}>
                Início
              </MenuItem>

              <MenuItem
                component={Link}
                to="/analises"
                onClick={handleCloseMenu}
              >
                Análises
              </MenuItem>

              <MenuItem onClick={handleLogout}>Deslogar</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Main;
