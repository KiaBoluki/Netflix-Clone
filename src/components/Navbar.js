import React, {useState, useEffect} from "react";
import logo from '../assets/img/netflix-logo-png.png';
function Navbar() {
    const [show, setShow] = useState([]);

    useEffect(()=>{
        window.addEventListener('scroll', () =>{
            if(window.scrollY > 100){
                setShow(true);
            }else{
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }
    },[]);
  return (
    <div className={`banner__nav ${show && "nav__black"}`}  >
      <div className="logo">
        <img src={logo} alt="Netflix Logo" />
      </div>
      <div className="avatar">
        <a href="">Sign up/Login</a>
      </div>
    </div>
  );
}

export default Navbar;
