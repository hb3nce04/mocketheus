# 📊 Mocketheus

**The Interactive UI-Driven Metrics Simulator for Prometheus**

[![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Handlebars](https://img.shields.io/badge/Templating-Handlebars.js-f0772b?logo=handlebars.js&logoColor=white)](https://handlebarsjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind--CSS-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Mocketheus** is a developer tool designed to make Prometheus testing painless. Instead of writing complex exporters or static configuration files, Mocketheus provides a **modern Web UI** to create, manage, and simulate metrics in real-time. UI driven metrics mocking.

---

## 📷 Screenshot
![Admin Screenshot](https://github.com/user-attachments/assets/361f07c1-790e-496f-b323-6f941a1f81c6)

## 🔥 Key Features

-   **🖥️ Zero-Config GUI:** Create, update, and delete metrics without touching a single line of code or YAML.
-   **🎛️ Real-Time Sliders:** Instantly manipulate `Gauge` values or increment `Counters` via a dashboard.
-   **🏷️ Visual Label Management:** Add and edit Prometheus labels (key-value pairs) with ease.
-   **🚀 Instant Scrape Endpoint:** Your mock metrics are immediately available on the standard `/metrics` endpoint.

---

## 🛠️ How It Works

Mocketheus acts as a bridge between your manual testing needs and the Prometheus ecosystem. 



1.  **Interact:** You set the desired values on the dashboard.
2.  **Expose:** The Express backend serves these values in the official Prometheus text format.
3.  **Scrape:** Your Prometheus instance scrapes Mocketheus just like any other exporter.

---

## 🚦 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hb3nce04/mocketheus.git

2. **Install:**
   ```bash
   cd mocketheus
   npm install

3. **Run:**
   ```bash
   npm run dev
