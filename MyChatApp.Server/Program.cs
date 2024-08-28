using chatApp.Models;
using MyChatApp.Server.MyHubs;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

// Add services to the container.

services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddSignalR();

services.AddCors(options =>
{
    options.AddPolicy("MeriPolicy",
        builder => builder
            .WithOrigins("http://2.56.212.108") // Add the frontend URL
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

services.AddSingleton<IDictionary<string, UserConnection>>(options => new Dictionary<string, UserConnection>());

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("MeriPolicy");

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("chatHub");

app.MapFallbackToFile("index.html");

app.Run();
