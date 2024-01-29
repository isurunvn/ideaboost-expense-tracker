import React from 'react';
import { makeStyles, createStyles, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ResponsiveDrawer from '../navbar';
import Dashboard from '../dashboard';
import { User } from 'firebase/auth'; 
import { Grid } from '@mui/material';
import { ExpenseList } from '../expenseList';

const drawerWidth = 240;

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//     },
//     appBar: {
//       zIndex: theme.zIndex.drawer + 1,
//     },
//     drawer: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//     drawerPaper: {
//       width: drawerWidth,
//     },
//     content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//     },
//     toolbar: theme.mixins.toolbar,
//   }) as any
// );

const containerStyle: React.CSSProperties = {
  marginTop: '0px', 
};

const drawerPaperStyle: React.CSSProperties = {
  width: drawerWidth,
};

const contentStyle: React.CSSProperties = {
  flexGrow: 1,
  padding: '20px', 
};


interface AppLayoutProps{
    user: User ;
}

const AppLayout: React.FC<AppLayoutProps> = ({user}) => {
  // const classes = useStyles();

  return (
    // <div className={classes.root}>
    //   <CssBaseline />
    //   <AppBar position="fixed" className={classes.appBar}>
    //     <Toolbar>
    //       <Typography variant="h6" noWrap>
    //         Your App Title
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>
    //   <Drawer
    //     className={classes.drawer}
    //     variant="permanent"
    //     classes={{
    //       paper: classes.drawerPaper,
    //     }}
    //   >
    //     <div className={classes.toolbar} />
    //     <List>
    //       <ListItem>
    //         <ResponsiveDrawer />            
    //       </ListItem>
    //     </List>
    //   </Drawer>
    //   <main className={classes.content}>
    //     <div className={classes.toolbar} />
    //     <Container>
    //       <Paper elevation={3}>
    //         {/* Content Area */}
    //         <Typography variant="h5"><Dashboard user={user} /></Typography>
    //         {/* Add your content here */}
    //       </Paper>
    //     </Container>
    //   </main>
    // </div>

    <div style={{ display: 'flex', margin: '0', padding: '0' }}>
      <CssBaseline />
      {/* <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Your App Title
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        variant="permanent"
        anchor="left"
        style={drawerPaperStyle}
      >
        <div style={{ marginTop: '0px' }}>
          <List>
            <ListItem>
              <ResponsiveDrawer user = {user} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main style={contentStyle}>
        <Container style={containerStyle}>
          <Paper elevation={3}>
            {/* Content Area */}
            <Typography variant="h5">
              <Dashboard user={user}/>
            </Typography>
            {/* Add your content here */}
          </Paper>
        </Container>
      </main>
    </div>
  );
};

export default AppLayout;
