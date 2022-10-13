using System.ComponentModel.DataAnnotations;

namespace IsDbBisewFinalProject.Models
{
    public class Supplier
    {
        public int Id { get; set; }
        [Required, StringLength(50)]
        public string SupplierName { get; set; }
        [Required, StringLength(100)]
        public string Address { get; set; }
        [Required]
        public string Email { get; set; }
        [Required,StringLength(11),Display(Name ="Phone Number")]
        public string ContactNo { get; set; }
    }
}
