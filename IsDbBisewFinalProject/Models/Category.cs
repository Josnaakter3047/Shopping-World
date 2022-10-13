using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IsDbBisewFinalProject.Models
{
    public class Category
    {

        public int Id { get; set; }

        [Required, StringLength(50)]
        public string CategoryName { get; set; }

        // nev
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<SubCategory> SubCategory { get; set; }

    }
}
