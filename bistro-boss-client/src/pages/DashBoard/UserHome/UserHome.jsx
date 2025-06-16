import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth()
    return (
        <div className="md:ml-20 mt-5 h-screen">
            <h2 className="text-3xl">
                <span>Hi Welcome </span>
                {
                    user?.displayName ? user.displayName : "Back"
                }
            </h2>
        </div>
    );
};

export default UserHome;