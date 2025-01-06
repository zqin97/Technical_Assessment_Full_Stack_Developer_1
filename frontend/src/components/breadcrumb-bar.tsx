import { useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

const BreadcrumbBar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathnames.length > 0 ? (
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Home</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {pathnames.length > 0 && <BreadcrumbSeparator />}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <Fragment key={to}>
              <BreadcrumbItem>
                {!isLast ? (
                  <BreadcrumbLink href={to} className="capitalize">
                    {value}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="capitalize">
                    {value}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbBar;
