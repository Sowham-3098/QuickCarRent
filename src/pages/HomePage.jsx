


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
  const vehicleModelsRef = useRef(null); // Ref for vehicle models section

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
    
    
    {
      name: "Sports Car",
      description: "High-performance and stylish, perfect for speed enthusiasts.",
      rentPerDay: "$150",
      image:
        "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Lamborghini-Revuelto-010220241506.jpg",
    },
    {
      name: "Bike",
      description: "Fast and nimble, perfect for quick rides and city commutes.",
      rentPerDay: "$30",
      image:
        "https://stat.overdrive.in/wp-content/odgallery/2022/08/63812_2022_Honda_CB300F_DLX_PRO_1_468x263.jpg",
    },
    {
      name: "Classic",
      description: "Vintage car for a nostalgic driving experience.",
      rentPerDay: "$130",
      image:
        "https://imgd.aeplcdn.com/1280x720/cw/ec/32392/Aston-Martin-DB11-Exterior-115405.jpg?wm=0",
    },
  ];


  const handleBookNowClick = () => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVehicleClick = () => {
    if (vehicleModelsRef.current) {
      vehicleModelsRef.current.scrollIntoView({ behavior: "smooth" });
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
        background: "linear-gradient(to bottom, #e2e8f0, #f1f5f9, #f8fafc)",
        padding: "2rem",
        marginBottom: "3rem",
        [theme.breakpoints.down("sm")]: {
          padding: "1rem",
          marginTop: "6rem"
        },
      }}
    >
      {/* Hero Section */}
      <Grid container spacing={4} sx={{ mb: "2rem" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            [theme.breakpoints.down("sm")]: {
              textAlign: "center",
            },
          }}
        >
          <Box
            sx={{
              borderRadius: "15px",
              padding: "2rem",
              color: Colors.black,
              boxShadow: `0px 4px 10px ${Colors.shadow}`,
              maxWidth: "500px",
              [theme.breakpoints.down("sm")]: {
                maxWidth: "100%",
                padding: "1rem",
              },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: "1rem",
                fontFamily: "'Roboto', sans-serif",
                fontSize: matches ? "1.5rem" : "2.5rem",
              }}
            >
              Welcome to Quick Car Rent
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: "2rem",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: matches ? "1rem" : "1.5rem",
              }}
            >
              Rent Your Dream Car with Us!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: "2rem",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: matches ? "0.875rem" : "1.125rem",
              }}
            >
              Choose from our wide range of vehicles and enjoy a smooth ride!
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: matches ? "column" : "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: Colors.primary,
                  "&:hover": { backgroundColor: Colors.secondaryLight },
                }}
                onClick={handleVehicleClick}
              >
                Vehicle Models
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: Colors.primary,
                  "&:hover": { backgroundColor: Colors.secondaryLight },
                }}
                onClick={handleBookNowClick}
              >
                Book Now
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              borderRadius: "15px",
              boxShadow: `0px 4px 10px ${Colors.shadow}`,
              width: "100%",
              maxWidth: "700px",
              height: "auto",
              [theme.breakpoints.down("sm")]: {
                width: "90%",
              },
            }}
            src={bannerImage}
            alt="Car Rental Banner"
            loading="lazy"
          />
        </Grid>
      </Grid>

      {/* Car Models Section */}
      <Typography
        ref={vehicleModelsRef}
        variant="h4"
        sx={{
          textAlign: "center",
          color: Colors.primary,
          mb: "2rem",
          fontWeight: "bold",
          fontFamily: "'Roboto', sans-serif",
          fontSize: matches ? "1.5rem" : "2rem",
        }}
      >
        Our Car Models
      </Typography>
      <Grid container spacing={4}>
        {carModels.map((model, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                background: "linear-gradient(to bottom, #f97316, #fb923c, #b45309, #f97316)",
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
                loading="lazy"
              />
              <CardContent sx={{ padding: "1rem" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    mb: "0.5rem",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: matches ? "1rem" : "1.25rem",
                  }}
                >
                  {model.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: matches ? "0.875rem" : "1rem" }}
                >
                  {model.description}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{
                    mt: "0.5rem",
                    fontWeight: "bold",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: matches ? "1rem" : "1.25rem",
                  }}
                >
                  Rent Per Day: {model.rentPerDay}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.primary,
                  color: Colors.white,
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
              >
                <CarRentalIcon />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Section */}
      <Typography
        ref={bookingRef}
        variant="h4"
        sx={{
          textAlign: "center",
          color: Colors.primary,
          mt: "2rem",
          mb: "2rem",
          fontWeight: "bold",
          fontFamily: "'Roboto', sans-serif",
          fontSize: matches ? "1.5rem" : "2rem",
        }}
      >
        Book Your Car
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          boxShadow: `0px 4px 10px ${Colors.shadow}`,
          background: "linear-gradient(to bottom,  #fb923c, #fdba74, #fed7aa)",
          borderRadius: "15px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <TextField
          select
          label="Select Car"
          fullWidth
          value={selectedCar}
          onChange={(e) => setSelectedCar(e.target.value)}
          sx={{ mb: "1rem" }}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          {carModels.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </TextField>
        <TextField
          type="number"
          label="Number of Days"
          value={rentalDays}
          onChange={(e) => setRentalDays(e.target.value)}
          fullWidth
          sx={{ mb: "1rem" }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: Colors.primary,
            "&:hover": { backgroundColor: Colors.secondaryLight },
          }}
          onClick={handleConfirmBookingClick}
        >
          Confirm Booking
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
