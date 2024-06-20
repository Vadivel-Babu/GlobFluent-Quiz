import { Card, Input, Select, message } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  //@ts-ignore
  const { login, logout } = useContext(AppContext);
  const handleChange = (value: string) => {
    setRole(value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim().length === 0 || !email.includes("@")) {
      messageApi.error("Enter Valid Email");
      return;
    }
    if (password.trim().length === 0) {
      messageApi.error("Enter Valid Password");
      return;
    }
    const user = {
      email,
      password,
      role,
    };
    login(user);
    navigate("/");
  };
  return (
    <Card style={{ maxWidth: 400, margin: "20px auto" }} className="shadow-lg">
      {contextHolder}
      <form action="">
        <h1 className="text-xl font-semibold text-center mb-4">Login</h1>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setMail(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <div className="flex flex-col gap-4">
          <Select
            value={role}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "user", label: "user" },
              { value: "admin", label: "admin" },
            ]}
          />
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 py-2 rounded-lg transistion hover:bg-yellow-300"
          >
            Login
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
