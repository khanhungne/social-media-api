import { Button } from '@mui/material'; // Import Button từ Material-UI
import { useSetRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
import useShowToast from "../../hooks/userShowSnackbar"; // Đảm bảo rằng hook này tồn tại
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
    const setUser  = useSetRecoilState(userAtom);
    const { showToast } = useShowToast();

    const handleLogout = async () => {
        try {
            const res = await fetch("/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            localStorage.removeItem('user');
            setUser (null);
            showToast("Success", "Logged out successfully", "success"); // Thông báo thành công
        } catch (error) {
            console.error("Error during logout:", error);
            showToast("Error", "An error occurred during logout", "error"); // Thông báo lỗi
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            style={{ position: "fixed", top: "30px", right: "30px" }}
            size="small"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;