import "./NavigationButtons.css";
import { navButtonsRoutes } from "../../data";
import { Link } from "react-router-dom";

const NavigationButtons = () => {
  return (
    <div className="navigation-buttons">
      {navButtonsRoutes.map((route, index) => (
        <Link
          to={route.route}
          className="card"
          target={route.target}
          key={index}
        >
          <div className="flex-center icon" style={{ background: route.color }}>
            {route.icon}
          </div>
          <p>{route.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default NavigationButtons;
