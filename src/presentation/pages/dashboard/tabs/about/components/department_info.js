import { Add, ArrowBackIosNew, Delete } from "@mui/icons-material";
import {
  Button,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import CustomDialog from "../../../../../components/dialogs/custom-dialog";
import DeleteDialog from "../../../../../components/dialogs/custom-dialog";
import AddFunctionForm from "../../../../../forms/department/add_function";
import { onSnapshot, doc, db } from "../../../../../../data/firebase";

const DepartmentInfo = () => {
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [functions, setFunctions] = React.useState([]);

  React.useEffect(() => {
    onSnapshot(doc(db, "departments", "" + location?.state?.id), (doc) => {
      // console.log("Current data: ", doc.data());
      setFunctions(doc.data()?.functions);
    });
  }, [functions, location?.state?.id]);

  return (
    <div>
      <CustomDialog
        open={open}
        title="Add Department Function"
        handleClose={() => setOpen(false)}
        bodyComponent={
          <AddFunctionForm
            id={location?.state?.id}
            list={location?.state?.functions}
            setOpen={setOpen}
          />
        }
      />
      <DeleteDialog
        open={open2}
        title="Delete Department Function"
        handleClose={() => setOpen2(false)}
        bodyComponent={
          <div>
            <Typography>
              Are you sure you want to delete this function?
            </Typography>
            <Box
              display="flex"
              flexDirction="row"
              justifyContent={"end"}
              alignItems="center"
            >
              <Button variant="contained" onClick={() => setOpen2(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "red" }}
                onClick={() => setOpen2(false)}
              >
                Delete
              </Button>
            </Box>
          </div>
        }
      />
      <Container>
        <Box
          py={2}
          display="flex"
          flexDirction="row"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Button
            startIcon={<ArrowBackIosNew />}
            variant="text"
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </Box>
        <Typography variant="h5" gutterBottom={true}>
          {location.state?.title}{" "}
        </Typography>
        <Typography gutterBottom={true}>
          {location.state?.description}{" "}
        </Typography>
        <br />
        <Divider />
        <br />
        <Box
          display={"flex"}
          flexDirection="row"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Typography variant="h6">Functions of Department</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            Add Function
          </Button>
        </Box>
        <Typography
          gutterBottom
          hidden={(location?.state?.functions || functions)?.length < 1}
        >
          Below are the roles/functions of the department
        </Typography>
        <br />
        {functions?.map((item, index) => (
          <Container key={index}>
            <Box
              display={"flex"}
              flexDirection="row"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "black",
                }}
              />
              <Box
                display={"flex"}
                flexDirection="row"
                justifyContent={"start"}
                alignItems="center"
              >
                <Typography pl={2} flex={1}>
                  {item?.text}
                </Typography>
                <IconButton onClick={() => setOpen2(true)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </Container>
        ))}
        {functions?.length < 1 && (
          <Box
            padding={10}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems={"center"}
          >
            <Typography>No record found</Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default DepartmentInfo;
