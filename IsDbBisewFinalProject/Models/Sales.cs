using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System.Collections;
using System.Collections.Generic;

namespace IsDbBisewFinalProject.Models
{
    public class Sales
    {
        public int Id { get; set; }

        [ForeignKey("Customer"), Display(Name = "Customer Name")]
        public int CustomerId { get; set; }

        [Column(TypeName ="money")]
        public decimal OtherExpense { get; set; }
        [Column(TypeName = "money")]
        public decimal TotalAmount { get; set; }//Total Amount From Customers

        // nev
        public virtual Customer Customer { get; set; }
        public virtual ICollection<SalesDetails> SalesDetails { get; set; }
    }
}
