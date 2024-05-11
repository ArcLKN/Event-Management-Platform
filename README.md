# Event Management Platform
A platform for managing events, allowing users to create, organize, and attend various events.
## Installation
To install the Event Management Platform, follow these steps:

1. Clone the repository to your local machine:
```shell
git clone https://github.com/yourusername/event-management-platform.git
```

2. Navigate to the project directory:
```shell
cd event-management-platform
```

3. Install dependencies:
```shell
npm install
```

4. Configure your environment variables. Create a .env files and add the following environnement variables :
```js
PORT=7000
MONGOURI=
```

5. Start the server:
```shell
npm start
```
## Usage
Once the server is running, you can access the platform by navigating to http://localhost:7000 in your web browser.

### Functionalities
* You can view a calendar with your events.
* Click on previous and next to access the different weeks.
* Create events on the left sidebar.
* Double click on an event to get infos on it.

## Configuration
The Event Management Platform requires the following environment variables to be set:
```js
PORT: // The port on which the server will run. By default: 7000.
MONGOURI: //The MongoDB connection URI.
```

## Contributing
I welcome contributions from the community! To contribute to the Event Management Platform, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure that all tests pass.
3. Submit a pull request with a clear description of your changes.
4. For major changes, please open an issue first to discuss the proposed changes.
5. No but nobody will see this or ever contribute because it's just a dummy project, so do whatever you want.

## Contact
For questions or support, please contact me at raphaelgreiner0@gmail.com.
