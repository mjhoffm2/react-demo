using Microsoft.AspNetCore.Mvc;
using React_Demo.Models.Database;
using React_Demo.Services;
using System.Threading.Tasks;

namespace React_Demo.Controllers
{
	[Route("api/channels")]
	public class ChannelManagerController : Controller
	{
		readonly ChannelManagerService channelService;

		public ChannelManagerController(ChannelManagerService channelService)
		{
			this.channelService = channelService;
		}

		[HttpGet]
		public async Task<IActionResult> GetChannels([FromQuery] string search = "", [FromQuery] int limit = 20, [FromQuery] int offset = 0)
		{
			var channels = await channelService.GetChannels(search, limit, offset);
			return Json(channels);
		}

		[HttpGet("{channelId:long}")]
		public async Task<IActionResult> GetChannel(long channelId)
		{
			var channel = await channelService.GetChannel(channelId);
			return Json(channel);
		}

		[HttpPost]
		public async Task<IActionResult> AddChannel([FromBody] Channel channel)
		{
			var createdChannel = await channelService.AddChannel(channel);
			return Json(createdChannel);
		}

		[HttpPatch]
		public async Task<IActionResult> UpdateChannel([FromBody] Channel channel)
		{
			await channelService.UpdateChannel(channel);
			return Ok();
		}

		[HttpDelete("{channelId:long}")]
		public async Task<IActionResult> DeleteChannel(long channelId)
		{
			await channelService.DeleteChannel(channelId);
			return Ok();
		}
	}
}
