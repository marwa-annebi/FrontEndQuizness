import { Link } from "react-router-dom";
// import "./NotFound.css";
import image from "./../assets/notFound.svg";
const NotFound = () => {
  return (
    <div
      className="not-found-page"
      style={{
        textAlign: "center",
        justifyContent: "center",
        fontFamily: "var(--font-family-cerapro-bold)",
        marginTop: "80px",
      }}
    >
      <div className="container-404">
        <div>
          <img src={image} alt="orange bomb" width="500px" />
        </div>
      </div>

      <div className="not-found-text" style={{ marginTop: "80px" }}>
        <p>Sorry this page cannot be found.</p>
        <Link to="/">Click here to go back to Home Page...</Link>
      </div>
    </div>
  );
};

export default NotFound;
