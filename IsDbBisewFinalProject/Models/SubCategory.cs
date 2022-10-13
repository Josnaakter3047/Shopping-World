using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IsDbBisewFinalProject.Models
{
    public class SubCategory
    {
        public int Id { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        [Required,StringLength(50),Display(Name ="Sub Category")]
        public string SubCategoryName { get; set; }
        //nev
        public virtual Category Category { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
