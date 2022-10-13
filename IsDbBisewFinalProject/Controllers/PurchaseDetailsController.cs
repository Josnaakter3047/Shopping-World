using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IsDbBisewFinalProject.Models;

namespace IsDbBisewFinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseDetailsController : ControllerBase
    {
        private readonly ShoppingDbContext _context;

        public PurchaseDetailsController(ShoppingDbContext context)
        {
            _context = context;
        }

        // GET: api/PurchaseDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseDetail>>> GetPurchaseDetails()
        {
            return await _context.PurchaseDetails.ToListAsync();
        }

        // GET: api/PurchaseDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseDetail>> GetPurchaseDetail(int id)
        {
            var purchaseDetail = await _context.PurchaseDetails.FindAsync(id);

            if (purchaseDetail == null)
            {
                return NotFound();
            }

            return purchaseDetail;
        }

        // PUT: api/PurchaseDetails/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchaseDetail(int id, PurchaseDetail purchaseDetail)
        {
            if (id != purchaseDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(purchaseDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PurchaseDetails
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PurchaseDetail>> PostPurchaseDetail(PurchaseDetail purchaseDetail)
        {
            _context.PurchaseDetails.Add(purchaseDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPurchaseDetail", new { id = purchaseDetail.Id }, purchaseDetail);
        }

        // DELETE: api/PurchaseDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PurchaseDetail>> DeletePurchaseDetail(int id)
        {
            var purchaseDetail = await _context.PurchaseDetails.FindAsync(id);
            if (purchaseDetail == null)
            {
                return NotFound();
            }

            _context.PurchaseDetails.Remove(purchaseDetail);
            await _context.SaveChangesAsync();

            return purchaseDetail;
        }

        private bool PurchaseDetailExists(int id)
        {
            return _context.PurchaseDetails.Any(e => e.Id == id);
        }
    }
}
