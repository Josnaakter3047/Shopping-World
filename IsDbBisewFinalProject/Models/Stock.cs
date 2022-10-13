using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;

namespace IsDbBisewFinalProject.Models
{
    public class Stock
    {
        public int Id { get; set; }         
        [ForeignKey("Product"), Display(Name = "Product Title")]
        public int ProductId { get; set; }
        [Column(TypeName ="money")]
        public decimal TotalStock { get; set; }

        // nev
        public virtual Product Product { get; set; }

    }
}
