using Microsoft.AspNetCore.Mvc;
using Rust_store_backend.Services;

namespace Rust_store_backend.Controllers;

[ApiController]
[Route("commands")]
public class CommandController : ControllerBase
{
    private readonly RCONService _rconService;
    public CommandController(RCONService rconServie)
    {
        _rconService = rconServie;
    }
    [HttpPost("command")]
    public async Task<IActionResult> Command(CommandRequest request)
    {
       // await _rconService.SendCommand();
        return Ok();
    }
}


public class CommandRequest
{
    public string Command;
}