using Microsoft.AspNetCore.Mvc;
using React_Demo.Models.Database;
using React_Demo.Services;
using System;
using System.Collections.Generic;
using System.Linq;
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
		public async Task<IActionResult> GetChannels()
		{
			var channels = await channelService.GetChannels();
			return Json(channels);
		}

		[HttpPost]
		public async Task<IActionResult> AddChannel([FromBody] Channel channel)
		{
			await channelService.AddChannel(channel.DisplayName, channel.Description, channel.IsPublic);
			return Ok();
		}
	}
}
