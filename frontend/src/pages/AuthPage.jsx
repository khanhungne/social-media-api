import LoginCard from "../components/auth/LoginCard";
import SignupCard from "../components/auth/SignupCard";
import { useRecoilValue } from "recoil";
import authAtom from "../atoms/authAtom"

const AuthPage = () => {
    const authState = useRecoilValue(authAtom)
    return(
        <div className="">
            {authState == "login" ? <LoginCard/> : <SignupCard/>}
        </div>
);
};

export default AuthPage;