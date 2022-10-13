using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace IsDbBisewFinalProject.Models
{
    public class Role
    {
       
        public int Id { get; set; }

        [Required, StringLength(30), Display(Name = "Role Name")]
        public string RoleName { get; set; } //Roles are Admin, Author, Editor,User

        //nev
        public virtual ICollection<User> User { get; set; }
    }
}
