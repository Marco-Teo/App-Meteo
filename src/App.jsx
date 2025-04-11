import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./assets/components/Footer";
import NavBar from "./assets/components/NavBar";
import Home from "./assets/components/Home";
import { Container } from "react-bootstrap";
function App() {
  return (
    <Container className="bg-secondary">
      <NavBar />
      <Home />
      <Footer />
    </Container>
  );
}

export default App;
