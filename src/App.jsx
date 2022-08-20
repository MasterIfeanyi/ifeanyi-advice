import './App.css';
import Advice from "./features/advice/Advice"
import Header from "./components/Header"
import Footer from "./components/Footer"


function App() {
  return (
    <main className="App">
      <Header />
      <Advice />
      <Footer />
    </main>
  );
}

export default App;
