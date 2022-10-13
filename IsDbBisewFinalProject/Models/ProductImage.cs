using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IsDbBisewFinalProject.Models
{
    public class ProductImage
    {
        public int Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }

        [Display(Name ="Image")]      
        public string ImagePath { get; set; }
        public bool ThumbnailImage { get; set; }
        public bool DetialImage { get; set; }

       

        // nev
        public virtual Product Product { get; set; }      
    }
}
