const RoomUsers = ({ users }) => {
    return <div className="user-list">
        <h4>Room Users!</h4>
        {users.map(
            (theUser, userIndex) => <h6 key={userIndex}>{theUser}</h6>
        )}
    </div>
}

export default RoomUsers;