# double-twigs

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data


GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia Core for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia Core
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list


Get routes: 
api/thoughts
api/users

Single user and single thought
api/thoughts/thoughtid:

api/users/userid:

Post, put and delete routes for users


Post, put and delete routes for thoughts
api/users/userid:/thoughts/thoughts id;

Post and delete routes for friend list
api/users/userid:/friends/friends id;
