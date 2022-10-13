using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IsDbBisewFinalProject.Models
{
    public class CartDetail
    {
        public int Id { get; set; }

        [ForeignKey("Cart"), Display(Name = "Cart")]
        public int CartId { get; set; }

        [ForeignKey("Product"), Display(Name = "Product Name")]
        public int ProductId { get; set; }
        [Column(TypeName ="money"),Display(Name ="Sell Price(per unit)")]
        public decimal UnitPrice { get; set; }
        [Column(TypeName = "money")]
        public decimal Quantity { get; set; }

        [Column(TypeName = "money")]
        public decimal Total { 
            get 
            { 
                return UnitPrice * Quantity;
            } 
        }
        
        //nev
        public virtual Product Product { get; set; }
        public virtual Cart Cart { get; set; }
        
    }
}
