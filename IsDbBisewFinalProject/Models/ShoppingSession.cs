using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;
using System.Collections;
using System.Collections.Generic;

namespace IsDbBisewFinalProject.Models
{
    public class ShoppingSession
    {
        public int Id { get; set; }
        [ForeignKey("User"), Display(Name = "User")]
        public int UserId { get; set; }
        public double Total { get; set; }
        [Required, Display(Name = "create Date"), Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime CreatedDate { get; set; }
        [Required, Display(Name = "Modify Date"), Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime ModifiedDate { get; set; }
        [Required, Display(Name = "Delete Date"), Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DeletedDate { get; set; }

        // nev
        public virtual  ICollection<Cart>  Cart { get; set; }
        public virtual User User { get; set; }

    }
}
