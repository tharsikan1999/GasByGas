import { useState } from "react";
import Button from "../../components/common/Button";
import AuthModal from "../AuthModal";
import Contact from "../contact";
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/form/OrderItem";
import UseAuthProvider from "../../Hooks/UseAuthProvider";
import Cookies from "universal-cookie";
import { useLogoutMutation } from "../../query/common/query";
import Spinner from "../../animation/Spinner";
import { FetchAllItemsData } from "../../api/item/Api";
import { useQuery } from "@tanstack/react-query";
import PizzaImg from "../../../public/Images/gas.jpg";

interface Pizza {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Item {
  id: number;
  name: string;
  price: number;
  image?: string;
}

const HomePge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [isOderOpen, setIsOrderOpen] = useState(false);
  const navigate = useNavigate();
  const { auth } = UseAuthProvider();
  const cookies = new Cookies();

  const {
    isLoading,
    isError,
    data: AllItemsData,
    error,
  } = useQuery({
    queryKey: ["AllItemsData"],
    queryFn: async () => {
      const items = await FetchAllItemsData();
      return items.map((item) => ({
        ...item,
        id: Number(item.id),
      }));
    },
  });

  const { mutateAsync: logout } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user-storage");
      cookies.remove("authToken");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = (item: Item) => {
    if (auth.accessToken) {
      setIsOrderOpen(true);
      setPizza(item as Pizza);
    } else {
      setIsOpen(true);
    }
  };

  if (isLoading) return <Spinner />;

  if (isError) return `Error: ${error.message}`;

  return (
    <div className="w-full min-h-screen relative bg-gray-50 pb-20">
      {auth.accessToken ? null : (
        <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <Contact isOpen={isContactOpen} setIsOpen={setIsContactOpen} />
      <OrderItem isOpen={isOderOpen} setIsOpen={setIsOrderOpen} pizza={pizza} />

      {/* Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center py-6 px-4">
        <p
          className="text-slate-700 font-bold text-3xl cursor-pointer hover:text-red-600 transition duration-300"
          onClick={() => navigate("/")}
        >
          GasByGas
        </p>

        <div className="flex items-center space-x-5">
          {auth.accessToken ? null : (
            <Button text="Login" onClick={() => setIsOpen(true)} />
          )}
          <Button text="Contact" onClick={() => setIsContactOpen(true)} />
          {auth.accessToken && (
            <>
              <Button text="Dashboard" onClick={() => navigate("/dashboard")} />
              <Button text="LogOut" onClick={handleLogout} />
            </>
          )}
        </div>
      </div>
      {/* Hero Section */}
      <div
        className="w-full h-[40vh] flex items-center justify-center text-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${PizzaImg})` }}
      >
        <div className="text-center bg-black/50 p-6 rounded-md">
          <h1 className="text-5xl font-bold mb-4">Welcome to GasByGas!</h1>
          <p className="text-lg mb-6">Delicious Pizzas Delivered Hot & Fresh</p>
        </div>
      </div>

      {/* Menu Items Section */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-10">
        {AllItemsData?.length === 0 ? (
          <p className="text-center text-2xl font-semibold mt-10 text-slate-800/90">
            No data available
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {AllItemsData?.map((pizza, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div
                  className="w-full rounded-t-lg h-52 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${pizza.imagePath || PizzaImg})`,
                  }}
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl text-slate-800/90 mb-2">
                    {pizza.name}
                  </h3>
                  <p className="font-semibold text-lg text-slate-600/90 mb-4">
                    RS. {pizza.price}
                  </p>
                  <Button
                    text={`${
                      pizza.isAvailable ? "Order Now" : "Not Available"
                    }`}
                    onClick={() => handleOrder(pizza)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePge;
