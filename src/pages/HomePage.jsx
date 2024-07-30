import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import {
  Typography,
  CardMedia,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { Colors } from "../styles/theme/theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CarRentalIcon from "@mui/icons-material/CarRental";
import bannerImage from "../assets/logo.png"; // Use a suitable banner image for car rentals
import { useAuth } from "../hooks/useAuth"; // Import the useAuth hook

const HomePage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate(); // Hook for navigation
  const { isAuth } = useAuth(); // Use the useAuth hook
  const [selectedCar, setSelectedCar] = useState("");
  const [rentalDays, setRentalDays] = useState(1);
  const bookingRef = useRef(null); // Ref for booking section

  const carModels = [
    {
      name: "Sedan",
      description: "Comfortable and efficient for city drives.",
      rentPerDay: "$40",
      image:
        "https://stimg.cardekho.com/images/car-images/large/Hyundai/Verna/9744/1694602499482/front-left-side-47.jpg",
    },
    {
      name: "SUV",
      description: "Perfect for off-road adventures and more space.",
      rentPerDay: "$60",
      image:
        "https://imgd.aeplcdn.com/600x337/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
    },
    {
      name: "Convertible",
      description: "Enjoy the open air with this stylish option.",
      rentPerDay: "$80",
      image:
        "https://imgd.aeplcdn.com/600x337/n/cw/ec/149075/z4-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
    },
    {
      name: "Luxury",
      description: "Experience the ultimate in comfort and style.",
      rentPerDay: "$120",
      image:
        "https://imgd.aeplcdn.com/600x337/n/cw/ec/153319/range-rover-velar-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
    },
    {
      name: "Coupe",
      description: "Sporty and stylish, perfect for a night out.",
      rentPerDay: "$70",
      image:
        "https://www.drivespark.com/car-image/640x480x100/car/10521656-mercedes_amg_glc_43_4matic_coupe.jpg",
    },
    {
      name: "Hatchback",
      description: "Compact and efficient for urban driving.",
      rentPerDay: "$50",
      image:
        "https://imgd.aeplcdn.com/600x337/n/cw/ec/32597/altroz-exterior-right-front-three-quarter-80.jpeg?isig=0&q=80",
    },
    {
      name: "Minivan",
      description: "Spacious and perfect for family trips.",
      rentPerDay: "$90",
      image:
        "https://imgd.aeplcdn.com/600x337/n/cw/ec/135523/eeco-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
    },
    {
      name: "Pickup Truck",
      description: "Durable and rugged for tough terrains.",
      rentPerDay: "$100",
      image:
        "https://imgd.aeplcdn.com/600x337/n/cw/ec/109265/hilux-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
    },
    // New car model
    {
      name: "Electric",
      description: "Eco-friendly and efficient for modern driving.",
      rentPerDay: "$110",
      image:
        "https://media.zigcdn.com/media/model/2023/Sep/tata-nexon-ev_360x240.jpg",
    },
  ];
  const handleBookNowClick = () => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConfirmBookingClick = () => {
    if (!isAuth) {
      alert("Please log in first to rent a car.");
      return;
    }

    const car = carModels.find((model) => model.name === selectedCar);
    if (car) {
      navigate("/booking", { state: { car, days: rentalDays } });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #cbd5e1, #e2e8f0, #f1f5f9, #f8fafc)",
        padding: "2rem",
        marginBottom: "3rem"
      }}
    >
      {/* Hero Section */}
      <Grid container spacing={4} sx={{ mb: "3rem" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              borderRadius: "15px",
              padding: "2rem",
              color: Colors.black,
              boxShadow: `0px 4px 10px ${Colors.shadow}`,
              maxWidth: "500px",
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: "1rem" }}>
              Welcome to Quick Car Rent
            </Typography>
            <Typography variant="h5" sx={{ mb: "2rem" }}>
              Rent Your Dream Car with Us!
            </Typography>
            <Typography variant="h6" sx={{ mb: "2rem" }}>
              Choose from our wide range of vehicles and enjoy a smooth ride!
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: Colors.primary,
                "&:hover": { backgroundColor: Colors.secondaryLight },
              }}
              onClick={handleBookNowClick} // Scroll to booking section
            >
              Book Now
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            component="img"
            sx={{
              borderRadius: "15px",
              boxShadow: `0px 4px 10px ${Colors.shadow}`,
              width: "120%",
              maxWidth: "700px",
              height: "auto",
            }}
            src={bannerImage}
            alt="Car Rental Banner"
            loading="lazy"
          />
        </Grid>
      </Grid>

      {/* Car Models Section */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: Colors.primary,
          mb: "3rem",
          fontWeight: "bold",
        }}
      >
        Our Car Models
      </Typography>
      <Grid container spacing={4}>
        {carModels.map((model, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "15px",
                boxShadow: `0px 4px 10px ${Colors.shadow}`,
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  transform: "scale(1.03)",
                  transition: "transform 0.3s",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={model.image}
                alt={model.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  backgroundColor: Colors.primaryLight,
                  color: Colors.white,
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{model.name}</Typography>
                <Typography variant="body2">{model.description}</Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Rent Per Day: {model.rentPerDay}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Section */}
      <Box
        ref={bookingRef} // Attach the ref here
        id="booking"
        sx={{
          marginTop: "4rem",
          padding: "2rem",
          backgroundColor: Colors.primaryLight,
          borderRadius: "15px",
          boxShadow: `0px 4px 10px ${Colors.shadow}`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#ffffff",
            mb: "2rem",
            fontWeight: "bold",
          }}
        >
          Book Your Car
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <TextField
            select
            label="Select Car Model"
            variant="outlined"
            sx={{ width: "100%", maxWidth: "400px" }}
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value=""> </option>
            {carModels.map((model, index) => (
              <option key={index} value={model.name}>
                {model.name}
              </option>
            ))}
          </TextField>
          <TextField
            label="Rental Duration (days)"
            type="number"
            variant="outlined"
            sx={{ width: "100%", maxWidth: "400px" }}
            value={rentalDays}
            onChange={(e) => setRentalDays(e.target.value)}
          />
          <Button
            type="button"
            variant="contained"
            endIcon={<CarRentalIcon />}
            sx={{
              backgroundColor: Colors.secondary,
              "&:hover": { backgroundColor: Colors.secondaryLight },
            }}
            onClick={handleConfirmBookingClick} // Handle click to redirect
          >
            Confirm Booking
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
