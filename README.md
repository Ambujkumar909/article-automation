# 🚀 BeyondChats Editorial Intelligence
**Enterprise-Grade AI Content Pipeline & Editorial Suite**

![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel) ![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css) ![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=neon&logoColor=black) ![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)

---

## 💎 Project Philosophy
BeyondChats Editorial is a full-stack intelligence system designed for the **"Think Better"** initiative. It automates the lifecycle of digital content—from raw web archival scraping to **Gemini 1.5 Flash** cognitive refinement—culminating in a high-authority editorial interface. 

The architecture focuses on **latency reduction**, **serverless scalability**, and a **premium user experience** that bridges the gap between raw data and actionable insight.

> **Lead Architect:** Ambuj Kumar  
> **Contact:** [ambujkr8@gmail.com](mailto:ambujkr8@gmail.com)

---

## 🏗️ Technical Architecture & Flow

### 📊 System Design
```mermaid
graph TD
    subgraph Frontend [Client: React 18 + Vite]
        UI[Premium Editorial UI]
        NAV[Custom Popstate History Logic]
        MODAL[Dual-Scroll Comparison Engine]
    end

    subgraph Keep_Alive [Stability Layer]
        CRON[Cron-Job.org Heartbeat]
    end

    subgraph Backend [API Layer: Laravel 11 / Docker]
        API[Stateless REST API]
        CONTROLLER[Article Transformation Logic]
    end

    subgraph Data_Layer [Database: Neon Serverless]
        DB[(Postgres Port 5432)]
    end

    %% Logic Flow
    CRON -- "Pings API (Prevent Sleep)" --> API
    UI -- "Consumes Articles" --> API
    API --> CONTROLLER
    CONTROLLER -- "Direct Handshake" --> DB
    NAV -- "Intercepts Browser Back" --> MODAL
