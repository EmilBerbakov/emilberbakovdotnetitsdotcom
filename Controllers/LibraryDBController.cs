using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using emilberbakovdotnetitsdotcom.Data;
using emilberbakovdotnetitsdotcom.Models;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace emilberbakovdotnetitsdotcom.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryDBController : ControllerBase {
        private readonly IConfiguration _configuration;
        public LibraryDBController(IConfiguration configuration)
        {
            _configuration=configuration;
        }

        [HttpPost("results")]
        
        
        
        public string dBSearch(LibraryDBSearch dBSearch)
        {
            //ensure dbSearch.searchtype is expected value
           SqlCommand cmd = new SqlCommand();
           SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection").ToString());
           string jsonOutput="@RESULTS";
           string input="@VALUE";
           switch (dBSearch.searchtype){
                case "TITLE":
                cmd = new SqlCommand("Libraries.TITLEQUERYJSON",con);
                cmd.Parameters.Add(input,SqlDbType.NVarChar,1500).Value=dBSearch.searchvalue;
                break;
                case "EDITION_ID":
                cmd = new SqlCommand("Libraries.EDITIONIDQUERYJSON",con);
                cmd.Parameters.Add(input,SqlDbType.VarChar,50).Value=dBSearch.searchvalue;
                break;
                case "ISBN_13":
                cmd=new SqlCommand("Libraries.ISBN13QUERYJSON",con);
                cmd.Parameters.Add(input,SqlDbType.VarChar,13).Value=dBSearch.searchvalue;
                break;
                case "ISBN_10":
                cmd=new SqlCommand("Libraries.ISBN10QUERYJSON",con);
                cmd.Parameters.Add(input,SqlDbType.VarChar,10).Value=dBSearch.searchvalue;
                break;
                default:
                cmd = new SqlCommand("Libraries.TITLEQUERYJSON",con);
                cmd.Parameters.Add(input,SqlDbType.NVarChar,1500).Value=dBSearch.searchvalue;
                break;
           }
            //cmd = new SqlCommand("Libraries.VALUEQUERYJSON",con);
            cmd.CommandType=System.Data.CommandType.StoredProcedure;
            
            //cmd.Parameters.Add("@COLUMN",SqlDbType.NVarChar,15).Value=dBSearch.searchtype;
            cmd.Parameters.Add(jsonOutput,SqlDbType.NVarChar,-1).Direction=ParameterDirection.Output;
            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();
            string json = cmd.Parameters[jsonOutput].Value.ToString();
            
            if (json!=null) {
                return json;
            }
            else{
                return "[{'Result': 'No data found',}]";
            }
            

        }
        [HttpGet("test")]
        public IEnumerable<string> Get(){
            return new string[] {"Bruh","Dude"};
            
        }

        [HttpPost("mylibrary")]

        public string myLibrary(UserJWTModel token)
        {
            bool valid=TokenValidation(token.jwt);
            string output=string.Empty;
            if (valid==true){
                /// run the sql thing and return the table
                var handler=new JwtSecurityTokenHandler();
                var jwt=handler.ReadJwtToken(token.jwt);
                var table=jwt.Claims.First(claim => claim.Type =="library").Value;
                try {
                var dataSet= new DataSet();
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection").ToString());
                SqlCommand cmd=new SqlCommand("Libraries.USERLIBRARYJSON",con);
                cmd.CommandType=System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@TABLENAME",SqlDbType.NVarChar,150).Value=table;
                con.Open();
                var dataAdapter = new SqlDataAdapter
                {
                    SelectCommand=cmd
                };
                dataAdapter.Fill(dataSet);
                List<string> outputList = new List<string>();
                for(int i=0;i<dataSet.Tables[0].Rows.Count;i++){
                    outputList.Add(dataSet.Tables[0].Rows[i][0].ToString());
                }

                if (outputList==null){
                    output=2.ToString();
                }
                else{
                    output=string.Join("",outputList);
                }
                }
                catch{
                    output=3.ToString();
                }

                return output;
            }
            else {
                return 4.ToString();
            }
            
        }

        private bool TokenValidation(string jwt)
        {
            var key=new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var tokenHandler=new JwtSecurityTokenHandler();
            try{
                tokenHandler.ValidateToken(jwt,new TokenValidationParameters
                {
                    //Obviously, we'll want to add more points of verification because more proverbial locks on our proverbial door is better
                    ValidateIssuerSigningKey=true,
                    ValidateLifetime=true,
                    ValidateAudience=false,
                    ValidateIssuer=false,
                    IssuerSigningKey=key
                },out SecurityToken validToken);   
            }
            catch {
                return false;
            }
            return true;
        }

        //Validate and read the JSON token
        //then run the stored SQL procedure that returns the user's library.
    [HttpPost ("editlibrary")]
    public string editlibrary(EditLibrary editLibrary){
        //TODO - enumerate through each line in editLibrary, then perform the edit stored proc on the user's library
        string library=editLibrary.LIBRARY;
        SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection").ToString());
        SqlCommand cmd=new SqlCommand("Libraries.USERLIBRARYEDIT",con);
        cmd.CommandType=System.Data.CommandType.StoredProcedure;
        con.Open();
        int rowNum=0;
        foreach (var item in editLibrary.EDITLIBRARY)
        {
            //TODO - grab each value in the EDITLIBRARY list and then run a stored procedure to edit the specific line in the user's library
            //TODO - write the stored procedure.  It will do the following: set the columns under EDITION_ID to the appropriate values    
            cmd.Parameters.Clear();
            cmd.Parameters.Add("@TABLENAME",SqlDbType.NVarChar,150).Value=editLibrary.LIBRARY;
            cmd.Parameters.Add("@EDITION_ID",SqlDbType.VarChar,50).Value=item.EDITION_ID;
            cmd.Parameters.Add("@OWNERSHIP_STATUS",SqlDbType.Int).Value=int.Parse(item.OWNERSHIP_STATUS);
            cmd.Parameters.Add("@READ_STATUS",SqlDbType.Int).Value=int.Parse(item.READ_STATUS);
            cmd.Parameters.Add("@BOOK_NUM",SqlDbType.Int).Value=int.Parse(item.BOOK_NUM);
            rowNum=rowNum+cmd.ExecuteNonQuery();
        }
        con.Close();
        return rowNum.ToString();
    }
    }
}