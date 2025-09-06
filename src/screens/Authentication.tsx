import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";

export const AuthenticationMode = Object.freeze({
  SignIn: "Login",
  SignUp: "SignUp",
});
export default function Authentication({ authenticationMode }: any) {
  const { user, setUser, signUp, signIn } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const signFunction =
      authenticationMode === AuthenticationMode.SignIn ? signIn : signUp;
    signFunction()
      .then((res: any) => {
        navigate(
          authenticationMode === AuthenticationMode.SignUp ? "/signin" : "/"
        );
      })
      .catch((err: any) => {
        alert(err);
      });
  };

  return (
    <div>
      <h3>
        {authenticationMode === AuthenticationMode.SignIn
          ? "Sign in"
          : "Sign up"}
      </h3>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label>Password</label>
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">
          {authenticationMode === AuthenticationMode.SignIn
            ? "Login"
            : "Submit"}
        </button>
        <Link
          to={
            authenticationMode === AuthenticationMode.SignIn
              ? "/signup"
              : "/signin"
          }
        >
          {authenticationMode === AuthenticationMode.SignIn
            ? "No account? Sign up"
            : "Already signed up? Sign in"}
        </Link>
      </form>
    </div>
  );
}
