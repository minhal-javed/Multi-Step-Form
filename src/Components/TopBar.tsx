import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";



export const TopBar = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton edge="start" color="secondary" aria-label="menu">
        
        </IconButton>
        <Typography variant="h6">Multi-Step Form</Typography>
      </Toolbar>
    </AppBar>
  );
};
