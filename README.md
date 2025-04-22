# CS465
CS-465-10960-M01 Full Stack Development

# Architecture

While developing the Travlr full stack application, I noticed key differences between the Express-based project and the Angular-based single-page application (SPA). The Express application used Handlebars as its front-end templating engine, along with standard JavaScript for functionality. It communicated with a custom-built API to interact with the MongoDB database. However, it did not dynamically render trip data, and each action led to a new page being loaded. As a result, the application resembled a traditional multi-page travel website.

In contrast, the Angular project offered a more modern approach. It used reusable components for the user interface and was built with TypeScript, which added type safety to the code. Like the Express version, it also had a custom API that supported GET, POST, PUT, and DELETE requests. The Angular app enabled user accounts, allowing people to register, log in, and manage their trips—all within a single-page interface that dynamically updated content without refreshing the page. Visually, it featured a cleaner, more minimalistic design.

MongoDB was used as the backend database because of its flexibility and ease of use. Its NoSQL structure stores data in JSON-like documents, making it ideal for web apps like Travlr that deal with loosely structured data. Additionally, MongoDB's cloud hosting eliminates the need for local server setups, simplifying deployment.
  
# Functionality

JavaScript and JSON serve different purposes in full stack development. JavaScript is a programming language used to build functionality, while JSON is a lightweight format used to store and transfer data. In the Angular app, TypeScript (a superset of JavaScript) makes HTTP requests to the API, which returns data in JSON format. This JSON is then parsed and used to dynamically update the UI, allowing the application to render trip details without reloading the page.

Throughout development, I refactored parts of the codebase to improve readability and performance. One major benefit of Angular’s component-based architecture is the ability to reuse UI elements across different pages. This made the application more efficient to develop and easier to maintain, as changes could be made in one place and applied globally.

# Testing

In this full stack project, I worked with four key HTTP methods:

GET: Retrieves data from the API.

POST: Adds new data (trips) to the MongoDB database.

PUT: Updates existing trip records.

DELETE: Removes trips from the database.

To secure these operations, the application uses authentication tokens, which are created when a user registers or logs in. These tokens ensure that only authenticated users can perform sensitive actions like adding or deleting trips.

I tested these endpoints using Postman, where I could simulate different request types and include headers for authentication. I also used MongoDB Compass to verify that changes made through the API were accurately reflected in the database.

# Reflection
This course has significantly helped me move closer to my professional goals by giving me hands-on experience with full stack development tools and technologies. I’ve learned how to work with APIs, manage databases, implement secure authentication, and build dynamic user interfaces. Using tools like Postman and MongoDB Compass gave me real-world practice in testing and debugging.

One of the most valuable takeaways was learning how to secure an application using authentication tokens. This is a critical skill in today’s tech industry, where protecting user data is essential. Overall, this course made me a more confident and marketable developer by strengthening both my frontend and backend development skills.
