using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace test2.Controllers
{
	public class HomeController : Controller
	{

		public HomeController()
		{

		}
		
		public IActionResult Index()
		{
			return View();
		}

		public IActionResult Error()
		{
			ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
			return View();
		}
	}
}
