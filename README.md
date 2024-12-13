# Report Generator Frontend

A React application for generating and editing presentation-style reports with markdown support.

## Features

- Generate different types of reports (CFO, CEO, COO)
- Edit slides with markdown support
- Live preview of markdown content
- Export reports to PDF

## Prerequisites

- Node.js 20.x
- Yarn
- Docker (optional)

## Environment Variables (only dev)

Create a `.env.development` file with:

>REACT_APP_BACKEND_ENDPOINT=your_backend_url


## Local Development

Install dependencies:
>yarn install

Start development server:
>yarn start

Build for production:
>yarn build

## Docker Deployment

Build the image:
>docker build -t report-generator-frontend --build-arg REACT_APP_BACKEND_ENDPOINT=your_backend_url .

Run the container:
>docker run -p 3000:80 report-generator-frontend

