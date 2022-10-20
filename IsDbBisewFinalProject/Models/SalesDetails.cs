using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IsDbBisewFinalProject.Models
{
    public class SalesDetails
    {
        public int Id { get; set; }

        [ForeignKey("Sales")]
        public int SalesId { get; set; }

        [ForeignKey("Product"), Display(Name = "Product Name")]
        public int ProductId { get; set; } 
        [Column(TypeName ="money")]
        public decimal UnitPrice { get; set; } // vat has to be shown in the sales table but it should be come from purchaseDetails table. it will not include in this table.
        [Column(TypeName = "money")]
         public decimal Quantity { get; set; }
        public decimal TotalAmount
        {
            get
            {
                return (UnitPrice * Quantity);
            }

        }

        // nev
        public virtual Product Product { get; set; }
        public virtual Sales Sales { get; set; }
        public virtual ICollection<Shipment> Shipment { get; set; }
    }
}
