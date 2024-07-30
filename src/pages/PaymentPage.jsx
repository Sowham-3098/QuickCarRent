import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
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

     
         
            navigate('/booking-history');
         
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
        padding: "2rem",
        backgroundColor: Colors.background,
        marginTop: "3rem",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: "2rem", fontWeight: "bold" }}>
        Payment
      </Typography>

      <Typography variant="h6" sx={{ mb: "1rem" }}>
        Car Model: {car.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: "1rem" }}>
        Total Payment: ${totalPayment}
      </Typography>
      <Typography variant="body1" sx={{ mb: "1rem" }}>
        Rental Duration: {days} day(s)
      </Typography>
      <Typography variant="body1" sx={{ mb: "1rem" }}>
        Pickup Date: {pickupDate}
      </Typography>
      <Typography variant="body1" sx={{ mb: "1rem" }}>
        Location: {locationDetails}
      </Typography>
      <Typography variant="body1" sx={{ mb: "1rem" }}>
        User: {userDetails.name}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ display: "block", margin: "auto", mt: "2rem", borderRadius: "20px" }}
        onClick={handlePopupOpen}
      >
        Pay Now
      </Button>

      {/* Confirmation Popup */}
      {isPopupOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: Colors.background,
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: `0px 4px 10px ${Colors.shadow}`,
          }}
        >
          <Typography variant="h6" sx={{ mb: "1rem" }}>
            Confirm Payment
          </Typography>
          <Typography variant="body1" sx={{ mb: "1rem" }}>
            Are you sure you want to proceed with the payment?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePopupClose(true)}
            sx={{ mr: "1rem" }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handlePopupClose(false)}
          >
            Cancel
          </Button>
        </Box>
      )}

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
          }}
        >
          <Typography variant="h6" sx={{ mb: "1rem" }}>
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
