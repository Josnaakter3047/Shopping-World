using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System.Collections;
using System.Collections.Generic;

namespace IsDbBisewFinalProject.Models
{
    public class Product
    {     
        public int Id { get; set; }

        [ForeignKey("Category"), Display(Name = "Category")]
        public int CategoryId { get; set; }

        [ForeignKey("SubCategory"), Display(Name = "Sub Category")]
        public int SubCategoryId { get; set; }

        [ForeignKey("Brand"),Display(Name ="Brand")]
        public int BrandId { get; set; }

        [Required, StringLength(300),Display(Name ="Product Title")]
        public string ProductTitle { get; set; }

        [Required, StringLength(200)]
        public string Description { get; set; }
        

        // nev
        public virtual Category Category { get; set; }
        public virtual SubCategory SubCategory { get; set; }
        public virtual Brand Brand { get; set; }
        public virtual ICollection<ProductImage> ProductImages  { get; set; }
        public virtual ICollection<PurchaseDetail> PurchaseDetails { get; set; }
        public virtual ICollection<Stock> Stock { get; set; }
        public virtual ICollection<SalesDetails> SalesDetails { get; set; }
        public virtual ICollection<CartDetail> CartDetails { get; set; }

    }
}
