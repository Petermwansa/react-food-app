import Cart from "./assets/components/Cart";
import Checkout from "./assets/components/Checkout";
import Header from "./assets/components/Header";
import Meals from "./assets/components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  ); 
}

export default App;
