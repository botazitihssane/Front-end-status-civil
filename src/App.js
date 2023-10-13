import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "service/auth.service";
import BoardUser from "views/Boards/BoardUser";

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/auth/loginregister");
    }
  }, [navigate]);

  return <div>{currentUser ? <BoardUser /> : null}</div>;
};
export default App;
