using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;
using System.Reflection.PortableExecutable;
using System.Collections;
using System.Collections.Generic;

namespace IsDbBisewFinalProject.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required, StringLength(50)]
        public string FullName { get; set; }
        [StringLength(100)]
        public string Address { get; set; }
        [Required, StringLength(50)]
        public string Email { get; set; }
        [Required, StringLength(14)]
        public string ContactNo { get; set; }
        public int NID { get; set; }
        [Required, Display(Name = "Join Date"), Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime JoinDate { get; set; }
        [Required, Display(Name = "Update Date"), Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime UpdatedDate { get; set; }
        [ForeignKey("Role"), Display(Name = "Role")]
        public int RoleId { get; set; }
        [Required, StringLength(20, MinimumLength = 8),DataType(DataType.Password)]
        public string Password { get; set; }
        [Display(Name ="Photo")]
        public string PicturePath { get; set; }

        //nev
        public virtual ICollection<ShoppingSession> ShoppingSessions { get; set; }
        public virtual Role Role { get; set; }

    }
}
