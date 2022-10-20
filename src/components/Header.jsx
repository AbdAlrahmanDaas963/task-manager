import React, { useState } from "react";

import { nanoid } from "nanoid";

import { addTodo } from "../api/todosApi";
import { useQuery, useMutation, useQueryClient } from "react-query";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#FFFFFF",
  color: "#08070E",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: "7px",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = ["Todo", "Doing", "Done"];
function getStyles(name, status, theme) {
  return {
    fontWeight:
      status.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Header() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const queryClinet = useQueryClient();

  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("title", title);
    console.log("description", description);
    console.log("status", status);

    addTodoMutation.mutate({ id: nanoid(), title, description, status });

    setTitle("");
    setDescription("");
    setStatus("");
  };

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClinet.invalidateQueries("todos");
      handleClose();
    },
  });
  return (
    <AppBar position="static" className="Header">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AdbIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TASKA
          </Typography>
          <Button
            className="add-new"
            variant="filled"
            onClick={handleOpen}
            endIcon={<AddIcon />}
          >
            Add New Task
          </Button>
        </Toolbar>
      </Container>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Task
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Title
            </Typography>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue=""
              variant="filled"
              size="small"
              placeholder="e.g. Take coffee break"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Description
            </Typography>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue=""
              variant="filled"
              size="small"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
              multiline
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Status
            </Typography>
            <div>
              <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                  displayEmpty
                  value={status}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Status</em>;
                    }
                    return selected;
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em>Status</em>
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, status, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button
              sx={{
                marginTop: "16px",
                backgroundColor: "#635EC6",
                color: "#E1E7FE",
                borderColor: "#E1E7FE",
              }}
              variant="outlined"
              onClick={handleSubmit}
            >
              Create Task
            </Button>
          </Box>
        </Modal>
      </div>
    </AppBar>
  );
}

export default Header;
