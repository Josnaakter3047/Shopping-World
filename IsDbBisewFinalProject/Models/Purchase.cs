using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;
using System.Collections;
using System.Collections.Generic;

namespace IsDbBisewFinalProject.Models
{
    public class Purchase
    {
        public int Id { get; set; }
      
        [Required, Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime PurchaseDate { get; set; }

        [ForeignKey("Supplier"),Display(Name ="Supplier")]
        public int SupplierId { get; set; }

        [Required,Display(Name ="Total Amount")]
        public double TotalAmount { get; set; }

        //nev 
        public virtual Supplier Supplier { get; set; }
        public virtual ICollection<PurchaseDetail> PurchaseDetails { get; set; }
    }
}
