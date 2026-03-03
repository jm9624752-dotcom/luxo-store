# LUXE - E-commerce Premium

## Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## About

LUXE is a premium e-commerce web application showcasing luxury products with an elegant, minimalist design. Built with vanilla HTML, CSS, and JavaScript, it provides a seamless shopping experience with a modern interface.

## Features

- **Premium Product Catalog**: Curated collection of luxury items including accessories, bags, footwear, and apparel
- **Shopping Cart**: Fully functional shopping cart with add, remove, and quantity management
- **Local Storage**: Cart persistence using browser's localStorage
- **Responsive Design**: Mobile-first approach with responsive layouts for all screen sizes
- **Smooth Animations**: Elegant transitions and animations throughout the interface
- **Modern UI**: Minimalist design with premium aesthetics
- **Real-time Updates**: Instant cart count and total price updates

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/luxe.git
cd luxe
```

2. Open the application:
   - Simply open `src/index.html` in your web browser
   - No build process or dependencies required

## Usage

### Browsing Products
- View the product grid on the main page
- Each product displays name, category, description, and price
- Hover over products to see interactive effects

### Shopping Cart
- Click the shopping cart icon (🛍) in the header to open the cart
- Click "Adicionar" (Add) button on any product to add it to your cart
- The cart count updates automatically in the header
- Manage quantities using the +/- buttons in the cart
- Remove items by clicking the ✕ button
- View the total price at the bottom of the cart

### Cart Persistence
- Your cart is automatically saved to your browser's localStorage
- Cart contents persist even after closing the browser

## Security

### Handling Sensitive Configuration

This project uses environment variables for sensitive configuration. Never commit sensitive data to the repository:

- **API Keys**: Store in `.env` file (not tracked by Git)
- **Credentials**: Use `.env.local` for local development
- **Secrets**: Reference `.env.example` for required variables

### Best Practices

1. Copy `.env.example` to `.env` and fill in your actual values
2. Never commit `.env` files to version control
3. Use `.gitignore` to exclude sensitive files
4. Review code before committing to ensure no secrets are exposed
5. Use environment-specific configurations for different deployments

### Reporting Security Issues

If you discover a security vulnerability, please email security@example.com instead of using the issue tracker. Please do not publicly disclose the vulnerability until it has been addressed.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**LUXE Development Team**

For questions or inquiries, please open an issue on GitHub or contact us through the repository.

---

**Version**: 1.0.0  
**Last Updated**: 2026  
**Status**: Active Development
