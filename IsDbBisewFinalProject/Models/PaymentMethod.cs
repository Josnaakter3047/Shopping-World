using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace IsDbBisewFinalProject.Models
{
    public class PaymentMethod
    {
        public  int Id { get; set; }
        [StringLength(100),Display(Name ="Payment Method")]
        public string MethodName { get; set; }
        //nev

        public virtual ICollection<Payment> Payment { get; set; }
    }
}
