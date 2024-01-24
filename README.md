Limit Order Book
--
Web application that simulates a stock market limit order book, using DRF and React.

The application allow users to add buy and sell orders for stocks, match orders where possible, 

and display the current state of the order book through both a UI and an API.

Structure & Set Up
--
Backend part located in limit_book folder and frontend part located in limit_book_frontend
folder.

To start an application with docker just type docker-compose up --build.

Performance & Optimization
--
There I also used Celery for background task and rabbitMQ as message broker for Celery.
To increase performance of the application. And I optimized queries in DRF.

Also there is a responsive UI.

Stack
--
+ Backend: Python(Django, DRF)
+ Frontend: JS(React.js)
+ Database: PostgreSQL
+ Background task queue: Celery
+ Message broker: RabbitMQ
+ Containerization: Docker, docker-compose

