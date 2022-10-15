using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IsDbBisewFinalProject.Models
{
    public class GetDataView
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string Brand { get; set; }
        public string ProductTitle { get; set; }
        public string Description { get; set; }
        public string PictureDetail { get; set; }
        public string PictureThumbnail { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitSellPrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal VatAmount { get; set; }
    }
}
