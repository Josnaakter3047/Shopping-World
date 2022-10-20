using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IsDbBisewFinalProject.Models;

namespace IsDbBisewFinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ShoppingDbContext db;

        public HomeController(ShoppingDbContext db)
        {
            this.db = db;
        }

        // GET: api/Home
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllData()
        {
            return await db.Products.Include(c => c.Category).Include(s => s.SubCategory).Include(b => b.Brand).Include(i => i.ProductImages).Include(pd => pd.PurchaseDetails).ToListAsync();
                
        }
       
    }
}
