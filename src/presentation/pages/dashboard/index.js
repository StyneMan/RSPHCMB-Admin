import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles, useTheme } from "@mui/styles";
import { Switch, Route } from "react-router-dom";

import Drawer1 from "../../components/dashboard/drawer/Drawer1";
import Drawer2 from "../../components/dashboard/drawer/Drawer2";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Overview from "./tabs";
import Home from "./tabs/home";
import { Redirect } from "react-router-dom";
import About from "./tabs/about";
import Services from "./tabs/services";
import Resources from "./tabs/resources";
import Contact from "./tabs/contact";
import Banner from "./tabs/home/banner";
import { setPermSecData } from "../../../data/redux/slice/perm_sec";
import { setTeamData } from "../../../data/redux/slice/team";
import { setContact } from "../../../data/redux/slice/contact";
import { setUserData } from "../../../data/redux/slice/user";
import {
  setFeaturedService,
  setSevicesData,
} from "../../../data/redux/slice/services";
import {
  setHealthAccessData,
  setBuildingCultureData,
} from "../../../data/redux/slice/homepage";
import { setData } from "../../../data/redux/slice/rsphcmb";
import { setWDCData } from "../../../data/redux/slice/wdc";
import { setLGAsData } from "../../../data/redux/slice/lga";
import { setEnquiriesData } from "../../../data/redux/slice/enquiry";
import {
  onSnapshot,
  db,
  doc,
  collection,
  query,
} from "../../../data/firebase/";
import { useDispatch } from "react-redux";
import PermSec from "./tabs/home/perm_sec";
import HealthAccess from "./tabs/home/health_access";
import BuildingCulture from "./tabs/home/building_culture";
import Covid19Section from "./tabs/home/covid19_section";
import RSPHCMB from "./tabs/about/rsphcmb";
import WhoWeAreContent from "../../forms/about-rsphcmb/who_we_are_content";
import WhoWeAreImage from "../../forms/about-rsphcmb/who_we_are_img";
import VisionSection from "../../forms/about-rsphcmb/vision_section";
import LGAs from "./tabs/about/lga";
import LGAItem from "./tabs/about/components/lga_item";
import WDC from "./tabs/about/wdc";
import UpdateWDC from "../../forms/wdc/update_wdc";
import Downloads from "./tabs/resources/downloads";
import Reports from "./tabs/resources/reports";
import GovernorSection from "../../forms/about-rsphcmb/governor_section";
import User from "./tabs/users";
import Enquiries from "./tabs/enquiries";

const drawerWidth = 270;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: "white",
    color: "black",
    boxShadow: "none",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    backgroundColor: "#F8F9FA",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentPadding: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 15,
    margin: "auto",
  },
}));

function Dashboard() {
  // const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openSignoutBackDrop, setOpenSignoutBackDrop] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleBackdrop = (value) => {
    setOpenSignoutBackDrop(value);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    onSnapshot(doc(db, "perm-sec", "info"), (doc) => {
      // console.log("Current data: ", doc.data());
      dispatch(setPermSecData(doc.data()));
    });

    onSnapshot(doc(db, "home", "health-access"), (doc) => {
      // console.log("Current data: ", doc.data());
      dispatch(setHealthAccessData(doc.data()));
    });

    onSnapshot(doc(db, "home", "building-culture"), (doc) => {
      // console.log("Current data: ", doc.data());
      dispatch(setBuildingCultureData(doc.data()));
    });

    onSnapshot(doc(db, "about", "rsphcmb"), (doc) => {
      dispatch(setData(doc.data()));
    });

    onSnapshot(doc(db, "contents", "wdc"), (doc) => {
      // console.log("Current data: ", doc.data());
      dispatch(setWDCData(doc.data()));
    });

    onSnapshot(doc(db, "contact", "data"), (doc) => {
      // console.log("Current data: ", doc.data());
      dispatch(setContact(doc.data()));
    });

    onSnapshot(doc(db, "featured", "service"), (doc) => {
      // console.log("Current data: ", doc.data());
      dispatch(setFeaturedService(doc.data()));
    });

    const servicesQuery = query(collection(db, "services"));
    onSnapshot(servicesQuery, (querySnapshot) => {
      const services = [];
      querySnapshot.forEach((doc) => {
        services.push(doc.data());
      });
      dispatch(setSevicesData(services));
    });

    const usersQuery = query(collection(db, "users"));
    onSnapshot(usersQuery, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      dispatch(setUserData(users));
    });

    const teamQuery = query(collection(db, "team-members"));
    onSnapshot(teamQuery, (querySnapshot) => {
      const teams = [];
      querySnapshot.forEach((doc) => {
        teams.push(doc.data());
      });
      dispatch(setTeamData(teams));
    });

    const LGAsQuery = query(collection(db, "lgas"));
    onSnapshot(LGAsQuery, (querySnapshot) => {
      const lgas = [];
      querySnapshot.forEach((doc) => {
        lgas.push(doc.data());
      });
      dispatch(setLGAsData(lgas));
    });

    const enquiriesQuery = query(collection(db, "enquiries"));
    onSnapshot(enquiriesQuery, (querySnapshot) => {
      const enquiries = [];
      querySnapshot.forEach((doc) => {
        enquiries.push(doc.data());
      });
      dispatch(setEnquiriesData(enquiries));
    });
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <Backdrop style={{ zIndex: 5000 }} open={openSignoutBackDrop}>
        <CircularProgress
          size={90}
          thickness={3.0}
          style={{ color: "white" }}
        />
      </Backdrop>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {1 > 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  style={{ margin: "auto", paddingRight: 3 }}
                ></Typography>
              </div>
            )}
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              //onClick={handleNotificationMenuOpen}
            ></IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <SearchIcon style={{ color: theme.palette.secondary.main }} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer1
            setMobileOpen={setMobileOpen}
            mobileOpen={mobileOpen}
            handleBackdrop={handleBackdrop}
            drawerVariant="temporary"
            anchor="left"
            handleDrawerToggle={handleDrawerToggle}
            // window={window}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer2 handleBackdrop={handleBackdrop} />
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* Main switch routing here */}
        <div className={classes.contentPadding}>
          <Switch>
            <Redirect exact from="/dashboard" to="/dashboard/overview" />
            <Route path="/dashboard/overview" exact={true}>
              <Overview />
            </Route>

            <Route path="/dashboard/home" exact>
              <Home />
            </Route>
            <Route path="/dashboard/home/banner_slides">
              <Banner />
            </Route>
            <Route path="/dashboard/home/perm_sec">
              <PermSec />
            </Route>
            <Route path="/dashboard/home/health_access">
              <HealthAccess />
            </Route>
            <Route path="/dashboard/home/building_culture">
              <BuildingCulture />
            </Route>
            <Route path="/dashboard/home/covid19">
              <Covid19Section />
            </Route>

            <Route path="/dashboard/about" exact>
              <About />
            </Route>
            <Route path="/dashboard/about/rsphcmb" exact>
              <RSPHCMB />
            </Route>
            <Route path="/dashboard/about/rsphcmb/who_we_are_content" exact>
              <WhoWeAreContent />
            </Route>
            <Route path="/dashboard/about/rsphcmb/who_we_are_image" exact>
              <WhoWeAreImage />
            </Route>
            <Route path="/dashboard/about/rsphcmb/vision_mission_edit" exact>
              <VisionSection />
            </Route>
            <Route path="/dashboard/about/rsphcmb/governor_edit" exact>
              <GovernorSection />
            </Route>
            <Route path="/dashboard/about/lga" exact>
              <LGAs />
            </Route>
            <Route path="/dashboard/about/lga/:id" exact>
              <LGAItem />
            </Route>
            <Route path="/dashboard/about/wdc" exact>
              <WDC />
            </Route>
            <Route path="/dashboard/about/wdc/edit" exact>
              <UpdateWDC />
            </Route>

            <Route path="/dashboard/services" exact>
              <Services />
            </Route>

            <Route path="/dashboard/resources" exact>
              <Resources />
            </Route>
            <Route path="/dashboard/resources/reports" exact>
              <Reports />
            </Route>
            <Route path="/dashboard/resources/downloads" exact>
              <Downloads />
            </Route>

            <Route path="/dashboard/contact" exact>
              <Contact />
            </Route>

            <Route path="/dashboard/users" exact>
              <User />
            </Route>

            <Route path="/dashboard/enquiries" exact>
              <Enquiries />
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIrMjM0ODA3MTIzOTkxNCIsImlhdCI6MTY1MDI3NzYzMywiZXhwIjoxNjUwMzY0MDMzfQ.lJZeZbi8UM-2g16fnXLRS15BGDerpCTFQJH47_ZYtlw
