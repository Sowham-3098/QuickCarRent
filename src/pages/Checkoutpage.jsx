import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Colors } from '../styles/theme/theme';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [locationDetails, setLocationDetails] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [paymentMethod] = useState('razorpay'); // Only Razorpay as the payment method

  if (!state || !state.car) {
    return <Typography variant="h6">No booking details available</Typography>;
  }

  const { car, days, totalPayment } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in userDetails) {
      setUserDetails((prev) => ({ ...prev, [name]: value }));
    } else if (name === 'location') {
      setLocationDetails(value);
    } else if (name === 'pickupDate') {
      setPickupDate(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', {
      state: {
        car,
        days,
        totalPayment,
        userDetails,
        locationDetails,
        pickupDate,
        paymentMethod,
      },
    });
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: Colors.background,
        marginTop: "3rem",
        marginBottom: "3rem",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: "2rem", fontWeight: "bold" }}>
        Enter Details
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: "100%", borderRadius: "15px", boxShadow: `0px 4px 10px ${Colors.shadow}`, p: "2rem" }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: "1rem" }}>
                Car: {car.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: "1rem" }}>
                Total Payment: ${totalPayment}
              </Typography>
              <Typography variant="h6" sx={{ mb: "1rem" }}>User Details</Typography>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                sx={{ mb: "1rem" }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userDetails.email}
                onChange={handleChange}
                sx={{ mb: "1rem" }}
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                value={userDetails.phone}
                onChange={handleChange}
                sx={{ mb: "1rem" }}
              />
              <Typography variant="h6" sx={{ mb: "1rem" }}>Location and Pickup Date</Typography>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={locationDetails}
                onChange={handleChange}
                sx={{ mb: "1rem" }}
              />
              <TextField
                fullWidth
                label="Pickup Date"
                name="pickupDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={pickupDate}
                onChange={handleChange}
                sx={{ mb: "1rem" }}
              />
              <Typography variant="h6" sx={{ mb: "1rem" }}>Payment Method</Typography>
              <Typography variant="body1" sx={{ mb: "1rem" }}>
                Razorpay
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ display: "block", margin: "auto", mt: "2rem", borderRadius: "20px" }}
                onClick={handleSubmit}
              >
                Complete Booking
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "15px", boxShadow: `0px 4px 10px ${Colors.shadow}` }}>
            <CardMedia
              component="img"
              height="400"
              image={car.image} // Display the car image
              alt={car.name}
              sx={{ objectFit: 'cover', borderRadius: "15px 15px 0 0" }}
            />
            <CardContent
              sx={{ backgroundColor: Colors.primaryLight, borderRadius: "0 0 15px 15px", padding: "1rem" }}
            >
              <Typography variant="h6" sx={{ mb: "1rem", textAlign: "center", fontWeight: "bold" }}>
                Booking Summary
              </Typography>
              <Typography variant="body1" sx={{ mb: "1rem" }}>
                Car Model: {car.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: "1rem" }}>
                Total Payment: ${totalPayment}
              </Typography>
              <Typography variant="body1" sx={{ mb: "1rem" }}>
                Rental Duration: {days} day(s)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
