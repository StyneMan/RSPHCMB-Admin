import { Add } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { CardActionArea, Divider } from "@mui/material";
import CustomDialog from "../../../../components/dialogs/custom-dialog";
import DeleteDialog from "../../../../components/dialogs/custom-dialog";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import Box from "@mui/system/Box";
import { db, doc, deleteDoc } from "../../../../../data/firebase";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import EditServiceForm from "../../../../forms/services/edit_service_form";
import CreateAdminForm from "../../../../forms/users/add_user";
import { useSelector } from "react-redux";
import UsersTable from "../../../../components/misc/table/users_table";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: "auto",
    minHeight: 275,
    minWidth: 320,
    alignItems: "center",
  },
  cardMedia: {
    height: 156,
    width: "100%",
  },
  subRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
  },
  lhsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
  avatar: {
    height: 36,
    width: 36,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    padding: 4,
  },
}));

const UserCard = (props) => {
  const { item } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const deleteService = async () => {
    setOpenDelete(false);

    try {
      await deleteDoc(doc(db, "users", "" + item?.id));
      enqueueSnackbar(`User deleted successfully`, {
        variant: "success",
      });
    } catch (error) {
      console.log("ERR: Del: ", error);
      enqueueSnackbar(`User not deleted. Try again`, {
        variant: "error",
      });
    }
  };

  const deleteBody = (
    <div>
      <Typography variant="body2" gutterBottom>
        {`Are you sure you want to delete ${item?.firstname} ${item?.lastname}?`}
      </Typography>
      <br />
      <div className={classes.subRow}>
        <Button
          size="small"
          variant="contained"
          style={{ marginRight: 4 }}
          onClick={() => setOpenDelete(false)}
        >
          Cancel
        </Button>

        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={deleteService}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <CustomDialog
        open={open}
        title="Update User Information"
        handleClose={() => setOpen(false)}
        bodyComponent={
          <EditServiceForm
            setOpen={setOpen}
            img={item?.image}
            title={item?.title}
            id={item?.id}
            body={item?.body}
            summary={item?.summary}
          />
        }
      />
      <DeleteDialog
        open={openDelete}
        title="Delete Service"
        handleClose={() => setOpenDelete(false)}
        bodyComponent={deleteBody}
      />
      <Card elevation={3} className={classes.root}>
        <div className={classes.rowHeader}>
          <div className={classes.lhsRow}>
            <Typography variant="body2" fontSize={14}>
              {item?.title}
            </Typography>
          </div>
          <div className={classes.subRow}>
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => setOpen(true)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => setOpenDelete(true)}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
        <CardActionArea
          onClick={() =>
            history.push({
              pathname: "/dashboard/service/" + item?.id,
              state: {
                title: item?.title,
                image: item?.image,
                body: item?.body,
                summary: item?.summary,
                date: item?.createdAt,
                id: item?.id,
              },
            })
          }
        >
          <CardMedia image={item?.image} className={classes.cardMedia} />
          <Divider />
          <div className={classes.row}>
            <Typography
              fontSize={16}
              color="black"
              paddingLeft={1}
              textAlign="start"
              fontWeight="bold"
            >
              {item?.title?.length > 75
                ? item?.title?.substring(0, 75) + "..."
                : item?.title}
            </Typography>
          </div>
          <Typography
            justifyContent="stretch"
            textAlign="left"
            gutterBottom
            fontSize={12}
            color="black"
            paddingLeft={1}
            paddingBottom={1}
          >
            {item?.summary}
          </Typography>
        </CardActionArea>
      </Card>
    </>
  );
};

const User = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const { userData } = useSelector((state) => state.user);

  return (
    <div>
      <CustomDialog
        open={open}
        title="Add New User"
        handleClose={() => setOpen(false)}
        bodyComponent={<CreateAdminForm setOpen={setOpen} />}
      />

      <div className={classes.row}>
        <div className={classes.lhsRow}>
          <Typography variant="h6" color="blue" fontSize={21}>
            Users
          </Typography>
        </div>
        <Box
          display={"flex"}
          flexDirection="row"
          justifyContent="end"
          alignItems={"center"}
        >
          <Button
            startIcon={<Add />}
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add User
          </Button>
        </Box>
      </div>
      <br />
      <div>
        <UsersTable list={userData} />
      </div>

      {/* <div>
        {userData && (
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {userData?.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <UserCard item={item} />
              </Grid>
            ))}
          </Grid>
        )}
        {usersList?.length < 1 && (
          <div className={classes.main}>
            <div style={{ marginTop: "auto" }}>
              <CloudOffIcon fontSize="large" />
              <Typography>No records found</Typography>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default User;
