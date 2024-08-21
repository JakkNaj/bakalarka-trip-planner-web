import { Link, Outlet } from "react-router-dom";

export const LayoutComponent = () => {

    return (
        <>
            <nav style={{ display: "flex", justifyContent: "space-around"}}>
                <p>
                    <Link to="/">home</Link>
                </p>
                <p>
                    <Link to="/">upcoming trips</Link>
                </p>
                <p>
                    <Link to="/">previous trips</Link>
                </p>
                <p>profile icon placeholder</p>
            </nav>
            <main>
                <Outlet/>
            </main>
        </>
    );
}
