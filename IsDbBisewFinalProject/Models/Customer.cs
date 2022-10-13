using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace IsDbBisewFinalProject.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required,StringLength(50), Display(Name = "Customer Name")]
        public string CustomerName { get; set; }

        [StringLength(50)]
        public string Address { get; set; }

        [Required]
        public string Email { get; set; }
        [Required, Display(Name = "Contact No")]
        public string ContactNo { get; set; }
        [Required, StringLength(30, MinimumLength = 8)]
        public string Password { get; set; }

        // nev
        public virtual ICollection<Sales> Sales { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }

    }
}
