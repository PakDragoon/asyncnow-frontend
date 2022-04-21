import { Icon } from "@iconify/react"
import { useRef, useState } from "react"
import editFill from "@iconify/icons-eva/edit-fill"
import { Link as RouterLink } from "react-router-dom"
import trash2Outline from "@iconify/icons-eva/trash-2-outline"
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill"
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Box, Typography, Modal, Button, TextField } from "@mui/material"
import PropTypes from "prop-types"
import { confirmAlert } from "react-confirm-alert"
import { useRecoilValue } from "recoil"
import { userDataRecoil } from "../../data/atom"
import "react-confirm-alert/src/react-confirm-alert.css"
import "./UserMoreMenu.style.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const options = [
  {
    label: "-Select Status-",
    value: null,
  },
  {
    label: "Active",
    value: true,
  },
  {
    label: "Banned",
    value: false,
  },
]
const axios = require("axios")

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const { userRole } = useRecoilValue(userDataRecoil)
  const isRole = userRole
  // const isRole = sessionStorage.getItem("isRole")
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  function DeleteUserById(userId) {
    if (isRole === "Super Admin") {
      confirmAlert({
        title: "Confirm to proceed",
        message: "Are you sure to delete this user?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              axios
                .delete(`/user/delete/${userId}`)
                .then((res) => {
                  console.log("Result:", res)
                  sessionStorage.setItem("deleteSuccess","true")
                })
                .catch((error) => {
                  console.log(error)
                })
            },
          },
          {
            label: "No",
          },
        ],
      })
    } else {
      confirmAlert({
        title: "Unauthorized Action",
        message: "You are not authorize to perform this action.",
        buttons: [
          {
            label: "Ok",
          },
        ],
      })
    }
  }
  const handleUpdate = async (event) => {
    if (isRole === "Super Admin") {
      event.preventDefault()
      console.log(status)
      const data = {
        status,
      }
      axios({
        method: "patch",
        url: `/user/update/${props.Id}`,
        data,
      })
        .then((res) => {
          console.log(res)
          setUpdateSuccess(true)
          setTimeout(() => setUpdateSuccess(false), 3000)
        })
        .catch((err) => {
          console.log(err.res.data)
          setFail(true)
          setTimeout(() => setFail(false), 3000)
        })
    } else {
      setOpen(false)
      confirmAlert({
        title: "Unauthorized Action",
        message: "You are not authorize to perform this action.",
        buttons: [
          {
            label: "Ok",
          },
        ],
      })
    }
  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            onClick={() => {
              DeleteUserById(props.Id)
            }}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem component={RouterLink} to="#" sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" onClick={handleOpen} primaryTypographyProps={{ variant: "body2" }} />
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit user status
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleUpdate}>
                  <TextField fullWidth id="outlined-basic-status" select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} size="small" margin="normal">
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </form>
                <Button variant="contained" type="submit" name="submit" size="medium" margin="normal" onClick={handleUpdate}>
                  Change
                </Button>
                <Button className="modal-close-button" variant="contained" type="button" name="close" size="medium" margin="normal" onClick={handleClose}>
                  Close
                </Button>
              </Typography>
              <div className={`${updateSuccess ? "w-form-done" : "none"}`}>
                <div>Status has been changed.</div>
              </div>
              <div className={`${fail ? "w-form-fail" : "none"}`}>
                <div>Oops! Something went wrong.</div>
              </div>
            </Box>
          </Modal>
        </MenuItem>
      </Menu>
    </>
  )
}
UserMoreMenu.propType = {
  Id: PropTypes.Object,
}
