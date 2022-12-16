using emilberbakovdotnetitsdotcom.Models;
using emilberbakovdotnetitsdotcom.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using System.Data;
using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
namespace emilberbakovdotnetitsdotcom.Controllers

{
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public static LoginModel returningUser = new LoginModel();
        public static UserRegistrationModel newUser = new UserRegistrationModel();

        [HttpPost("register")]
        public async Task<ActionResult<UserRegistrationModel>> Register(UserRegistrationDTO register)
        {
            //before we do authentication, let's see if the email exists
            //create a private void method with an in of register.email and an out of the result of the stored procedure that checks
            uniqueEmail(register.email, out int yn);
            //In actuality, all we have to return is 1 for created, or 2 for can't create.  They don't need everything back, and we will make people re-login after registering.

            //So, in reality, we really only have to do an if statement: if yn=1, encrypt the password, and then store everything.

            //The stored procedure is working when running from SQL Server.  
            //This is not working, though...
            //The Log is also showing that we're properly sending the query, and there's no errors.
            //Look into this tomorrow...
            //wrap this in a try block.  Set yn to 0 if anything goes wrong during account creation

            //TODO: Include Libraries.LIBRARYCREATION, input is @USERID
            //TODO: Edit LIBRARYCREATION at the beginning with: N'if not exists (select * from sys.objects where object_id=OBJECT_ID(N'Libraries.'+QUTOENAME(TABLENAME)+N') and type in (N'U'))'
            try
            {
                if (yn == 1)
                {
                    passwordEncryption(register.password, out byte[] passwordHash, out byte[] passwordSalt);
                    SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection").ToString());
                    SqlCommand cmd = new SqlCommand("Libraries.ACCOUNTCREATION", con);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@EMAIL", SqlDbType.NVarChar, 250).Value = register.email;
                    cmd.Parameters.Add("@FNAME", SqlDbType.NVarChar, 50).Value = register.firstName;
                    cmd.Parameters.Add("@LNAME", SqlDbType.NVarChar, 50).Value = register.lastName;
                    cmd.Parameters.Add("@PHASH", SqlDbType.VarBinary, -1).Value = passwordHash;
                    cmd.Parameters.Add("@PSALT", SqlDbType.VarBinary, -1).Value = passwordSalt;
                    cmd.Parameters.Add("@RESULTS",SqlDbType.NVarChar,-1).Direction=ParameterDirection.Output;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    string userID=cmd.Parameters["@RESULTS"].Value.ToString();
                    con.Close();
                    SqlCommand cmd2 = new SqlCommand("LIBRARIES.LIBRARYCREATION",con);
                    cmd2.CommandType=System.Data.CommandType.StoredProcedure;
                    cmd2.Parameters.Add("@USERID",SqlDbType.Int).Value=int.Parse(userID);
                    con.Open();
                    cmd2.ExecuteNonQuery();
                    con.Close();
                }
            }
            catch
            {
                yn = 0;

            }
            return Ok(yn);


        }


        //Looks like I'm going to have to store the password hash and the password salt as different columns
        private void passwordEncryption(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {

                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        private bool passwordEncryptionVerify(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
        private void uniqueEmail(string email, out int yn)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection").ToString());
            SqlCommand cmd = new SqlCommand("Libraries.UNIQUEEMAIL", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.Add("@EMAIL", SqlDbType.NVarChar, 250).Value = email;
            cmd.Parameters.Add("@RESULTS", SqlDbType.Int, 1).Direction = ParameterDirection.Output;
            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();
            //1=unique email, 2= email already exists, 0=something went wrong
            yn = ((Int32?)cmd.Parameters["@RESULTS"].Value) ?? 0;
        }
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDTO login)
        {
            string output = string.Empty;
            string resultstring = string.Empty;



            try
            {

                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection").ToString());
                SqlCommand cmd = new SqlCommand("Libraries.ACCOUNTINFORMATION", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@EMAIL", SqlDbType.NVarChar, 250).Value = login.email;
                cmd.Parameters.Add("@RESULTS", SqlDbType.NVarChar, -1).Direction = ParameterDirection.Output;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
                var result = cmd.Parameters["@RESULTS"].Value;
                if (result != "")
                {
                    try
                    {
                        resultstring = result.ToString();


                        JArray jsonArray = JArray.Parse(resultstring);

                        byte[] phash = (byte[])jsonArray[0].SelectToken("passwordHash");
                        byte[] psalt = (byte[])jsonArray[0].SelectToken("passwordSalt");
                        bool check = passwordEncryptionVerify(login.password, phash, psalt);
                        if (check == true)
                        {
                            output = (JsonToken(jsonArray).ToString());

                        }
                        else
                        {
                            output = 2.ToString();
                        }

                    }
                    catch
                    {
                        output = 0.ToString();
                    }
                }
            }
            catch
            {
                output = 0.ToString();
            }
            return output;


            //return ("yes");
            //here is where the call to the stored procedure that checks if you logged in correctly will go.  On success, return a json in the form of:
            /*
            userJson =
            {
                email:
                firstname:
                library:
            }
            this is what we will convert to the JSON Web Token
            in the end, return Ok(userJson) if good,
            return BadRequest("That email / password combination does not exist.")
            */

            //Walkthrough:
            //1.) call the stored procedure that returns the row that matches with the email address
            //2.) call the passwordEncryptionVerify method with login.password as the pasword input, passwordHash and passwordSalt as the PHASH and PSALT from the USER table.  Wrap this call in a try catch.
            //instead of the method being a bool, have it be an int. 1 means good, 2 means bad, 0 means error

            //ToDo - add user ID to the JWT, which means add it as a return in the SQL stored procedure Libraries.ACCOUNTINFORMATION
        }
        private string JsonToken(JArray jsonArray)
        {
            List<Claim> claims = new List<Claim>
        {
            /*
            new Claim(ClaimTypes.Email,jsonArray[0].SelectToken("email").ToString()),
            new Claim(ClaimTypes.Name,jsonArray[0].SelectToken("firstname").ToString()),
            new Claim(ClaimTypes.UserData,jsonArray[0].SelectToken("library").ToString())
            */
            new Claim("email",jsonArray[0].SelectToken("email").ToString()),
            new Claim("firstname",jsonArray[0].SelectToken("firstname").ToString()),
            new Claim("library",jsonArray[0].SelectToken("library").ToString())
        };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
            );
            //Console.WriteLine(_configuration.GetSection("AppSettings:Token").Value);
            //Console.WriteLine(key.ToString());
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }



    }

}