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
    public class ConfirmationsController : ControllerBase
    {
        private readonly ShoppingDbContext _context;

        public ConfirmationsController(ShoppingDbContext context)
        {
            _context = context;
        }

        // GET: api/Confirmations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Confirmation>>> GetConfirmations()
        {
            return await _context.Confirmations.ToListAsync();
        }

        // GET: api/Confirmations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Confirmation>> GetConfirmation(int id)
        {
            var confirmation = await _context.Confirmations.FindAsync(id);

            if (confirmation == null)
            {
                return NotFound();
            }

            return confirmation;
        }

        // PUT: api/Confirmations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConfirmation(int id, Confirmation confirmation)
        {
            if (id != confirmation.Id)
            {
                return BadRequest();
            }

            _context.Entry(confirmation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConfirmationExists(id))
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

        // POST: api/Confirmations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Confirmation>> PostConfirmation(Confirmation confirmation)
        {
            _context.Confirmations.Add(confirmation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConfirmation", new { id = confirmation.Id }, confirmation);
        }

        // DELETE: api/Confirmations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Confirmation>> DeleteConfirmation(int id)
        {
            var confirmation = await _context.Confirmations.FindAsync(id);
            if (confirmation == null)
            {
                return NotFound();
            }

            _context.Confirmations.Remove(confirmation);
            await _context.SaveChangesAsync();

            return confirmation;
        }

        private bool ConfirmationExists(int id)
        {
            return _context.Confirmations.Any(e => e.Id == id);
        }
    }
}
