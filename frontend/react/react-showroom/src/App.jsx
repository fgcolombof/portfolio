import { Link, Route, Routes } from "react-router-dom";
import NavBar from "./common/NavBar";
import Home from "./components/Home";
import ProfileForm from "./components/UncontrolledForm";
import WikipediaSearch from "./components/WikipediaSearch";
import Chronometer from "./components/Chronometer";
import WorldClock from "./components/World-Clock";
import FavoriteListZus from "./components/FavoriteListZus";
import CounterZustand from "./components/CounterZustand";
import FavoritesListRedux from "./components/FavoriteListRedux";
("./components/WikipediaSearch");
import QuizApp from "./quiz/App";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter-zus" element={<CounterZustand />} />
        <Route path="/uncontrolled-form" element={<ProfileForm />} />
        <Route path="/search" element={<WikipediaSearch />} />
        <Route path="/chrono" element={<Chronometer />} />
        <Route path="/wc" element={<WorldClock />} />
        <Route path="/fav-list-zus" element={<FavoriteListZus />} />
        <Route path="/fav-list-redux" element={<FavoritesListRedux />} />
        <Route path="/quiz-app" element={<QuizApp />} />
      </Routes>
    </>
  );
}

export default App;
