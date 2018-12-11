using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using React_Demo.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Demo.Services
{
	public class SlackTrainingDb : SlackTrainingDbEntities
	{
		public readonly IConfiguration config;

		//config will be provided via dependency injection
		public SlackTrainingDb(IConfiguration config)
		{
			this.config = config;
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			//use the connection string provided in the appsettings.{Environment}.json file
			optionsBuilder.UseSqlServer(config.GetConnectionString("SlackTrainingConnectionString"));
		}
	}
}
