using Microsoft.EntityFrameworkCore;
using React_Demo.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Demo.Services
{
	public class ChannelManagerService
	{
		readonly SlackTrainingDb context;

		public ChannelManagerService(SlackTrainingDb context)
		{
			this.context = context;
		}

		public async Task<List<Channel>> GetChannels()
		{
			return await context.Channel.ToListAsync();
		}

		public async Task AddChannel(string displayName, string description, bool isPublic)
		{
			if(String.IsNullOrWhiteSpace(displayName))
			{
				throw new ArgumentException("Channel display name cannot be empty", nameof(displayName));
			}

			context.Channel.Add(new Channel()
			{
				DisplayName = displayName,
				Description = description,
				IsPublic = isPublic
			});

			await context.SaveChangesAsync();
		}
	}
}
