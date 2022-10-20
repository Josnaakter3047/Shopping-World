using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;

namespace IsDbBisewFinalProject.Models
{
    public class Payment
    {
        public int Id { get; set; }
        [ForeignKey("Customer"), Display(Name ="Customer Name")]
        public int CustomerId { get; set; }
        [Required, Display(Name = "Payment Date"), Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime PaymentDate { get; set; }
        [Display(Name ="Total Amount")]
        public decimal TotalAmount { get; }
        public string Status { get; set; }

        [ForeignKey("PaymentMethod"),Display(Name ="Payment Method")]
        public int PaymentMethodId { get; set; }

        //nev
        // for customer table
        public virtual Customer Customer { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }

    }
}
