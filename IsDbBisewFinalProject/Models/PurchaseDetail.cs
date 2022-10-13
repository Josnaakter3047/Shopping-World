using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace IsDbBisewFinalProject.Models
{
    public class PurchaseDetail
    {
        public int Id { get; set; }
        [ForeignKey("Product"), Display(Name = "Product Name")]
        public int ProductId { get; set; }

        [ForeignKey("Purchase"),Display(Name ="Purchase ID")]
        public int PurchaseId { get; set; }
        public decimal Quantity { get; set; }
        [Column(TypeName = "money")]
        public decimal UnitPrice { get; set; }
        public decimal Profit { get; set; }
        public decimal VAT { get; set; }
        [Display(Name = "VAT Amount")]
        public decimal VatAmount
        {
            get
            {
                return (UnitPrice*(VAT/100));
            }
        }
        public decimal Discount { get; set; }
        [Display(Name = "Discount Amount")]
        public decimal DiscountAmount
        {
            get
            {
                return (UnitPrice * (Discount / 100));
            }
        }
        public decimal SellPrice
        {
            get
            {
                return (UnitPrice *(1+ (Profit/100)) + VatAmount + DiscountAmount);
            }
        }
        [Column(TypeName ="date"),DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode =true)]
        public DateTime ManufacturingDate { get; set; }
        [Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime ExpiredDate { get; set; }
        public bool IsExpirable { get; set; }
        public int SoldQuantity { get; set; }
             

        // nev
        public virtual Product Product { get; set; }
        public virtual Purchase Purchase { get; set; }

    }


}
