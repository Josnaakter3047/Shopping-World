using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IsDbBisewFinalProject.Models
{
    public class Brand
    {
        public int Id { get; set; }
        [StringLength(100),Display(Name ="Brand")]
        public string BrandName { get; set; }
        //nev 
        public virtual ICollection<Product> Products { get; set; }
    }
}
