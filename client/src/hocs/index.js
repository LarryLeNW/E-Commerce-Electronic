import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const withBaseComponent = (Component) => (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  return (
    <Component
      {...props}
      navigate={navigate}
      dispatch={dispatch}
      location={location}
      params={params}
      useSelector={useSelector}
    />
  );
};

export default withBaseComponent;
