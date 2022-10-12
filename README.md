# emilberbakovdotnetitsdotcom
.NET Redesign of both my professional website and the Library Database Project


For those of you who have been keeping an eye on this site, you may have noticed that there have not been many updates, recently. Fear not; I have not abandoned my website, nor have I lost my new-found passion for web-design and app development.
The first version of my website used the following languages:
-PHP
-HTML
-Javascript
-CSS
-SQL
For all of these languages besides CSS, I developed the original site using the vanilla versions. 
I did that deliberately; I wanted to prove that I could develop my own website and web apps without relying on any pre-existing foundations. Now that I have shown that I can do this without using any sort of help, I decided that I should do this all again, except using more industry standard approaches.
What do I mean by industry standard in this case? Well, I mean that I want to use frameworks and practices found in professional web development and implement them for this project. What this means is taking a full stack approach to web development. The framework I'm using for my updated website is ASP.NET CORE. This is a framework developed by Microsoft, and is one of the more common frameworks used for web design. In short, using this framework allows me to partition my website and applications more cleanly into three main pieces, using specific programing languages to make them. These pieces (or layers) are:
1. The front-end - this is what you, the user sees. For the updated website, I am using a Javascript library developed by Meta (FKA Facebook) that is specifcally designed to provide a slick UI for users. I'm also continuing to use Bootstrap, which is a CSS library that helps make the toolbar, buttons, and such look as good as they do on the current site. I am also using React-Bootstrap, which is a flavor of Bootstrap that is specfically designed to be used with React
2. The back-end - this is the part you don't see; the place where I store the data that is used on the website. That's the book data in both the Library Database search as well as your own personal library, and your account information. For the redesign, I am continuing to use Microsoft SQL Server to store the data.
3. The in-between - more formally known as API, this is the layer of the full-stack that allows the front-end to communicate with the backend. In .NET, API is developed in C#.
Out of everything in this redesign, the front-end and API rebuilds are definitely the most different from the current build of this website.
PHP is the real workhorse of the current (soon-to-be-retirned) version of my website. It handles both the front-end and in-between layers, meaning that the division between the two is fuzzy. My current implementation of PHP is not ideal for two reasons:
At a professional level, PHP is used as a middle-ware language more than how I am currently using it as a mix between front-and-middle-end.
Using PHP as heavily as I have for this version of the site resulted in a large amount of PHP fragments that I staple together to make up a singular webpage.
My new website uses the following languages:
-Javascript
-CSS
-HTML
-C#
-SQL
I may yet find some use out of PHP again.  For instance, I'm thinking to use it to transition current users from the old PHP login method to the C# API through an emailed code.
Keep an eye out for the relaunch of my website. It's coming along nicely, and I'm very proud of it, even more-so than this current site.
