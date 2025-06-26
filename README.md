# Shortly 🔗

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC)](https://tailwindcss.com/)

A modern, feature-rich URL shortening service built with Next.js that transforms long URLs into short, shareable links with powerful analytics and custom branding options.

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

## 📖 Project Description

Shortly is a comprehensive URL shortening platform that allows users to create shortened versions of long URLs while providing detailed analytics and customization options. The application features user authentication, dashboard management, QR code generation, and comprehensive click tracking with geographical and device analytics.

### Key Capabilities

- **URL Shortening**: Convert long URLs into short, memorable links
- **Custom Short Codes**: Create personalized short URLs with custom codes
- **Analytics Dashboard**: Track clicks, geographical data, device information, and more
- **QR Code Generation**: Generate QR codes for shortened URLs
- **User Management**: Secure authentication and user profile management
- **Bulk Operations**: Manage multiple URLs with bulk selection and operations

## ✨ Features

- 🔗 **URL Shortening** - Transform long URLs into short, shareable links
- 🎨 **Custom Short Codes** - Create personalized short URLs
- 📊 **Advanced Analytics** - Comprehensive click tracking and statistics
- 🌍 **Geographical Analytics** - Track clicks by continent, country, state, and city
- 📱 **Device Analytics** - Monitor clicks by device type, OS, and browser
- 📈 **Interactive Charts** - Visualize data with Chart.js integration
- 🔐 **User Authentication** - Secure login and registration system
- 👤 **User Dashboard** - Manage all your shortened URLs in one place
- 🔍 **Search & Filter** - Find and organize your URLs easily
- 📋 **Bulk Operations** - Select and delete multiple URLs at once
- 📱 **QR Code Generation** - Generate QR codes for easy sharing
- 📋 **Copy to Clipboard** - One-click copying of shortened URLs
- 🗑️ **URL Management** - Edit, delete, and organize your links
- 📊 **Real-time Statistics** - Live click counting and analytics
- 🎯 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Optimized with Next.js and modern web technologies

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 15.3.4](https://nextjs.org/) - React framework for production
- **UI Library**: [React 19.0.0](https://reactjs.org/) - JavaScript library for building user interfaces
- **Styling**: [TailwindCSS 4.0](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Framer Motion 12.19.1](https://www.framer.com/motion/) - Motion library for React
- **Icons**: [Lucide React 0.523.0](https://lucide.dev/) - Beautiful & consistent icon toolkit
- **Charts**: [Chart.js 4.5.0](https://www.chartjs.org/) + [React Chart.js 2](https://react-chartjs-2.js.org/) - Data visualization
- **Notifications**: [React Toastify 11.0.5](https://fkhadra.github.io/react-toastify/) - Toast notifications

### Utilities & Services

- **HTTP Client**: [Axios 1.10.0](https://axios-http.com/) - Promise-based HTTP client
- **QR Code Generation**: [QRCode 1.5.4](https://github.com/soldair/node-qrcode) - QR code generator
- **Validation**: [Validator 13.15.15](https://github.com/validatorjs/validator.js) - String validation library

### Development Tools

- **PostCSS**: Modern CSS processing
- **ESLint**: Code linting and formatting

## 🚀 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager
- A backend API server (not included in this repository) (Server used in this Project -- [`https://github.com/neelsshah2006/url_shortner_api`](!https://github.com/neelsshah2006/url_shortner_api]))

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/neelsshah2006/shortly.git
   cd shortly
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration (see [Environment Variables](#-environment-variables))

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 💻 Usage

### For End Users

1. **Home Page**: Visit the landing page to get started with URL shortening
2. **Authentication**: Sign up or log in to access features
3. **Dashboard**: Manage all your shortened URLs from a centralized dashboard
4. **URL Shortening**:
   - Enter a long URL in the input field
   - Optionally specify a custom short code
   - Click "Shorten Now" to generate your short URL
5. **Analytics**: Click on any URL in your dashboard to view detailed statistics
6. **QR Codes**: Generate QR codes for any shortened URL for easy mobile sharing

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### Required Variables

| Variable                   | Description          | Example                     |
| -------------------------- | -------------------- | --------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |

## 🔌 API Endpoints

This frontend application communicates with a backend API. The main endpoints used are:

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/check` - Check authentication status
- `POST /auth/logout` - User logout

### URL Management

- `POST /url/shorten` - Create a shortened URL
- `DELETE /url/delete?shortCode={code}` - Delete a shortened URL
- `PATCH /url/custom-url` - Update URL with custom short code
- `GET /url/stats?shortCode={code}` - Get URL statistics and analytics

### User Management

- `GET /user/urls` - Get all URLs for authenticated user
- `GET /user/profile` - Get user profile information
- `PATCH /user/profile` - Update user profile

> For More Details about the API, Check the given API URL - [`https://github.com/neelsshah2006/url_shortner_api`](!https://github.com/neelsshah2006/url_shortner_api])

## 🤝 Contributing

We welcome contributions to Shortly! Here's how you can help:

### Getting Started

1. **Fork the repository**

   ```bash
   git fork https://github.com/yourusername/shortly.git
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/yourusername/shortly.git
   cd shortly
   ```

3. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**

   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

5. **Commit your changes**

   ```bash
   git commit -m 'Add some amazing feature'
   ```

6. **Push to your branch**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Provide a clear description of your changes
   - Link any related issues
   - Ensure all tests pass

### Development Guidelines

- **Code Style**: Follow the existing code style and use ESLint
- **Commits**: Use conventional commit messages
- **Testing**: Add tests for new features and bug fixes
- **Documentation**: Update README and code comments as needed

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX improvements
- 🔧 Performance optimizations
- 🧪 Test coverage improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Shortly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Neel Shah**

- GitHub: [neelsshah2006](https://github.com/neelsshah2006)
- LinkedIn: [neelsshah2006](https://linkedin.com/in/neelsshah2006)
- Email: neelsshah2006@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [TailwindCSS](https://tailwindcss.com/) - For the amazing utility-first CSS framework
- [Chart.js](https://www.chartjs.org/) - For beautiful data visualization
- [Framer Motion](https://www.framer.com/motion/) - For smooth animations
- [Lucide](https://lucide.dev/) - For the beautiful icon set

## 📊 Project Stats

- **Node.js**: >= 18.0.0
- **License**: MIT
- **Status**: Active Development

---

<div align="center">
  <p>Made with ❤️ by Neel Shah</p>
</div>
