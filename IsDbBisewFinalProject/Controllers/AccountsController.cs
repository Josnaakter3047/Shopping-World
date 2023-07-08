using Idlc_DataAccess.IRepository;
using Idlc_Models.Accounts;
using Idlc_Models.Others;
using Idlc_Models.ViewModels;
using Idlc_Services;
using Idlc_Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Data;

namespace IDLC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IUnitRepository _unit;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<ApplicationUser> _signInManager;
        

        public AccountsController(IUnitRepository unit, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _unit = unit;
            _configuration = configuration;
            _signInManager = signInManager;
        }
        //registration
        [HttpPost("registration")]

        public async Task<IActionResult> RegistrationAsync([FromBody] RegistrationViewModel model)
        {
            if (_unit.Users.IfUserEmailAlreadyExists(Guid.Empty, model.Email))
                return Ok(new { statusCode = 400, message = "Email already exists" });
            if (_unit.Users.IfPhoneNumberAlreadyExists(Guid.Empty, model.PhoneNumber))
                return Ok(new { statusCode = 400, message = "Phone Number already exists" });

            ApplicationUser user = new()
            {
                UserFullName = model.UserFullName,
                PhoneNumber = model.PhoneNumber,
                UserName = model.PhoneNumber,
                Email = model.Email
                
            };

            await _userManager.CreateAsync(user, model.Password);
            await _userManager.AddToRoleAsync(user, SD.Role_Customer);

            return Ok(new
            {
                StatusCode = 200,
                message = "Registration Complete. Please log in!!",

            });
        }
        //login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LogInViewModel model)
        {
            //for email
            //var user = await _userManager.FindByEmailAsync(model.Email);
           var user = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == model.PhoneNumber);
            if (user == null)
                return Ok(new { statusCode = 401, message = "Invalid Phone Number or Password" });

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
                return Ok(new { statusCode = 401, message = "Invalid Phone Number or Password" });

            AuthService authService = new(_userManager, _configuration);

            AuthViewModel token = await authService.GetTokenAndRefreshTokenAsnyc(user);

            token.RefreshToken = authService.GenerateRefreshToken();

            token.RefreshTokenExpireTime = DateTime.UtcNow.AddDays(1);

            RefreshToken refreshToken = new()
            {
                Token = token.RefreshToken,
                Expires = token.RefreshTokenExpireTime,
                Created = DateTime.UtcNow,
                ApplicationUserId = user.Id,
                ActualToken = token.Token
            };

            var perviousRefreshTokens = _unit.RefreshToken.GetRefreshTokenByUserId(user.Id);
            _unit.RefreshToken.RemoveRange(perviousRefreshTokens);

            _unit.RefreshToken.Add(refreshToken);

            return Ok(new
            {
                statusCode = 200,
                value = token,
                message = "Log in successfully!!"
            });
        }
     
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var list = (from d in _userManager.Users
                        select new ApplicationViewModel
                       {
                           UserFullName = d.UserFullName,
                           Email = d.Email,
                           PhoneNumber= d.PhoneNumber,
                           Password= d.PasswordHash
                       }).ToList();
            return Ok(new
            {
                statusCode = 200,
                value = list,
            });
        }

        [HttpPost("getall")]
        public IActionResult GetAll([FromBody] FilterModel model)
        {
            if (!string.IsNullOrEmpty(model.GlobalFilter))
            {
                model.GlobalFilter = model.GlobalFilter.Trim();
            }

            var x = _unit.Users.UserList(model);
            if (x.FirstOrDefault() == null)
                return Ok(new { statusCode = 204, message = "No Record Found" });

            var list = new List<ApplicationUser>();
            return Ok(new
            {
                statusCode = 200,
                value = list,
                totalRecords = _unit.Users.TotalRecord(model)
            });
        }
        [AllowAnonymous]
        [HttpPost("ifuseremailalreadyexists")]
        public IActionResult IfUserEmailAlreadyExists([FromBody] IfExistsViewModel model) =>
           _unit.Users.IfUserEmailAlreadyExists(model.Id, model.Name) ?
           Ok(new { statusCode = 200, value = true }) :
           Ok(new { statusCode = 200, value = false });

        [AllowAnonymous]
        [HttpPost("ifphonenumberalreadyexists")]
        public IActionResult IfPhoneNumberAlreadyExists([FromBody] IfExistsViewModel model) =>
            _unit.Users.IfPhoneNumberAlreadyExists(model.Id, model.Name) ?
            Ok(new { statusCode = 200, value = true }) :
            Ok(new { statusCode = 200, value = false });
    }
}
