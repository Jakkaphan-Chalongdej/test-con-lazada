//import logo from "./logo.svg";
import "./App.css";
import Stacks from "./components/Stock";
import { Container } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      <Container style={{ marginTop: "5vw" }}>
        <header>
          <h1><b>Stock</b></h1>
        </header>
        <Stacks />
      </Container>
    </div>
  );
}

export default App;
