import {useDispatch} from "react-redux";
import {logoutUser} from "../components/userActions";

export default function Logout() {
    const dispatch = useDispatch()
    dispatch(logoutUser())
}
