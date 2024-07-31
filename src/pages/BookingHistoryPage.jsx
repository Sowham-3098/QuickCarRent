import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import { Colors } from '../styles/theme/theme';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useAuth(); // Use the useAuth hook

  useEffect(() => {
    if (isAuth) {
      const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      setBookings(storedBookings);
    } else {
      setOpen(true);
    }
  }, [isAuth]);

  const handleClose = () => {
    setOpen(false);
    navigate('/login'); // Navigate to the login page
  };

  if (!isAuth) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Login Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please log in to view your booking history.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (bookings.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: '4rem' }}>
        No booking history available.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: Colors.background,
        mt: '4rem',
        marginBottom: '4rem',
        height: 'calc(100vh - 6rem)',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', mb: '2rem', fontWeight: 'bold', color: Colors.primary }}>
        Booking History
      </Typography>
      <Grid container spacing={3}>
        {bookings.map((booking, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper sx={{ padding: '1.5rem', mb: '1rem', background: "linear-gradient(to bottom, #3f3f46, #52525b, #71717a)" }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: '0.5rem', color: Colors.primary }}>
                Car Model: {booking.car.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: '0.5rem' }}>
                <strong>Total Payment:</strong> ${booking.totalPayment}
              </Typography>
              <Typography variant="body1" sx={{ mb: '0.5rem' }}>
                <strong>Rental Duration:</strong> {booking.days} day(s)
              </Typography>
              <Typography variant="body1" sx={{ mb: '0.5rem' }}>
                <strong>Pickup Date:</strong> {booking.pickupDate}
              </Typography>
              <Typography variant="body1" sx={{ mb: '0.5rem' }}>
                <strong>Location:</strong> {booking.locationDetails}
              </Typography>
              <Typography variant="body1" sx={{ mb: '0.5rem' }}>
                <strong>User:</strong> {booking.userDetails.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: '0.5rem', fontWeight: 'bold', color: Colors.primary }}>
                <strong>Booking Date:</strong> {new Date(booking.date).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookingHistoryPage;
