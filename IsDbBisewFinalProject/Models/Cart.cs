using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;
using System.Collections;
using System.Collections.Generic;

namespace IsDbBisewFinalProject.Models
{
    public class Cart
    {
        public int Id { get; set; }

        [ForeignKey("Customer")]
        public int CustomerId { get; set; }
        [ForeignKey("ShoppingSession")]
        public int SessionId { get; set; }
        [Required, Display(Name = "Cart Date"), Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime CartDate { get; set; }
        //nev
        public virtual ICollection<CartDetail> CartDetails { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual ShoppingSession ShoppingSession { get; set; }

    }
}
