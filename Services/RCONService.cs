using Rcon;

namespace Rust_store_backend.Services
{
    public class RCONService
    {
        public async Task SendCommand()
        {
            string rconHost = "10.244.17.98"; // Change to your server IP
            int rconPort = 28016;          // Default RCON port
            string rconPassword = "your_rcon_password";

            var client = new RconClient();
            var connected = await client.ConnectAsync(rconHost, rconPort);
            var authenticated = await client.AuthenticateAsync(rconPassword);
            if (client.Authenticated)
            {
                string response = await client.SendCommandAsync("deposit POTUS 10");
                Console.WriteLine("Server Response: " + response);
            }
            else
            {
                Console.WriteLine("Failed to connect to RCON.");
            }

        }
    }
}
