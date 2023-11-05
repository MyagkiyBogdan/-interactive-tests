import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const MyComponent = () => {
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom mt={4}>
        Який тест ви бажаєте створити?
      </Typography>
      <Container>
        <Link to="/create-tests/1" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 300, my: 1 }}
          >
            Одновибірковоий тест
          </Button>
        </Link>
        <Link to="/create-tests/2" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 300, my: 1 }}
          >
            Багатовибірковий тест
          </Button>
        </Link>
        <Link to="/create-tests/3" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 300, my: 1 }}
          >
            Тест на правильність твердження
          </Button>
        </Link>
        <Link to="/create-tests/4" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 300, my: 1 }}
          >
            Тест з вставками
          </Button>
        </Link>
        <Link to="/create-tests/5" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 300, my: 1 }}
          >
            Тест на встановлення правильної послідовності
          </Button>
        </Link>
        <Link to="/create-tests/6" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 300, my: 1 }}
          >
            Тест на встановлення правильної відповідності
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default MyComponent;
