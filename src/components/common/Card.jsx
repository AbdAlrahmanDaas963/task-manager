import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { updateTodo, deleteTodo } from "../../api/todosApi";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

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

function Card({ id, title, description, status }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [open, setOpen] = useState(false);

  const queryClinet = useQueryClient();
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("title", newTitle);
    console.log("description", newDescription);
    console.log("status", newStatus);

    updateTodoMutation.mutate({
      id,
      title: newTitle === "" ? title : newTitle,
      description: newDescription === "" ? description : newDescription,
      status: newStatus === "" ? status : newStatus,
    });

    setNewTitle("");
    setNewDescription("");
    setNewStatus("");
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewStatus(value);
  };
  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClinet.invalidateQueries("todos");
    },
  });
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClinet.invalidateQueries("todos");
    },
  });

  return (
    <div className="card">
      <div className="card-head">
        <div>{title}</div>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button
                sx={{ width: "10px", minWidth: "10px" }}
                size="small"
                variant="text"
                {...bindTrigger(popupState)}
              >
                <MoreVertIcon />
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem>
                  <Button
                    onClick={() => {
                      popupState.close();
                      handleOpen();
                    }}
                  >
                    Edit
                  </Button>
                </MenuItem>
                <MenuItem color={"error"}>
                  <Button
                    onClick={() => {
                      popupState.close();
                      deleteTodoMutation.mutate({ id });
                    }}
                    color={"error"}
                  >
                    Delete
                  </Button>
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>

      <div className="desc">{description}</div>

      {/* ---------------------------- */}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Task
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Title
            </Typography>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue={title}
              variant="filled"
              size="small"
              placeholder="e.g. Take coffee break"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Description
            </Typography>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue={description}
              variant="filled"
              size="small"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
              multiline
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Status
            </Typography>
            <div>
              <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                  displayEmpty
                  defaultValue={status}
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
                      style={getStyles(name, newStatus, theme)}
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
              }}
              variant="outlined"
              onClick={handleSubmit}
            >
              Update Task
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Card;
