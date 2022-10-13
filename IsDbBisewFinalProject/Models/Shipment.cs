using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;

namespace IsDbBisewFinalProject.Models
{
    public class Shipment
    {
        public int Id { get; set; }
        [ForeignKey("SalesDetails"),Display(Name ="Sales Item")]
        public int SalesDetailsId { get; set; }
        public string DeliveryToAddress { get; set; }
        public string FromAddress { get; set; }
        public string TrackingNo { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string ContactNo { get; set; }

      
        // nev
        public virtual SalesDetails SalesDetails { get; set; }
    }
}
