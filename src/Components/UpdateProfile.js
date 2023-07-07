import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "../Config/Endpoints";
import { getUser } from "../Utils/AppExtensions";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const user = getUser()

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [mobileError, setmobileError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstNameError(false);
    setmobileError(false);

    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");

    if (firstName) {
      const editData = {
        first_name: firstName,
        last_name: lastName,
      };

      axios
        .put(updateProfile(user.id), editData)
        .then((response) => {
          console.log(response);
          navigate(-1);
          toast.success("User Edited Successfully!");
          sessionStorage.setItem('user', JSON.stringify({ ...user, first_name: firstName, last_name: lastName }))
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }

    if (firstName === "") setFirstNameError(true);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <div>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <Button onClick={() => navigate(-1)} variant="outlined">
                  <KeyboardBackspaceSharpIcon />
                </Button>
              </Grid>
              <Grid item>
                <p className="heading">
                  Update Profile: {user.first_name + " " + user.last_name}
                </p>
              </Grid>
            </Grid>
          </div>
          <div>
            <Button
              onClick={() => navigate(-1)}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>
        </Stack>
      </div>

      <Paper sx={{ p: 3, minWidth: 500 }}>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              placeholder="Enter your first name"
              label="First Name"
              defaultValue={user.first_name}
              autoFocus
              error={firstNameError}
              helperText={firstNameError ? "First Name is mandatory" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              defaultValue={user.last_name}
              placeholder="Enter your last name"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobile"
              defaultValue={user.phone_number ? user.phone_number : "NA"}
              placeholder="Enter your Mobile Number"
              disabled
              error={mobileError}
              helperText={
                mobileError
                  ? "Mobile number is mandatory and must be 10 digits"
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              defaultValue={user.email}
              placeholder="Enter your Email id"
              disabled
              error={mobileError}
              helperText={
                mobileError
                  ? "Mobile number is mandatory and must be 10 digits"
                  : ""
              }
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
