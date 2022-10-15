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
        public IEnumerable<GetDataView> GetAllProductInfo()
        {
            var allData = (from pd in db.PurchaseDetails
                           join p in db.Products on pd.ProductId equals p.Id
                           join i in db.ProductImages on p.Id equals i.ProductId
                           join c in db.Categories on p.CategoryId equals c.Id
                           join s in db.SubCategory on p.SubCategoryId equals s.Id
                           join b in db.Brands on p.BrandId equals b.Id
                           select new GetDataView
                           { 
                              Id=pd.Id,
                              Category=c.CategoryName,
                              SubCategory=s.SubCategoryName,
                              Brand=b.BrandName,
                              ProductTitle=p.ProductTitle,
                              Description=p.Description,
                              PictureDetail=i.ImagePath,//detail url
                              PictureThumbnail=i.ImagePath,//thumnail url
                              Quantity=pd.Quantity,
                              UnitSellPrice=pd.SellPrice,
                              VatAmount=pd.VatAmount,
                              DiscountAmount=pd.DiscountAmount
                              
                           }).ToList();
            return allData;
                
        }
       
    }
}
