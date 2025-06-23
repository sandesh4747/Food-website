import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function BreadcrumbsWithIcon({ links = [] }) {
  return (
    <Breadcrumbs
      separator={
        <span className="text-lg sm:text-xl xl:text-2xl mx-2">/</span> // Increased size and added margin
      }
      className="items-center" // Ensure vertical alignment
    >
      {links.map(({ path, label }, index) => (
        <Link
          key={index}
          to={path}
          className={`${index === links.length - 1 ? "" : "opacity-60"} 
            text-sm sm:text-xl xl:text-2xl
            px-1 // Added horizontal padding for better spacing
          `}
        >
          {label}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
