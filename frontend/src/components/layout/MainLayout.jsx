import Header from "./Header";

function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="container main-content">{children}</main>
    </div>
  );
}

export default MainLayout;