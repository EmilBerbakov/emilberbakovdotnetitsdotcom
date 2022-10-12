namespace emilberbakovdotnetitsdotcom.Models
{
    public class UserRegistrationModel{
        public string email { get; set; }=string.Empty;
        public string firstName { get; set; }=string.Empty;
        public string lastName { get; set; }=string.Empty;
        public byte[] passwordHash {get;set;}
        public byte[] passwordSalt {get;set;}

        public int unique { get; set; }
    }
    
}