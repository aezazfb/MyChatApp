using chatApp.Models;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace MyChatApp.Server.MyHubs
{
    public sealed class ChatHub : Hub
    {
        private readonly string _myBotUser;
        private readonly IDictionary<string, UserConnection> _conns;
        public ChatHub(IDictionary<string, UserConnection> connectionss)
        {
            _myBotUser = "My chat Bot !";
            _conns = connectionss;
        }
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            _conns[Context.ConnectionId] = userConnection;
            await Clients.All.SendAsync("GotMessage", _myBotUser, $"{userConnection.User} just joined {userConnection.Room}!");
            await ReturnConnectedUsers(userConnection.Room);
        }
        //public override async Task OnConnectedAsync()
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", Context.User, $"{Context.ConnectionId} is connected!");
        //}
        public async Task SendMessage(string message)
        {
            if (_conns.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Groups(userConnection.Room)
                    .SendAsync("GotMessage", userConnection.User, message);
            }
        }
        //Overriden functions of SignalR are automatically called on its call.
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (_conns.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _conns.Remove(Context.ConnectionId);
                Clients.All.SendAsync("GotMessage", _myBotUser, $"{userConnection.User} just eluded!");

                ReturnConnectedUsers(userConnection.Room); //Returning change of members
            }
            return base.OnDisconnectedAsync(exception);
        }
        public Task ReturnConnectedUsers(string roomName)
        {
            var roomUsers = _conns.Values.
                Where(x => x.Room == roomName)
                .Select(s => s.User);

            return Clients.Group(roomName).SendAsync("GetUsersInRoom", roomUsers);
        }
    }
}
