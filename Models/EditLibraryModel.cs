namespace emilberbakovdotnetitsdotcom.Models
{


//Class to create the line-by-line for each line in a user's library they're editing
   public class Root 
   {
    public string EDITION_ID { get; set; }=string.Empty;

    public string OWNERSHIP_STATUS { get; set; }=string.Empty;

    public string READ_STATUS { get; set; }=string.Empty;

    public string BOOK_NUM { get; set; }=string.Empty;
   } 
//Class to make the base of the json, which is one instance of LIBRARY, then a json list of EDITLIBRARY commands    
   public class EditLibrary 
   {
      public string LIBRARY { get; set; }=string.Empty;
      public List<Root> EDITLIBRARY { get; set; }
   }
}


//! Important Decision.  Don't move forward until you decide
//* Going with option a.  That way, pulling data will be like this:
/* forEach(EditLibrary.EDITLIBRARY){
   get EDITION_ID, OWNERSHIP_STATUS, etc.
   Either INSERT INTO the content into the user's library, or UPDATE the line.
   
}
*/
/*
currently, the shape of this json will be:

{
   "LIBRARY":"Library ID Here",
   "EDITLIBRARY:
   [
      {
      "EDITION_ID":"EDITION ID HERE",
      "OWNERSHIP_STATUS":"OWNERSHIP STATUS HERE",
      etc.
      },

      {
         ...duplicate
      }
   ]


}

Is this what I want, or do I want to nest the editable content for the specific book like:

{
   "LIBRARY":"Library ID Here",
   "EDITLIBRARY:
   [
      {
      "EDITION_ID":"EDITION ID HERE",
      "INFO":[
      {
      "OWNERSHIP_STATUS":"OWNERSHIP STATUS HERE",
      "READ_STATUS":"READ STATUS HERE",
      "BOOK_NUM":"BOOK NUM HERE"
      }]
      },

      {
         ...duplicate
      }
   ]


}
This might make it easier to grab the specific info I need per Edition, but on the other hand, leaving as is lets me just iterate grabbing everything I need to run a SQL stored procedure once per edited line
   

*/