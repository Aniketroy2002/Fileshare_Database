# FileShare_Database

# 🔐 Anikrypt Pro – Secure File Sharing Web App

Anikrypt Pro is a modern, full-stack file-sharing web application built with **Next.js** and **MongoDB**. Designed with a strong focus on **privacy**, **organization**, and **security**, it allows users to upload, manage, and access files through a sleek UI and a two-layer password-protected vault system.

---

## 🚀 Features

- 📁 **Multi-file Upload**  
  Upload multiple files at once – supports all common file types:  
  `.jpg`, `.png`, `.ico`, `.pdf`, `.docx`, `.xlsx`, `.pptx`, `.mp4`, and more.

- 🔒 **Two-Layer Vault Access**  
  - **Shared Vault**: Requires a password to access files that are shared with users.
  - **Personal Vault**: Requires a high-security admin-only password to access sensitive or personal files.

- 🗃️ **File Classification**  
  Files are automatically organized based on their extensions for a cleaner user experience.

- 🗑️ **File Management**  
  Users can **download** or **delete** files from the Shared Vault as needed.

- ✨ **Responsive UI**  
  Built for usability across devices with a clean, vault-inspired interface.

---

## 🛠️ Tech Stack

| Technology | Role |
|------------|------|
| [Next.js](https://nextjs.org/) | Frontend Framework |
| [MongoDB](https://www.mongodb.com/) | Database |
| HTML5, CSS3 | Markup & Styling |
| JavaScript (ES6+) | Logic |
| React Icons | Iconography |

---

## 📂 Project Structure (Simplified)
Folder Structure:
<pre>
plaintext ```/anikrypt-pro
├── components
├── pages
│ ├── index.tsx # Main upload page
│ ├── vault.tsx # Vault access page
│ ├── shared.tsx # Shared vault page
│ ├── personal.tsx # Personal vault (admin) page
├── public
├── styles
├── utils
│ └── db.ts # MongoDB connection
├── .env.local # Environment variables
├── next.config.ts
└── README.md```
</pre>
---
#How to Run Locally:

Clone the Repository
git clone https://github.com/your-username/anikrypt-pro.git
cd anikrypt-pro
Install Dependencies
npm install
npm run dev
