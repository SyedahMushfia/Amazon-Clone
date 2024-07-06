import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col">
      404 Not Found
      <Link to="/">Go to Homepage</Link>
    </div>
  );
}

export default NotFoundPage;
