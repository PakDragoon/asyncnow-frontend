import { filter } from "lodash"
import { Icon } from "@iconify/react"
import { useState, useEffect } from "react"
import plusFill from "@iconify/icons-eva/plus-fill"
import { Link as RouterLink } from "react-router-dom"
import { Card, Table, Stack, Button, Checkbox, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination, Box, Modal, TextField, MenuItem } from "@mui/material"
import Page from "../components/Page"
import Label from "../components/Label"
import Scrollbar from "../components/Scrollbar"
import SearchNotFound from "../components/SearchNotFound"
import { UserListHead, UserListToolbar, UserMoreMenu } from "../components/_dashboard/user"
import "./User.style.css"

var referralCodes = require("referral-codes")
const axios = require("axios")

// ----------------------------------------------------------------------

const TABLE_HEAD = [{ id: "name", label: "Name", alignRight: false }, { id: "email", label: "Email", alignRight: false }, { id: "company", label: "Company", alignRight: false }, { id: "role", label: "Role", alignRight: false }, { id: "status", label: "Status", alignRight: false }, { id: "" }]
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}
const options = [
  {
    label: "-Select Role-",
    value: "",
  },
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "User",
    value: "User",
  },
]
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map((el) => el[0])
}

export default function User() {
  const [newRole, setNewRole] = useState("")
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newCompany, setNewCompany] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [page, setPage] = useState(0)
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState("asc")
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState("name")
  const [filterName, setFilterName] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [createSuccess, setCreateSuccess] = useState(false)
  const [isFail, setIsFail] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [passStatusOne, setPassStatusOne] = useState(true)
  const [passStatusTwo, setPassStatusTwo] = useState(true)
  const [data, setData] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      }) 
    if(sessionStorage.getItem("deleteSuccess") === "true"){
      setDeleteSuccess(true)
      setTimeout(() => setDeleteSuccess(false), 3000)
    }
    sessionStorage.setItem("deleteSuccess","false")
  }, [data])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      console.log(data)
      const newSelecteds = data.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleNewSubmit = async (event) => {
    event.preventDefault()
    const codeObj = referralCodes.generate({
      count: 1,
      length: 6,
      prefix: `@${newName}/`,
    })
    const codeString = JSON.stringify(codeObj)
    const code = codeString.replace('["', "").replace('"]', "").replace(/\s+/g, "")
    const name = newName
    const email = newEmail
    const company = newCompany
    const password = newPassword
    const role = newRole
    axios({
      method: "post",
      url: "/users",
      data: {
        name,
        email,
        company,
        password,
        code,
        role,
      },
    })
      .then((res) => {
        console.log(res)
        setCreateSuccess(true)
        setTimeout(() => setCreateSuccess(false), 3000)
        setIsValidEmail(false)
        setIsFail(false)
        setCreateSuccess(false)
        setPassStatusOne(true)
        setPassStatusTwo(true)
      })
      .catch((err) => {
        console.log(err.response.data)
        const emailValid = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
        if(!emailValid) {
          setIsValidEmail(true)
          setIsFail(false)
          setCreateSuccess(false)
          setPassStatusOne(true)
          setPassStatusTwo(true)
        }
        else if (password === "password") {
          setIsValidEmail(false)
          setIsFail(false)
          setCreateSuccess(false)
          setPassStatusOne(true)
          setPassStatusTwo(false)
        } else if (password.length < 7) {
          setIsValidEmail(false)
          setIsFail(false)
          setCreateSuccess(false)
          setPassStatusOne(false)
          setPassStatusTwo(true)
        } else {
          setIsValidEmail(false)
          setIsFail(true)
          setCreateSuccess(false)
          setPassStatusOne(true)
          setPassStatusTwo(true)
        }
      })
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0
  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName)
  const isUserNotFound = filteredUsers.length === 0

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button variant="contained" component={RouterLink} onClick={handleOpen} to="#" startIcon={<Icon icon={plusFill} />}>
            New User
          </Button>
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New User
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form id="newUserForm" onSubmit={handleNewSubmit}>
                  <TextField fullWidth id="outlined-basic-name" label="Full Name" variant="outlined" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} size="small" margin="normal" />
                  <TextField fullWidth id="outlined-basic-email" label="Email" variant="outlined" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} size="small" margin="normal" />
                  <TextField fullWidth id="outlined-basic-company" label="Company" variant="outlined" type="text" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} size="small" margin="normal" />
                  <TextField fullWidth id="outlined-basic-password" label="Password" variant="outlined" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} size="small" margin="normal" />
                  <TextField fullWidth id="outlined-basic-role" select label="Role" value={newRole} onChange={(e) => setNewRole(e.target.value)} size="small" margin="normal">
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </form>
                <Button variant="contained" type="submit" name="submit" size="medium" margin="normal" onClick={handleNewSubmit}>Submit</Button>
                <Button className="modal-close-button" variant="contained" type="button" name="close" size="medium" margin="normal" onClick={handleClose}>Close</Button>
              </Typography>
              <div className={`${createSuccess ? "w-form-done" : "none"}`}>
                <div>New user has been created.</div>
              </div>
              <div className={`${isFail ? "w-form-fail" : "none"}`}>
                <div>This email has already registered.</div>
              </div>
              <div className={`${isValidEmail ? "w-form-fail" : "none"}`}>
                <div>This email is not valid.</div>
              </div>
              <div className={`${passStatusOne ? "none" : "w-form-fail"}`}>
                <div>Password should not be less then 7 characters.</div>
              </div>
              <div className={`${passStatusTwo ? "none" : "w-form-fail"}`}>
                <div>Password can't be 'password'.</div>
              </div>
            </Box>
          </Modal>
        </Stack>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} rowCount={data.length} numSelected={selected.length} onRequestSort={handleRequestSort} onSelectAllClick={handleSelectAllClick} />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const isItemSelected = selected.indexOf(row.name) !== -1
                    return (
                      <TableRow key={row.uniqueId} hover tabIndex={-1} role="checkbox" selected={isItemSelected} aria-checked={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, row.name)} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.company}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>
                          <Label variant="ghost" color={row.status ? "success" : "error"}>
                            {row.status ? "Active" : "Banned"}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <UserMoreMenu Id={row._id} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={data} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </Card>
        <div className={`${deleteSuccess ? "w-form-done" : "none"}`}>
          <div>User has been deleted.</div>
        </div>
      </Container>
    </Page>
  )
}
