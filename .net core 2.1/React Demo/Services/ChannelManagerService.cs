using Microsoft.EntityFrameworkCore;
using React_Demo.Models.Database;
using React_Demo.Util;
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

		public async Task<List<Channel>> GetChannels(string search, int limit, int offset)
		{
			return await context.Channel
				.Where(channel => channel.IsPublic)
				.Where(channel => !channel.IsSoftDeleted)
				.Where(channel => search == "" || channel.DisplayName.StartsWith(search) || channel.Description.Contains(search))
				.Skip(offset)
				.Take(limit)
				.ToListAsync();
		}

		public async Task<Channel> GetChannel(long channelId)
		{
			Channel channel = await context.Channel.FindAsync(channelId);

			if (channel == null)
			{
				throw new NotFoundException("No channel exists with the id: " + channelId);
			}
			return channel;
		}

		public async Task<Channel> AddChannel(Channel channel)
		{
			string displayName = channel.DisplayName;
			string description = channel.Description;
			bool isPublic = channel.IsPublic;

			if (String.IsNullOrWhiteSpace(displayName))
			{
				throw new BadRequestException("Channel display name cannot be empty");
			}

			Channel channelToCreate = new Channel()
			{
				DisplayName = displayName,
				Description = description,
				IsPublic = isPublic
			};

			context.Channel.Add(channelToCreate);

			await context.SaveChangesAsync();

			return channelToCreate;
		}

		public async Task<Channel> UpdateChannel(Channel channel)
		{
			long channelId = channel.ChannelId;
			string displayName = channel.DisplayName;
			string description = channel.Description;
			bool isPublic= channel.IsPublic;

			//the channel provided as an argument is simply a deserialized object from the user
			//we need to obtain the tracked entity from EF Core
			Channel oldChannel = await context.Channel.FindAsync(channelId);

			if (oldChannel == null)
			{
				throw new NotFoundException("No channel exists with the id: " + channelId);
			}

			if(String.IsNullOrWhiteSpace(displayName))
			{
				throw new BadRequestException("Channel display name cannot be empty");
			}

			oldChannel.DisplayName = displayName;
			oldChannel.Description = description;
			oldChannel.IsPublic = isPublic;

			await context.SaveChangesAsync();

			return oldChannel;
		}

		public async Task DeleteChannel(long channelId)
		{
			Channel oldChannel = await context.Channel.FindAsync(channelId);

			if (oldChannel == null)
			{
				throw new NotFoundException("No channel exists with the id: " + channelId);
			}

			if (oldChannel.IsGeneral)
			{
				throw new UnauthorizedException("You do not have permission to delete this channel");
			}

			context.Channel.Remove(oldChannel);

			await context.SaveChangesAsync();
		}
	}
}
