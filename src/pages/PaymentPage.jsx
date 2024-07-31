import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Colors } from '../styles/theme/theme';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!state) {
    return <Typography variant="h6">No payment details available</Typography>;
  }

  const { car, days, totalPayment, userDetails, locationDetails, pickupDate, paymentMethod } = state;

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY, // Replace with your Razorpay key id
        amount: totalPayment * 100, // Amount in paise
        currency: 'INR',
        name: 'Car Rental Service',
        description: 'Booking Payment',
        handler: function (response) {
          // Handle payment response
          console.log(response);
          // Save booking details to local storage
          const bookingDetails = {
            car,
            days,
            totalPayment,
            userDetails,
            locationDetails,
            pickupDate,
            paymentId: response.razorpay_payment_id,
            date: new Date().toISOString(),
          };

          const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
          localStorage.setItem('bookings', JSON.stringify([...allBookings, bookingDetails]));

          setPaymentSuccess(true);
          setTimeout(() => {
            navigate('/booking-history');
          }, 2000);
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        notes: {
          address: locationDetails,
        },
        theme: {
          color: Colors.primary,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = (confirm) => {
    if (confirm) {
      handlePayment();
    }
    setIsPopupOpen(false);
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: Colors.background,
        marginTop: '3rem',
        borderRadius: '10px',
        boxShadow: `0px 4px 20px ${Colors.shadow}`,
        maxWidth: '600px',
        margin: '3rem auto',
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', mb: '2rem', fontWeight: 'bold', color: Colors.primary }}>
        Payment
      </Typography>

      <Box
        sx={{
          background: "linear-gradient(to bottom, #fb923c, #fdba74, #fed7aa)",
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: `0px 4px 10px ${Colors.shadow}`,
        }}
      >
        <Typography variant="h6" sx={{ mb: '1rem' }}>
          Car Model: {car.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: '1rem' }}>
          Total Payment: ${totalPayment}
        </Typography>
        <Typography variant="body1" sx={{ mb: '1rem' }}>
          Rental Duration: {days} day(s)
        </Typography>
        <Typography variant="body1" sx={{ mb: '1rem' }}>
          Pickup Date: {pickupDate}
        </Typography>
        <Typography variant="body1" sx={{ mb: '1rem' }}>
          Location: {locationDetails}
        </Typography>
        <Typography variant="body1" sx={{ mb: '1rem' }}>
          User: {userDetails.name}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            display: 'block',
            margin: 'auto',
            mt: '2rem',
            borderRadius: '20px',
            padding: '0.5rem 2rem',
            backgroundColor: Colors.primary,
            '&:hover': { backgroundColor: Colors.secondaryLight },
          }}
          onClick={handlePopupOpen}
        >
          Pay Now
        </Button>
      </Box>

      {/* Confirmation Popup */}
      <Dialog open={isPopupOpen} onClose={() => handlePopupClose(false)}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to proceed with the payment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlePopupClose(true)} color="primary">
            Confirm
          </Button>
          <Button onClick={() => handlePopupClose(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Success Popup */}
      {paymentSuccess && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'green',
            color: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: `0px 4px 10px ${Colors.shadow}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ mb: '1rem' }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1">
            Your booking has been confirmed.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;
