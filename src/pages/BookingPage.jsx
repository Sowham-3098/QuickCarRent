import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardMedia, CardContent, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Colors } from '../styles/theme/theme';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check for mobile devices

  // Ensure the data is available
  if (!location.state || !location.state.car) {
    return <Typography variant="h6">No car details available</Typography>;
  }

  const { name, description, rentPerDay, image } = location.state.car;
  const days = location.state.days || 1; // Default to 1 day if not provided
  const totalPayment = (parseFloat(rentPerDay.replace('$', '')) * days).toFixed(2);

  return (
    <Box
      sx={{
        padding: isMobile ? '1rem' : '2rem',
        backgroundColor: Colors.background,
        marginTop: isMobile ? '5rem' : '4rem',
        marginBottom: '3rem', // Added margin on top
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: "2rem", fontWeight: "bold" }}>
        Booking Details
      </Typography>
      <Grid container spacing={isMobile ? 1 : 3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: "100%", borderStyle: "ridge", borderColor: "#fdba74", borderWidth: "4px" }}>
            <CardMedia
              component="img"
              height={isMobile ? '250' : '400'}
              image={image}
              alt={name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: "linear-gradient(to bottom, #f97316, #fb923c, #fdba74, #fed7aa)", padding: "1rem", [theme.breakpoints.up('md')]: { padding: '2rem' } }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: '1rem' }}>
                {name}
              </Typography>
              <Typography variant="body1" sx={{ mb: '1rem' }}>
                {description}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: '1rem' }}>
                Rent Per Day: {rentPerDay}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Total Payment for {days} day(s): ${totalPayment}
              </Typography>
              <Box sx={{ textAlign: 'center', mt: '2rem' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: isMobile ? '100%' : 'auto' }} // Full-width button on mobile
                  onClick={() => {
                    // Navigate to CheckoutPage with the details
                    navigate("/checkout", {
                      state: { car: { name, description, rentPerDay, image }, days, totalPayment },
                    });
                  }}
                >
                  Proceed to Payment
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingPage;
