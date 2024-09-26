import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";
import Guide from "./components/Guide";

function App() {
  return (
    <div class="container">
      <div className="header">
      <Header />
      </div>
      

      <Game />
      <div className="guide">
      <Guide />
      </div>
      
    </div>
  );
}

export default App;
