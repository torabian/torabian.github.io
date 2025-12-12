import { Link, useLocation } from "react-router-dom";

export default function Layout({ routes, children }) {
    const loc = useLocation();

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <aside
                style={{
                    width: 220,
                    borderRight: "1px solid #ddd",
                    padding: 16,
                }}
            >
                <h3>App</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {routes.map(r => (
                        <li key={r.path} style={{ margin: "8px 0" }}>
                            <Link
                                to={r.path}
                                style={{
                                    color: loc.pathname === r.path ? "black" : "#555",
                                    fontWeight: loc.pathname === r.path ? "bold" : "normal",
                                    textDecoration: "none",
                                }}
                            >
                                {r.label ?? r.path}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            <main style={{ flex: 1, padding: 20 }}>{children}</main>
        </div>
    );
}
