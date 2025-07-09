# Token Promo Landing & Mobile Web App

A comprehensive React-based web application featuring a promotional landing page and a full-featured mobile SPA for token airdrops and cryptocurrency engagement.

## 🚀 Demo

[Live Demo](https://your-demo-link.vercel.app) *(Coming Soon)*

## 📱 Features

### Landing Page
- Modern promotional design
- Responsive layout optimized for mobile devices
- Smooth animations and user-friendly interface

### Mobile Web App
- **Token Airdrop System**: Custom-built token distribution mechanism
- **User Authentication**: Secure login and registration system
- **Balance Management**: Real-time token balance tracking
- **Referral Program**: Built-in referral system to expand user base
- **Drop Management**: Interactive token drop interface
- **Mobile-First Design**: Optimized for mobile browsers and touch interactions

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0
- **State Management**: MobX 6.13.7
- **Routing**: React Router DOM 7.6.0
- **Styling**: Sass 1.89.0
- **Testing**: Jest + React Testing Library
- **Logging**: Pino 9.7.0

## 📋 Requirements

- **Browser**: Modern mobile or desktop browser
- **Node.js**: 16.0+ (for development)
- **npm**: 6.0+ (for package management)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mykytapolovianiuk/token-promo-app.git
   cd token-promo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
crypto-app/
├── public/                 # Static files
│   ├── index.html
│   └── assets/
├── src/                    # Main application code
│   ├── App.js             # Main app component
│   ├── App.scss           # Global styles
│   ├── components/        # Reusable components
│   │   ├── ScrollToTop/
│   │   ├── AirdropTimer/
│   │   └── ...
│   ├── pages/             # Application pages
│   │   ├── public/        # Public pages
│   │   │   └── AuthPage/
│   │   │       ├── Login/
│   │   │       └── Registration/
│   │   └── private/       # Protected pages
│   │       ├── Main/
│   │       ├── Drop/
│   │       ├── Balance/
│   │       └── ReferralProgram/
│   ├── routes/            # Route configuration
│   │   ├── PublicRoutes/
│   │   └── PrivateRoutes/
│   ├── context/           # React contexts
│   ├── styles/            # SCSS variables and mixins
│   └── assets/            # Media files
│       ├── icons/
│       ├── fonts/
│       ├── images/
│       └── video/
├── Dockerfile             # Docker configuration
├── nginx.conf             # Production server config
└── package.json           # Dependencies
```

## 🎯 Target Audience

This application is designed for:
- **Crypto enthusiasts** interested in token airdrops
- **Mobile users** seeking seamless token interaction
- **Communities** launching new cryptocurrency projects

## 🔧 Available Scripts

- `npm start` - Run development server
- `npm test` - Run test suite
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

## 🚀 Deployment

The application is configured for easy deployment on platforms like:
- **Vercel** (recommended for React apps)
- **Netlify**
- **Heroku**
- **Docker** (Dockerfile included)

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized for mobile browsers
- Progressive Web App (PWA) ready

## 🔐 Security Features

- Secure user authentication
- Protected routes for sensitive operations
- Input validation and sanitization
- Token-based session management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or suggestions, please reach out:
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Inspired by the growing cryptocurrency and airdrop ecosystem
- Designed with mobile-first approach in mind

---

**Note**: This project was developed as a demonstration of modern React development practices and cryptocurrency-related web applications. All sensitive information and tokens have been replaced with placeholder values for security purposes.