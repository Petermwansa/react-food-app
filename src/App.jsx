import Header from "./assets/components/Header";
import Meals from "./assets/components/Meals";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  ); 
}

export default App;
