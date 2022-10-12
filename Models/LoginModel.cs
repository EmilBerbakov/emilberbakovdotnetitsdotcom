namespace emilberbakovdotnetitsdotcom.Models
{
    public class LoginModel
    {
        public string email { get; set; } = string.Empty;
        public string firstName { get; set; }=string.Empty;
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt {get;set;}


}
}