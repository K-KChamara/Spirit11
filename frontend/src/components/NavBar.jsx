import { useState } from "react";
import { Link } from "react-router-dom";
;
import { ShoppingCart } from "lucide-react";



import { useNavigate } from "react-router-dom";
const Navbar = () => {
  // const {cartCount} =useCart();
  const [isOpen, setIsOpen] = useState(false);




  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-md">
      <div className=" mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Brand & Navigation Links */}
          <div className="flex items-center justify-start gap-6">
            {/* Brand Logo */}
            <div className="text-primary text-2xl font-bold">
              <Link to="/">Mebius</Link>
            </div>

            <div className="flex gap-3 items-center">
              
            
                  <Link to="/admin">Admin</Link>
            
              
              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/shop"
              >
                Shop
              </Link>
              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/favourite"
              >
                Favourites
              </Link>
            </div>
          </div>

          {/* Right Section: Account & Sign In/Out */}
          <div className="hidden md:flex space-x-6">
      
            <Link
              className="bloc text-foreground hover:text-muted-foreground flex gap-1"
              to="/cart"
            >
          <ShoppingCart /> 
            </Link>
    
              <Link
                className="block text-foreground hover:text-muted-foreground"
                to="/account"
              >
                Account
              </Link>
          
            
            

              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/sign-in"
              >
                Sign In
              </Link>
              <Link
                className="text-foreground hover:text-muted-foreground"
                to="/sign-up"
              >
                Sign Up
              </Link>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-md border-t border-border p-4 space-y-3">
     
            <UserButton />
            <Link
              className="block text-foreground hover:text-muted-foreground"
              to="/account"
            >
              Account
            </Link>
  

            <Link
              className="block text-foreground hover:text-muted-foreground"
              to="/sign-in"
            >
              Sign In
            </Link>
            <Link
              className="block text-foreground hover:text-muted-foreground"
              to="/sign-up"
            >
              Sign Up
            </Link>

          <Link
            className="block text-foreground hover:text-muted-foreground"
            to="/"
          >
            Home
          </Link>
          <Link
            className="block text-foreground hover:text-muted-foreground"
            to="/shop"
          >
            Shop
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
